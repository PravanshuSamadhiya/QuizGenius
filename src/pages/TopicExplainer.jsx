
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
      // For demo purposes, we'll use a mock response instead of real API
      // In a real application, you would call the API
      // const explanationData = await explainTopic(formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock explanation data
      const mockExplanationData = getMockExplanation(formData);
      setExplanation(mockExplanationData);
      
      toast({
        title: "Topic Explanation Generated",
        description: "Your explanation is ready!",
      });
    } catch (error) {
      console.error('Error explaining topic:', error);
      toast({
        title: "Error Generating Explanation",
        description: "Please try again later.",
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <h1 className="section-title">AI Topic Explainer</h1>
          <p className="section-subtitle">
            Get clear, in-depth explanations on any topic or concept
          </p>
          
          <div className="mt-8">
            {!explanation ? (
              <div className="max-w-3xl mx-auto">
                <Tabs defaultValue="explain">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="explain" className="flex items-center">
                      <BrainCircuit className="h-4 w-4 mr-2" />
                      Explain a Topic
                    </TabsTrigger>
                    <TabsTrigger value="about" className="flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      How It Works
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="explain" className="animate-fade-in">
                    <TopicForm onExplainTopic={handleExplainTopic} isLoading={isLoading} />
                  </TabsContent>
                  
                  <TabsContent value="about" className="animate-fade-in bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">How the Topic Explainer Works</h3>
                    <div className="space-y-4">
                      <p>Our AI-powered Topic Explainer helps you understand any concept, subject, or idea with clear, well-structured explanations. Here's what makes it special:</p>
                      
                      <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-medium">Educational Focus:</span> Explanations are designed to teach, not just inform</li>
                        <li><span className="font-medium">Customizable Detail Level:</span> Get explanations that match your knowledge needs</li>
                        <li><span className="font-medium">Visual Organization:</span> Content is structured for easy comprehension</li>
                        <li><span className="font-medium">Examples & Illustrations:</span> Learn through relatable examples</li>
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
      
      {/* Footer */}
      <footer className="bg-foreground text-white py-6 mt-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-white/70">
              © {new Date().getFullYear()} QuizGenius. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Mock explanation generation function for demo purposes
const getMockExplanation = (formData) => {
  const { topic, educationLevel, explanationStyle } = formData;
  
  return {
    title: `Understanding ${topic}`,
    description: educationLevel ? `A ${explanationStyle} explanation at the ${educationLevel} level` : `A ${explanationStyle} explanation`,
    topic,
    educationLevel,
    content: [
      {
        title: 'Introduction',
        paragraphs: [
          `${topic} is an important concept that has significant implications in various fields. This explanation will break down the fundamentals and help you understand its key aspects.`,
          `In simple terms, ${topic} refers to a process/concept that involves several interconnected elements and principles. We'll explore each of these in detail.`
        ]
      },
      {
        title: 'Core Concepts',
        paragraphs: [
          `The first key concept of ${topic} involves understanding its fundamental principles and how they operate in different contexts.`,
          `Another important aspect is recognizing the historical development and evolution of ${topic} over time, which has led to our current understanding.`,
          `The theoretical framework surrounding ${topic} provides a structured way to analyze and predict related phenomena.`
        ]
      },
      {
        title: 'Applications and Significance',
        paragraphs: [
          `${topic} has numerous real-world applications, including in fields such as science, technology, and everyday life.`,
          `Understanding ${topic} is valuable because it enables us to explain, predict, and potentially control various related processes and outcomes.`,
          `Recent advancements have expanded the application of ${topic} into new areas, creating innovative solutions to complex problems.`
        ]
      }
    ],
    keyPoints: [
      `${topic} consists of multiple interconnected elements that work together`,
      `The historical development of ${topic} has shaped our current understanding`,
      `There are numerous practical applications across different fields`,
      `Understanding ${topic} enables prediction and control of related processes`,
      `Modern research continues to expand our knowledge of ${topic}`
    ],
    examples: [
      {
        title: 'Practical Example 1',
        description: `This example illustrates how ${topic} applies in a common scenario that you might encounter or observe in everyday situations.`
      },
      {
        title: 'Practical Example 2',
        description: `A more advanced application demonstrating the depth and versatility of ${topic} in solving complex problems.`
      }
    ],
    relatedTopics: [
      {
        title: `History of ${topic}`,
        description: `Explore how ${topic} evolved over time and the key figures who contributed to its development.`
      },
      {
        title: `Advanced ${topic} Concepts`,
        description: `Delve deeper into more complex aspects and theoretical frameworks.`
      },
      {
        title: `${topic} in Modern Applications`,
        description: `Discover how ${topic} is used in cutting-edge technologies and recent innovations.`
      }
    ]
  };
};

export default TopicExplainer;
