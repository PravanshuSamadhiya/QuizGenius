import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import TopicForm from '@/components/TopicForm';
import TopicDisplay from '@/components/TopicDisplay';
import { explainTopic } from '@/utils/aiService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TopicExplainer = () => {
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExplainTopic = async (formData) => {
    try {
      setIsLoading(true);
      const explanationData = await explainTopic(formData);
      setExplanation(explanationData);
      
      toast({
        title: "Topic Explanation Generated",
        description: "Your explanation is ready!",
      });
    } catch (error) {
      console.error('Error explaining topic:', error);
      toast({
        title: "Error Generating Explanation",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setExplanation(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#172554] text-white">
      <Navbar />

      <main className="flex-grow">
        <div className="page-container py-12">
          <h1 className="text-4xl font-bold text-center gradient_color_aboutPage mb-4">MindCrafter SmartExplain</h1>
          <p className="text-center text-white/80 text-lg">
            Get clear, in-depth explanations on any topic or concept
          </p>

          <div className="mt-10">
            {!explanation ? (
              <div className="max-w-3xl mx-auto">
                <Tabs defaultValue="explain" className="w-full">
                  <TabsList className="grid grid-cols-2 bg-navyblue-800 rounded-lg shadow-sm mb-8">
                    <TabsTrigger 
                      value="explain" 
                      className="flex items-center justify-center gap-2 py-2 text-white data-[state=active]:bg-orange-400 data-[state=active]:text-black rounded-md transition"
                    >
                      <BrainCircuit className="h-4 w-4" />
                      Explain a Topic
                    </TabsTrigger>
                    <TabsTrigger 
                      value="about" 
                      className="flex items-center justify-center gap-2 py-2 text-white data-[state=active]:bg-orange-400 data-[state=active]:text-black rounded-md transition"
                    >
                      <Info className="h-4 w-4" />
                      How It Works
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="explain" className="animate-fade-in bg-navyblue-600 p-6 rounded-xl shadow-lg">
                    <TopicForm onExplainTopic={handleExplainTopic} isLoading={isLoading} />
                  </TabsContent>

                  <TabsContent value="about" className="animate-fade-in bg-navyblue-600 p-6 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4 text-yellow-50">How the Topic Explainer Works</h3>
                    <div className="space-y-4 text-white/90">
                      <p>Our AI-powered Topic Explainer helps you understand any concept, subject, or idea with clear, well-structured explanations. Here's what makes it special:</p>
                      
                      <ul className="list-disc pl-6 space-y-2">
                        <li><span className="font-semibold text-orange-300">Educational Focus:</span> Explanations are designed to teach, not just inform</li>
                        <li><span className="font-semibold text-orange-300">Customizable Detail Level:</span> Get explanations that match your knowledge needs</li>
                        <li><span className="font-semibold text-orange-300">Visual Organization:</span> Content is structured for easy comprehension</li>
                        <li><span className="font-semibold text-orange-300">Examples & Illustrations:</span> Learn through relatable examples</li>
                      </ul>

                      <p>Simply enter the topic you want explained, customize the options if needed, and our AI will generate a comprehensive explanation!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <TopicDisplay explanation={explanation} onReset={handleReset} />
            )}
          </div>
        </div>
      </main>

      <footer className="bg-[#172554] text-white py-6 mt-16 border-t border-white/10">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-white/70">
          © {new Date().getFullYear()} MindCrafter. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default TopicExplainer;
