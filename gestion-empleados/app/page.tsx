import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Stats } from "@/components/landing/Stats";
import { HowItWorks } from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Grid pattern background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Stats />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </div>
  );
}
