import LanyardCard from "./decoration/card";
import { Motion } from "solid-motionone";

import Background from "./bg/background";

const HeroSection = () => {
  return (
    <div
      id="home"
      class="w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4 py-6 md:p-8 overflow-hidden relative"
    >
      <Background />

      <Motion.div
        initial={{ y: -1000, rotate: 5 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{
          duration: 1.2,
          easing: [0.34, 1.56, 0.64, 1],
          delay: 0.5,
        }}
        class="z-20 relative mt-16 md:mt-0 perspective-1000 w-full flex justify-center"
      >
        <LanyardCard
          name="Alvin Putra"
          roles={["Backend Developer", "UI/UX Designer"]}
          description="I am a dedicated Backend Developer and UI/UX Designer with a passion for building robust applications and intuitive interfaces. I love solving complex problems with code."
          photoUrl="https://github.com/shadcn.png"
        />
      </Motion.div>
    </div>
  );
};

export default HeroSection;
