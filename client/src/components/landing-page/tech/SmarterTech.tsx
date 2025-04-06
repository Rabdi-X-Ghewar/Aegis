import { HoverButton } from "@/components/ui/hover-button";
import m1 from "@/assets/dark-illustration5.png";
import m2 from "@/assets/Website graphic 3.png";
import m3 from "@/assets/Publisher NFTs.png";


const SmarterTech = () => {
  return (
    <div className="bg-[#c0ff00] w-full py-20 text-left px-0">
      {/* Remove max-w-7xl and mx-auto to align flush with the left edge */}
      <div className="pl-0"> {/* Ensure no left padding */}
        <h2 className="text-[#004d1a] text-[clamp(10rem,16vw,14rem)] font-black leading-tight mb-8 text-left tracking-tighter">
          Smarter tech.<br />
          Better prices.
        </h2>
        <div className="px-30 mt-20"> {/* Added more top margin */}
        <p className="text-[#004d1a] text-4xl">
          Market makers and solvers are scrapping it out to
          <br />
          get you the best prices from the widest range of
          <br />
          liquidity sources.
        </p>
        <HoverButton className="mt-12 bg-white text-[#004d1a] hover:bg-gray-100">
          Get Started
        </HoverButton>


        <div className="flex gap-20 mt-24 items-start justify-between">
          <div className="flex flex-col items-center">
            <img src={m1} alt="Discord" className="w-72 h-72 object-contain mb-8" />
            <p className="text-[#004d1a] text-center text-3xl font-extrabold tracking-tight">
              Personalized Bot Built 
              <br />
              on EDUCHAIN
            </p>
          </div>
          
          <div className="flex flex-col items-start">
            <img src={m2} alt="Website" className="w-72 h-72 object-contain mb-8" />
            <p className="text-[#004d1a] text-3xl font-extrabold tracking-tight">
              Interact with Defi actions
              <br />
              on EDUCHAIN
            </p>
            </div>
            <div className="flex flex-col items-start">
            <img src={m3} alt="NFTs" className="w-72 h-72 object-contain mb-8" />
            <p className="text-[#004d1a] text-3xl text-center font-extrabold tracking-tight">
              Create NFTs
              <br />
              on EDUCHAIN
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmarterTech;