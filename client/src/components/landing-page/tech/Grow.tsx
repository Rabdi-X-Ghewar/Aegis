const Grow = () => {
  return (
    <div className="bg-black w-full py-20 text-left px-0">
      <div className="mx-auto relative pl-4">
        <div className="flex flex-col">
          <div className="max-w-3xl pl-0">
            <h2 className="text-[#ff6b00] text-left text-[clamp(5rem,12vw,14rem)] font-bold leading-tight mb-8">
              Transact.<br />
              Chat.<br />
              Learn.
            </h2>
          </div>
          
          <div className="max-w-3xl pl-4">
            <p className="text-[#ff6b00] text-[clamp(1.5rem,3vw,2rem)] mb-4">
              Ever wanted to interact with your faviourite chains.
            </p>
            <p className="text-[#ff6b00] text-[clamp(1.2rem,2vw,1.5rem)]">
              Chat to any chains of your choice and get the latest updates on your favourite tokens.
            </p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#ff0000] rounded-full overflow-hidden">
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4">
              {/* Simplified ape face */}
              <div className="w-full h-full bg-[#ff0000] relative">
                <div className="absolute top-1/4 left-1/4 w-8 h-4 bg-[#ff6b00] rounded-full"></div>
                <div className="absolute top-1/4 right-1/4 w-8 h-4 bg-[#ff6b00] rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-[#ff6b00]"></div>
              </div>
              {/* Token symbols in the ape's mouth */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {['blue', 'green', 'purple', 'pink'].map((color, i) => (
                  <div 
                    key={i} 
                    className={`w-4 h-4 rounded-full bg-${color}-500`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grow;
