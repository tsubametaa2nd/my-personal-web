import { createSignal, createMemo } from "solid-js";

export type Category = "All" | "Setup" | "Hackathons" | "Projects" | "Life";

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  category: Category;
  date: string;
  size: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "setup-01",
    image:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop", // Code on screen
    caption: "Initial commit of my workspace setup.",
    category: "Setup",
    date: "2023-10-12",
    size: "4.2MB",
  },
  {
    id: "hack-01",
    image:
      "https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=1000&auto=format&fit=crop", // Hackathon vibe
    caption: "Debugging at 3AM @ JakartaHack.",
    category: "Hackathons",
    date: "2023-11-05",
    size: "2.8MB",
  },
  {
    id: "proj-01",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // Data dashboard
    caption: "Deployed the new analytics engine.",
    category: "Projects",
    date: "2024-01-15",
    size: "1.4MB",
  },
  {
    id: "life-01",
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop", // Laptop in coffee shop
    caption: "Remote work vibes.",
    category: "Life",
    date: "2024-02-01",
    size: "3.1MB",
  },
  {
    id: "setup-02",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop", // Code
    caption: "Refactoring the legacy codebase.",
    category: "Setup",
    date: "2024-03-10",
    size: "5.6MB",
  },
  {
    id: "hack-02",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop", // Coding laptop
    caption: "Winning team ceremony.",
    category: "Hackathons",
    date: "2024-04-20",
    size: "2.2MB",
  },
];

export const useGallery = () => {
  const [selectedCategory, setSelectedCategory] = createSignal<Category>("All");

  const categories: Category[] = [
    "All",
    "Setup",
    "Hackathons",
    "Projects",
    "Life",
  ];

  const filteredItems = createMemo(() => {
    const cat = selectedCategory();
    if (cat === "All") return GALLERY_DATA;
    return GALLERY_DATA.filter((item) => item.category === cat);
  });

  return {
    allItems: GALLERY_DATA,
    filteredItems,
    categories,
    selectedCategory,
    setSelectedCategory,
  };
};
