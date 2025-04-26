
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BrainCircuit, GraduationCap, BarChart } from 'lucide-react';

const FeatureCard = ({ icon, title, description, className }) => (
  <Card className={`card-hover ${className}`}>
    <CardHeader>
      <div className="flex items-center space-x-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardContent>
  </Card>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#172554]">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <section className="page-container bg-[#172554]">
        <h2 className="section-title text-center gradient_color_aboutPage">Features</h2>
        <p className="section-subtitle text-center mx-auto gradient_color_aboutPage">
          Our AI-powered platform helps you learn more effectively with customized tools
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <FeatureCard 
            icon={<BookOpen className="h-6 w-6 text-quiz" />}
            title="AI Quiz Generator"
            description="Create custom quizzes for any subject or education level. Perfect for test prep, review, or learning new material."
            className="card-gradient-purple bg-navyblue-800"
          />
          
          <FeatureCard 
            icon={<BrainCircuit className="h-6 w-6 text-explainer" />}
            title="Topic Explainer"
            description="Get clear, concise explanations on any topic. Our AI breaks down complex subjects into easy-to-understand content."
            className="card-gradient-blue bg-navyblue-600"
          />
          
          <FeatureCard 
            icon={<GraduationCap className="h-6 w-6 text-quiz" />}
            title="Multiple Education Levels"
            description="From grade school to professional exams, customize content for your specific needs and learning objectives."
            className="card-gradient-purple bg-navyblue-600 "
          />
          
          <FeatureCard 
            icon={<BarChart className="h-6 w-6 text-explainer" />}
            title="Learning Analytics"
            description="Track your progress and identify areas for improvement with detailed insights on your quiz performance."
            className="card-gradient-blue bg-navyblue-800"
          />
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-muted py-16">
        <div className="page-container">
          <h2 className="section-title text-center gradient_color_aboutPage">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-navyblue-800 p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-navyblue-500 text-primary mb-4">
                <span className="text-xl font-bold text-yellow-50 ">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-orange-300">Select Your Tool</h3>
              <p className="text-muted-foreground text-orange-100">Choose between Quiz Generator or Topic Explainer based on your learning needs</p>
            </div>
            
            <div className="bg-navyblue-800 p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-navyblue-500 text-primary mb-4">
                <span className="text-xl font-bold text-yellow-50">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-orange-300">Customize Your Request</h3>
              <p className="text-muted-foreground text-orange-100">Specify the subject, education level, and other preferences</p>
            </div>
            
            <div className="bg-navyblue-800 p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-navyblue-500 text-primary mb-4">
                <span className="text-xl font-bold text-yellow-50">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-orange-300">Get AI-Generated Content</h3>
              <p className="text-muted-foreground text-orange-100">Receive personalized quizzes or explanations tailored to your specifications</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-foreground text-white py-8 mt-auto">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <BrainCircuit className="h-6 w-6" />
              <span className="ml-2 text-lg font-bold">Torned Challenge</span>
            </div>
            <div className="text-sm text-white/70">
              © {new Date().getFullYear()} Torned Education. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
