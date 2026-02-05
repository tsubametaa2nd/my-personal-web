import { Component, onMount } from "solid-js";
import { useLocation } from "@solidjs/router";
import HeroSection from "../home/introduction/HeroSection";
import AboutSection from "../home/about/AboutSection";
import StackSection from "../home/stack/StackSection";
import ProjectTimeline from "../home/timeline/ProjectTimeline";
import ContactSection from "../home/contact/ContactSection";

const Home: Component = () => {
  const location = useLocation();

  onMount(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  });

  return (
    <>
      <HeroSection />
      <AboutSection />
      <StackSection />
      <ProjectTimeline />
      <ContactSection />
    </>
  );
};

export default Home;
