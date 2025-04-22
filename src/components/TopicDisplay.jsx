
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Printer, ThumbsUp, ThumbsDown, BookmarkPlus } from 'lucide-react';

const TopicDisplay = ({ explanation, onReset }) => {
  if (!explanation) {
    return null;
  }
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="animate-fade-in print:animate-none">
      {/* Topic Header */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">{explanation.title}</CardTitle>
          {explanation.description && (
            <CardDescription>
              {explanation.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Topic: <span className="font-medium text-foreground">{explanation.topic}</span></div>
              {explanation.educationLevel && (
                <div className="text-sm text-muted-foreground">Level: <span className="font-medium text-foreground">{explanation.educationLevel}</span></div>
              )}
            </div>
            
            <div className="flex gap-2 print:hidden ml-auto">
              <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={onReset} className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                New Topic
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Content */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="prose prose-slate max-w-none">
            {explanation.content.map((section, index) => (
              <div key={index} className="mb-8">
                {section.title && <h2 className="text-xl font-bold mb-3">{section.title}</h2>}
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
            
            {explanation.keyPoints && explanation.keyPoints.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">Key Points</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {explanation.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {explanation.examples && explanation.examples.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">Examples</h2>
                <div className="space-y-4">
                  {explanation.examples.map((example, index) => (
                    <div key={index} className="bg-muted p-4 rounded">
                      <h3 className="font-medium mb-2">{example.title}</h3>
                      <p>{example.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Feedback and Actions */}
      <Card className="mb-12 print:hidden">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Was this explanation helpful?</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Yes, it was helpful
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  No, I need more help
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="outline" onClick={handlePrint} className="flex items-center">
                <Printer className="h-4 w-4 mr-2" />
                Print Explanation
              </Button>
              <Button variant="outline" className="flex items-center">
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Save for Later
              </Button>
              <Button onClick={onReset} className="btn-secondary flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                Explain New Topic
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Related Topics */}
      {explanation.relatedTopics && explanation.relatedTopics.length > 0 && (
        <div className="print:hidden">
          <h2 className="text-xl font-bold mb-4">Related Topics You Might Want to Explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {explanation.relatedTopics.map((topic, index) => (
              <Card key={index} className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicDisplay;