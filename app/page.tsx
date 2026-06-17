import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Service from "@/components/Service";
import TechStack from "@/components/TechStack";
import Review from "@/components/Review";
import Status from "@/components/StatsDashboard";
import BlogSection from "@/components/BlogSection";
import TrustedClients from "@/components/TrustedClients";
import ContactExperience from "@/components/ContactExperience";
import FutureFooter from "@/components/FutureFooter";

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <AboutSection />
        <Service />
        <TechStack />
        <Review />
        <Status />
        <BlogSection />
        <TrustedClients />
        <ContactExperience />
      </main>
      <FutureFooter />
    </>
  );
}