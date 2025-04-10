import { Button } from "@/components/ui/button";
import Navigation from "./navigation/Navigation";
import Stats from "./stats/Stats";
import SmarterTech from "./tech/SmarterTech";
import Grow from "./tech/Grow";
import { ArrowUpCircle, Bitcoin, DollarSign } from "lucide-react";

const Hero = () => {
  return (
    <div className="text-left px-0 z-10 items-start">
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-24">
      <Navigation />
      <main className="relative min-h-screen flex flex-col items-start justify-center px-0">
        <div className="z-10 max-w-7xl pl-4">
          <h1 className="text-[clamp(5rem,12vw,10rem)] font-bold leading-none mb-24 text-left">
            <span className="text-[#c0ff00]">Agentic Characters</span>
            <br />
            <div className="absolute inset-0 pointer-events-none">
          <div className="animate-float-1 absolute top-1/4 left-1/4">
            <div className="bg-blue-500 rounded-full p-3">
              <Bitcoin className="w-8 h-8" />
            </div>
          </div>
          <div className="animate-float-2 absolute top-1/3 right-1/3">
            <div className="bg-purple-500 rounded-full p-3">
              <ArrowUpCircle className="w-8 h-8" />
            </div>
          </div>
          <div className="animate-float-3 absolute bottom-1/3 right-1/4">
            <div className="bg-green-500 rounded-full p-3">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
        </div>
            <span className="text-[#c0ff00]">on Educhain</span>
          </h1>
          <p className="text-[clamp(2rem,3vw,2rem)] text-[#c0ff00] mb-12 mt-8 font-semibold pl-16">
          Empowering Seamless Multi-Chain Interactions with OCID-Based Payments and EduChain Integration
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-24">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8">
              Start trading
            </Button>
            <Button size="lg" variant="outline" className="border-[#4b5563] text-lg px-8">
              Get building
            </Button>
          </div>
          
        </div>
        
      </main>
      
    </div>
    <Stats />
    <SmarterTech />
    <Grow />
    </div>
  );
};

export default Hero;