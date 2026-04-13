import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";
import TrustBar from "@/components/sections/TrustBar";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItWorks from "@/components/sections/HowItWorks";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { ClientOnlyCursor } from "@/components/shared/ClientOnly";

export default function Home() {
  return (
    <>
      <ClientOnlyCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProductShowcase />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
