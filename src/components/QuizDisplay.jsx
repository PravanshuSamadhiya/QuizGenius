
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, RefreshCw, Printer } from 'lucide-react';

const QuizDisplay = ({ quiz, onReset }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return null;
  }
  
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };
  
  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswerIndex) {
        score++;
      }
    });
    return score;
  };
  
  const getScorePercentage = () => {
    const score = calculateScore();
    return Math.round((score / quiz.questions.length) * 100);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
    onReset();
  };
  
  return (
    <div className="animate-fade-in print:animate-none">
      {/* Quiz Header */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          <CardDescription>
            {quiz.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Subject: <span className="font-medium text-foreground">{quiz.subject}</span></div>
              <div className="text-sm text-muted-foreground">Difficulty: <span className="font-medium text-foreground">{quiz.difficulty}</span></div>
            </div>
            
            {showResults && (
              <div className="flex-shrink-0 bg-primary/10 px-4 py-2 rounded-lg">
                <div className="text-primary font-bold text-2xl">{calculateScore()} / {quiz.questions.length}</div>
                <div className="text-sm text-muted-foreground">Score: {getScorePercentage()}%</div>
              </div>
            )}
            
            <div className="flex gap-2 print:hidden ml-auto">
              <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset} className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                New Quiz
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Questions */}
      <div className="space-y-8 mb-8">
        {quiz.questions.map((question, questionIndex) => (
          <Card key={questionIndex} className={
            showResults
              ? selectedAnswers[questionIndex] === question.correctAnswerIndex
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
              : ""
          }>
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <div className="bg-muted rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="font-medium">{questionIndex + 1}</span>
              </div>
              <div>
                <CardTitle className="text-xl font-medium">{question.question}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[questionIndex]?.toString()}
                onValueChange={(value) => handleAnswerSelect(questionIndex, parseInt(value))}
                className="space-y-3"
                disabled={showResults}
              >
                {question.answers.map((answer, answerIndex) => (
                  <div 
                    key={answerIndex}
                    className={`flex items-center space-x-2 p-2 rounded ${
                      showResults && (
                        answerIndex === question.correctAnswerIndex
                          ? "bg-green-100"
                          : selectedAnswers[questionIndex] === answerIndex
                            ? "bg-red-100"
                            : ""
                      )
                    }`}
                  >
                    <RadioGroupItem 
                      value={answerIndex.toString()} 
                      id={`q${questionIndex}-a${answerIndex}`} 
                    />
                    <Label
                      htmlFor={`q${questionIndex}-a${answerIndex}`}
                      className="flex-grow"
                    >
                      {answer}
                    </Label>
                    {showResults && answerIndex === question.correctAnswerIndex && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                    {showResults && answerIndex !== question.correctAnswerIndex && 
                     selectedAnswers[questionIndex] === answerIndex && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                ))}
              </RadioGroup>
              
              {showResults && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="font-medium mb-2">Explanation:</h4>
                  <p className="text-muted-foreground">{question.explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Submit Button */}
      {!showResults && (
        <div className="flex justify-center mb-12 print:hidden">
          <Button
            onClick={handleSubmit}
            className="btn-primary min-w-[200px]"
            disabled={Object.keys(selectedAnswers).length < quiz.questions.length}
          >
            Submit Answers
          </Button>
          {Object.keys(selectedAnswers).length < quiz.questions.length && (
            <p className="text-sm text-muted-foreground mt-2">
              Please answer all {quiz.questions.length} questions
            </p>
          )}
        </div>
      )}
      
      {/* Results Summary */}
      {showResults && (
        <Card className="mb-12 print:hidden">
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground">Your Score</p>
                  <h3 className="text-3xl font-bold">{calculateScore()} / {quiz.questions.length}</h3>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Percentage</p>
                  <h3 className="text-3xl font-bold">{getScorePercentage()}%</h3>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Performance Summary</h4>
                <p className="text-muted-foreground">
                  {getScorePercentage() >= 80 
                    ? "Excellent work! You've demonstrated a strong understanding of the material."
                    : getScorePercentage() >= 60
                    ? "Good job! You've shown a solid grasp of the concepts, but there's room for improvement."
                    : "You might want to review the material again. Focus on the explanations for the questions you missed."
                  }
                </p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button onClick={handleReset} className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New Quiz
                </Button>
                <Button variant="outline" onClick={handlePrint} className="flex items-center">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizDisplay;
