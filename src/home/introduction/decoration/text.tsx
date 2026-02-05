import {
  createSignal,
  createMemo,
  createEffect,
  onCleanup,
  mergeProps,
  splitProps,
  For,
  Show,
  type Component,
} from "solid-js";
import { animate, type AnimationOptions } from "motion";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps {
  texts: string[];
  transition?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  ref?: (el: RotatingTextRef) => void;
  [key: string]: any;
}

const RotatingText: Component<RotatingTextProps> = (props) => {
  const merged = mergeProps(
    {
      transition: { type: "spring", damping: 25, stiffness: 300 },
      initial: { y: "100%", opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: "-120%", opacity: 0 },
      animatePresenceMode: "wait",
      animatePresenceInitial: false,
      rotationInterval: 2000,
      staggerDuration: 0,
      staggerFrom: "first",
      loop: true,
      auto: true,
      splitBy: "characters",
    },
    props,
  );

  const [local, rest] = splitProps(merged, [
    "texts",
    "transition",
    "initial",
    "animate",
    "exit",
    "animatePresenceMode",
    "animatePresenceInitial",
    "rotationInterval",
    "staggerDuration",
    "staggerFrom",
    "loop",
    "auto",
    "splitBy",
    "onNext",
    "mainClassName",
    "splitLevelClassName",
    "elementLevelClassName",
    "ref",
  ]);

  const [currentTextIndex, setCurrentTextIndex] = createSignal(0);

  // Registry to keep track of current active character elements for exit animations
  let elementsRegistry: { [key: number]: HTMLElement } = {};

  const splitIntoCharacters = (text: string): string[] => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  const elements = createMemo(() => {
    const currentText: string = local.texts[currentTextIndex()];
    if (local.splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (local.splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (local.splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }

    return currentText.split(local.splitBy!).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  });

  const getStaggerDelay = (index: number, totalChars: number): number => {
    const total = totalChars;
    if (local.staggerFrom === "first") return index * local.staggerDuration!;
    if (local.staggerFrom === "last")
      return (total - 1 - index) * local.staggerDuration!;
    if (local.staggerFrom === "center") {
      const center = Math.floor(total / 2);
      return Math.abs(center - index) * local.staggerDuration!;
    }
    if (local.staggerFrom === "random") {
      const randomIndex = Math.floor(Math.random() * total);
      return Math.abs(randomIndex - index) * local.staggerDuration!;
    }
    if (typeof local.staggerFrom === "number") {
      return Math.abs(local.staggerFrom - index) * local.staggerDuration!;
    }
    return 0;
  };

  const handleIndexChange = (newIndex: number) => {
    setCurrentTextIndex(newIndex);
    if (local.onNext) local.onNext(newIndex);
  };

  const animateExit = async () => {
    if (!local.exit) return;

    const indices = Object.keys(elementsRegistry)
      .map(Number)
      .sort((a, b) => a - b);
    const total = indices.length;

    const promises = indices.map((i) => {
      const el = elementsRegistry[i];
      if (!el) return Promise.resolve();
      return animate(el, local.exit, {
        ...local.transition,
        delay: getStaggerDelay(i, total),
      }).finished;
    });

    if (props.animatePresenceMode === "wait") {
      await Promise.all(promises);
    }
  };

  const next = async () => {
    await animateExit();

    // Clear registry for next batch
    elementsRegistry = {};

    const nextIndex =
      currentTextIndex() === local.texts.length - 1
        ? local.loop
          ? 0
          : currentTextIndex()
        : currentTextIndex() + 1;

    if (nextIndex !== currentTextIndex()) {
      handleIndexChange(nextIndex);
    }
  };

  const previous = async () => {
    await animateExit();
    elementsRegistry = {};

    const prevIndex =
      currentTextIndex() === 0
        ? local.loop
          ? local.texts.length - 1
          : currentTextIndex()
        : currentTextIndex() - 1;

    if (prevIndex !== currentTextIndex()) {
      handleIndexChange(prevIndex);
    }
  };

  const jumpTo = async (index: number) => {
    await animateExit();
    elementsRegistry = {};

    const validIndex = Math.max(0, Math.min(index, local.texts.length - 1));
    if (validIndex !== currentTextIndex()) {
      handleIndexChange(validIndex);
    }
  };

  const reset = async () => {
    if (currentTextIndex() !== 0) {
      await animateExit();
      elementsRegistry = {};
      handleIndexChange(0);
    }
  };

  if (local.ref) {
    local.ref({ next, previous, jumpTo, reset });
  }

  createEffect(() => {
    if (!local.auto) return;
    const intervalId = setInterval(next, local.rotationInterval);
    onCleanup(() => clearInterval(intervalId));
  });

  return (
    <span
      class={cn(
        "flex flex-wrap whitespace-pre-wrap relative",
        local.mainClassName,
      )}
      style={{ perspective: "1000px" }}
      {...rest}
    >
      <span class="sr-only">{local.texts[currentTextIndex()]}</span>
      <span
        class={cn(
          local.splitBy === "lines"
            ? "flex flex-col w-full"
            : "flex flex-wrap whitespace-pre-wrap relative",
        )}
        aria-hidden="true"
      >
        <For each={elements()}>
          {(wordObj, wordIndex) => {
            return (
              <span class={cn("inline-flex", local.splitLevelClassName)}>
                <For each={wordObj.characters}>
                  {(char, charIndex) => {
                    return (
                      <span
                        class={cn("inline-block", local.elementLevelClassName)}
                        style={{ "transform-style": "preserve-3d" }}
                        ref={(el) => {
                          if (el) {
                            const allElements = elements();
                            let globalIndex = 0;
                            for (let i = 0; i < wordIndex(); i++) {
                              globalIndex += allElements[i].characters.length;
                            }
                            globalIndex += charIndex();

                            elementsRegistry[globalIndex] = el;
                            const totalChars = allElements.reduce(
                              (acc, curr) => acc + curr.characters.length,
                              0,
                            );

                            animate(el, local.animate || { opacity: 1, y: 0 }, {
                              ...local.transition,
                              delay: getStaggerDelay(globalIndex, totalChars),
                            });
                          }
                        }}
                      >
                        {char}
                      </span>
                    );
                  }}
                </For>
                <Show when={wordObj.needsSpace}>
                  <span class="whitespace-pre"> </span>
                </Show>
              </span>
            );
          }}
        </For>
      </span>
    </span>
  );
};

export default RotatingText;
