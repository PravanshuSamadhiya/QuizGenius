
import React from 'react';
import { BookOpen, BrainCircuit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-gradient bg-navyblue-800 text-white py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Learn Smarter with Torned Edu
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl animate-fade-in text-orange-200" style={{animationDelay: '0.2s'}}>
            Generate custom quizzes and get clear topic explanations with our AI-powered learning platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Link to="/quiz">
              <Button className="bg-yellow-50 text-black hover:bg-yellow-50 text-lg px-8 py-6 h-auto flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Generate Quiz
              </Button>
            </Link>
            <Link to="/explain">
              <Button className="bg-navyblue-700 backdrop-blur-sm hover:bg-navyblue-700 text-white text-lg px-8 py-6 h-auto flex items-center">
                <BrainCircuit className="mr-2 h-5 w-5" />
                Explain a Topic
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
