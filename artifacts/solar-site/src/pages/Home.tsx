import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Offer from "@/components/Offer";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Numbers from "@/components/Numbers";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <Numbers />
        <Services />
        <Offer />
        <Benefits />
        <About />
        <HowItWorks />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
