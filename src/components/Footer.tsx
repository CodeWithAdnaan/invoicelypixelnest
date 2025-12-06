import { Heart } from "lucide-react";
import logoImage from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <img 
              src={logoImage} 
              alt="InvoSwift Logo" 
              className="h-8 w-8 rounded-lg"
            />
            <span className="font-display text-lg text-foreground">InvoSwift</span>
          </div>
          
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for freelancers & small businesses
          </p>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InvoSwift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
