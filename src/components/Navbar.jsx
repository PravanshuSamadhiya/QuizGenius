
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Menu, 
  X, 
  BrainCircuit,
  Home
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className=" shadow-sm sticky top-0 z-50 bg-[#172554] border-b-[2px] border-b-navyblue-800">
      <div className="container max-w-6xl mx-auto px-4"> 
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BrainCircuit className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">Torned Challenge</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant="ghost" className="flex items-center text-navyblue-50 hover:text-yellow-5">
                <Home className="h-5 w-5 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/quiz">
              <Button variant="ghost" className="flex items-center text-navyblue-50 hover:text-yellow-5">
                <BookOpen className="h-5 w-5 mr-2" />
                Quiz Generator
              </Button>
            </Link>
            <Link to="/explain">
              <Button variant="ghost" className="flex items-center text-navyblue-50 hover:text-yellow-5">
                <BrainCircuit className="h-5 w-5 mr-2" />
                Topic Explainer
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-navyblue-50" />
              ) : (
                <Menu className="h-6 w-6 text-navyblue-50" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2 px-2 pt-2 pb-3">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-base font-medium text-navyblue-50 hover:text-yellow-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  Home
                </div>
              </Link>
              <Link
                to="/quiz"
                className="px-3 py-2 rounded-md text-base font-medium text-navyblue-50 hover:text-yellow-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Quiz Generator
                </div>
              </Link>
              <Link
                to="/explain"
                className="px-3 py-2 rounded-md text-base font-medium text-navyblue-50 hover:text-yellow-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <BrainCircuit className="h-5 w-5 mr-2" />
                  Topic Explainer
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
