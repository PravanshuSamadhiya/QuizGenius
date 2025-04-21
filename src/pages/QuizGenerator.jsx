
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import QuizForm from '@/components/QuizForm';
import QuizDisplay from '@/components/QuizDisplay';
import { generateQuiz } from '@/utils/aiService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const QuizGenerator = () => {
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuiz = async (formData) => {
    try {
      setIsLoading(true);
      
      // Generate the quiz with the formData
      const quizData = await generateQuiz(formData);
      setQuiz(quizData);
      
      toast({
        title: "Quiz Generated Successfully",
        description: "Your custom quiz is ready!",
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast({
        title: "Error Generating Quiz",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuiz(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <h1 className="section-title">AI Quiz Generator</h1>
          <p className="section-subtitle">
            Create custom quizzes for any subject and education level in seconds
          </p>
          
          <div className="mt-8">
            {!quiz ? (
              <div className="max-w-3xl mx-auto">
                <Tabs defaultValue="create">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="create" className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Create Quiz
                    </TabsTrigger>
                    <TabsTrigger value="about" className="flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      How It Works
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="create" className="animate-fade-in">
                    <QuizForm onGenerateQuiz={handleGenerateQuiz} isLoading={isLoading} />
                  </TabsContent>
                  
                  <TabsContent value="about" className="animate-fade-in bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">How the Quiz Generator Works</h3>
                    <div className="space-y-4">
                      <p>Our AI-powered Quiz Generator creates custom quizzes tailored to your specified subject and education level. Here's what makes it special:</p>
                      
                      <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-medium">Curriculum-Aligned:</span> Questions are aligned with standard curricula for each education level</li>
                        <li><span className="font-medium">Educational Expertise:</span> AI is trained on educational materials from expert sources</li>
                        <li><span className="font-medium">Varied Question Types:</span> Multiple-choice questions with detailed explanations</li>
                        <li><span className="font-medium">Customizable Difficulty:</span> Select easy, medium, or hard questions based on your needs</li>
                      </ul>
                      
                      <p>Simply fill out the form with your preferences, and we'll generate a quiz for you in seconds!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <QuizDisplay quiz={quiz} onReset={handleReset} />
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

export default QuizGenerator;
