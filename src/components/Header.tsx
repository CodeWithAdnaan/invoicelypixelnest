import { Link, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();
  const isBuilder = location.pathname === "/builder";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={logoImage} 
            alt="InvoSwift Logo" 
            className="h-9 w-9 rounded-lg transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-display text-xl font-medium text-foreground">
            InvoSwift
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {!isBuilder && (
            <Link to="/builder">
              <Button variant="accent" size="default" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Invoice
              </Button>
            </Link>
          )}
          {isBuilder && (
            <Link to="/">
              <Button variant="outline" size="default">
                Back to Home
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
