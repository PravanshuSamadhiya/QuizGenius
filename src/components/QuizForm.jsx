
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen } from 'lucide-react';

const QuizForm = ({ onGenerateQuiz, isLoading }) => {
  const [subject, setSubject] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [topics, setTopics] = useState('');
  const [questionCount, setQuestionCount] = useState('10');
  const [difficulty, setDifficulty] = useState('medium');

  const educationLevels = [
    { value: 'elementary', label: 'Elementary School' },
    { value: 'middle', label: 'Middle School' },
    { value: 'high', label: 'High School' },
    { value: 'college', label: 'College/University' },
    { value: 'jee', label: 'IIT-JEE' },
    { value: 'neet', label: 'NEET' },
    { value: 'professional', label: 'Professional Certification' }
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
    { value: 'mixed', label: 'Mixed Difficulty' }
  ];

  const questionCounts = ['5', '10', '15', '20'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject || !educationLevel) {
      // Simple validation
      alert('Please fill in the subject and education level');
      return;
    }

    onGenerateQuiz({
      subject,
      educationLevel,
      topics,
      questionCount: parseInt(questionCount),
      difficulty
    });
  };

  return (
    <Card className="card-gradient-purple">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="E.g. Mathematics, Biology, History"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input-focus"
                required
              />
            </div>

            <div>
              <Label htmlFor="education-level">Education Level *</Label>
              <Select value={educationLevel} onValueChange={setEducationLevel} required>
                <SelectTrigger
                  id="education-level"
                  className=" bg-navyblue-600 text-white "
                >
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent className="bg-[#172554] text-white">
                  {educationLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


            <div>
              <Label htmlFor="topics">Specific Topics (Optional)</Label>
              <Textarea
                id="topics"
                placeholder="E.g. Photosynthesis, French Revolution, Quadratic Equations"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                className="input-focus resize-none h-24"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Leave blank for a general quiz on the subject
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="question-count">Number of Questions</Label>
                <Select value={questionCount} onValueChange={setQuestionCount}>
                  <SelectTrigger
                    id="question-count"
                    className="input-focus bg-navyblue-600 text-white "
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#172554] text-white">
                    {questionCounts.map((count) => (
                      <SelectItem key={count} value={count}>
                        {count} questions
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>


              <div className="flex-1">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger
                    id="difficulty"
                    className="input-focus bg-navyblue-600 text-white"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#172554] text-white">
                    {difficulties.map((diff) => (
                      <SelectItem key={diff.value} value={diff.value}>
                        {diff.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className=" w-full flex items-center justify-center h-12 bg-yellow-50 text-black rounded-full"
            disabled={isLoading}
          >
            <BookOpen className="mr-2 h-5 w-5 text-black" />
            {isLoading ? 'Generating Quiz...' : 'Generate Quiz'}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
};

export default QuizForm;
