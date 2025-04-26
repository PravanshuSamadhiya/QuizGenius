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
    <div className="min-h-screen flex flex-col bg-[#172554] text-white">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container py-12">
          <h1 className="text-4xl font-bold text-center gradient_color_aboutPage mb-4">QuizCraft By Torned</h1>
          <p className="text-center text-white/80 text-lg">
            Create custom quizzes for any subject and education level in seconds
          </p>
          
          <div className="mt-10">
            {!quiz ? (
              <div className="max-w-3xl mx-auto">
                <Tabs defaultValue="create" className="w-full">
                  <TabsList className="grid grid-cols-2 bg-navyblue-800 rounded-lg shadow-sm mb-8">
                    <TabsTrigger 
                      value="create" 
                      className="flex items-center justify-center gap-2 py-2 text-white data-[state=active]:bg-orange-400 data-[state=active]:text-black rounded-md transition"
                    >
                      <BookOpen className="h-4 w-4" />
                      Create Quiz
                    </TabsTrigger>
                    <TabsTrigger 
                      value="about" 
                      className="flex items-center justify-center gap-2 py-2 text-white data-[state=active]:bg-orange-400 data-[state=active]:text-black rounded-md transition"
                    >
                      <Info className="h-4 w-4" />
                      How It Works
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="create" className="animate-fade-in bg-navyblue-600 p-6 rounded-xl shadow-lg">
                    <QuizForm onGenerateQuiz={handleGenerateQuiz} isLoading={isLoading} />
                  </TabsContent>

                  <TabsContent value="about" className="animate-fade-in bg-navyblue-600 p-6 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4 text-yellow-50">How the Quiz Generator Works</h3>
                    <div className="space-y-4 text-white/90">
                      <p>Our AI-powered Quiz Generator creates custom quizzes tailored to your specified subject and education level. Here's what makes it special:</p>
                      
                      <ul className="list-disc pl-6 space-y-2">
                        <li><span className="font-semibold text-orange-300">Curriculum-Aligned:</span> Questions are aligned with standard curricula for each education level</li>
                        <li><span className="font-semibold text-orange-300">Educational Expertise:</span> AI is trained on educational materials from expert sources</li>
                        <li><span className="font-semibold text-orange-300">Varied Question Types:</span> Multiple-choice questions with detailed explanations</li>
                        <li><span className="font-semibold text-orange-300">Customizable Difficulty:</span> Select easy, medium, or hard questions based on your needs</li>
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

      <footer className="bg-[#172554] text-white py-6 mt-16 border-t border-white/10">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-white/70">
          © {new Date().getFullYear()} tornedEdu. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default QuizGenerator;
