import { Button } from "@/components/ui/button";
import { Glasses as Sunglasses } from "lucide-react";
import Login from "@/components/Login";
import logonav from "@/assets/aegislogo.png"

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-10xl mx-auto px-8 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
              <img src={logonav} alt="Aegislogo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-bold text-white">Aegis</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-[#c0ff00] hover:text-white">
              Features
            </Button>
            <Button variant="ghost" className="text-[#c0ff00] hover:text-white">
              Docs
            </Button>
            <Login />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;