
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit } from 'lucide-react';

const TopicForm = ({ onExplainTopic, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [specificQuestions, setSpecificQuestions] = useState('');
  const [explanationStyle, setExplanationStyle] = useState('comprehensive');

  const educationLevels = [
    { value: 'elementary', label: 'Elementary School' },
    { value: 'middle', label: 'Middle School' },
    { value: 'high', label: 'High School' },
    { value: 'college', label: 'College/University' },
    { value: 'jee', label: 'IIT-JEE' },
    { value: 'neet', label: 'NEET' },
    { value: 'professional', label: 'Professional' }
  ];

  const explanationStyles = [
    { value: 'simple', label: 'Simple & Basic' },
    { value: 'comprehensive', label: 'Comprehensive' },
    { value: 'detailed', label: 'Detailed & Technical' },
    { value: 'eli5', label: 'Explain Like I\'m 5' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!topic) {
      alert('Please enter a topic to explain');
      return;
    }
    
    onExplainTopic({
      topic,
      educationLevel,
      specificQuestions,
      explanationStyle
    });
  };

  return (
    <Card className="card-gradient-blue">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic">Topic to Explain *</Label>
              <Input
                id="topic"
                placeholder="E.g. Photosynthesis, Quantum Physics, French Revolution"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input-focus"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="education-level">Education Level</Label>
              <Select value={educationLevel} onValueChange={setEducationLevel}>
                <SelectTrigger id="education-level" className="input-focus">
                  <SelectValue placeholder="Select education level (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                Choose the appropriate level for the explanation
              </p>
            </div>
            
            <div>
              <Label htmlFor="specific-questions">Specific Questions (Optional)</Label>
              <Textarea
                id="specific-questions"
                placeholder="E.g. What are the key components? How does it work? Why is it important?"
                value={specificQuestions}
                onChange={(e) => setSpecificQuestions(e.target.value)}
                className="input-focus resize-none h-24"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Add specific questions you'd like answered about this topic
              </p>
            </div>
            
            <div>
              <Label htmlFor="explanation-style">Explanation Style</Label>
              <Select value={explanationStyle} onValueChange={setExplanationStyle}>
                <SelectTrigger id="explanation-style" className="input-focus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {explanationStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="btn-secondary w-full flex items-center justify-center h-12"
            disabled={isLoading}
          >
            <BrainCircuit className="mr-2 h-5 w-5" />
            {isLoading ? 'Generating Explanation...' : 'Explain This Topic'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TopicForm;
