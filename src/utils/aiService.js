import { GoogleGenerativeAI } from "@google/generative-ai";


console.log("API Key loaded:", import.meta.env.VITE_GEMINI_API_KEY ? "Yes" : "No");

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY); 
const mockApiDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateQuiz = async (quizParams) => {
  try {
    const { subject, educationLevel, topics, questionCount, difficulty } = quizParams;

    console.log("Generating quiz with Gemini AI for:", quizParams);

    // Build prompt
    const prompt = `
You are an expert quiz generator. Create ${questionCount} multiple-choice questions for the subject "${subject}" targeting ${educationLevel} level. 
Focus on the topic(s): ${topics || 'general concepts'}.
Make the difficulty level "${difficulty}". For each question, return:
- question (string)
- answers (array of 4 strings)
- correctAnswerIndex (number, index of correct answer)
- explanation (string)

Respond in JSON format as an array named "questions". Example format:
{
  "questions": [
    {
      "question": "What is...?",
      "answers": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswerIndex": 0,
      "explanation": "Explanation..."
    }
  ]
}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error("Invalid AI response format:", text);
      throw new Error("The AI response was not in the expected format. Please try again.");
    }

    const parsedResponse = JSON.parse(match[0]);
    console.log("Parsed response:", parsedResponse);
    
    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      console.error("Invalid questions format:", parsedResponse);
      throw new Error("The quiz questions were not properly formatted. Please try again.");
    }

    return {
      title: `${subject} Quiz (${getEducationLevelName(educationLevel)})`,
      description: topics 
        ? `A ${difficulty} level quiz on ${topics} in ${subject}.` 
        : `A ${difficulty} level quiz on ${subject} concepts.`,
      subject,
      difficulty,
      educationLevel,
      questions: parsedResponse.questions
    };

  } catch (error) {
    console.error("Error generating quiz:", error);
    if (error.message.includes("API key")) {
      throw new Error("Invalid API key. Please check your Gemini API key configuration.");
    } else if (error.message.includes("quota")) {
      throw new Error("API quota exceeded. Please try again later.");
    } else {
      throw new Error("Failed to generate quiz. Please try again.");
    }
  }
};

export const explainTopic = async (topicParams) => {
  try {
    const { topic, educationLevel, subject,} = topicParams;

    if (!topic || !educationLevel, subject) {
      throw new Error("Missing required parameters:  topic, or educationLevel.");
    }

    const prompt = `
Explain the topic "${topic}" in the subject "${subject}" for a student at the ${getEducationLevelName(educationLevel)} level.
Make the explanation engaging, clear, and suitable for that level. 
Structure it like this:
- Title
- Description (optional)
- Content (3 sections max, each with heading and short paragraphs)
- Key Points (if any)
- Examples (if any, title + 1 line desc)
Return strictly in JSON format.
    `.trim();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response =  result.response;
    const explanationText = result?.response?.text();
    console.log("Response from Gemini:", explanationText)
    if (!explanationText) {
      throw new Error("No explanation received from the model.");
    }

    let explanationObj;
    try {
      const cleanText = explanationText
  .trim()
  .replace(/^```json/, '')
  .replace(/```$/, '')
  .replace(/^[^{\[]*/, '') 
  .replace(/[^}\]]*$/, '') 
  .trim();
      explanationObj = JSON.parse(cleanText);
    } catch (err) {
      throw new Error("Failed to parse explanation JSON from Gemini.");
    }

    return {
      ...explanationObj,
      subject,
      topic,
      educationLevel
    };

  } catch (error) {
    console.error("Error explaining topic:", error.message || error);
    throw new Error("Failed to explain topic. Please try again.");
  }
};



// Utility remains the same
const getEducationLevelName = (level) => {
  const levels = {
    elementary: 'Elementary School',
    middle: 'Middle School',
    high: 'High School',
    college: 'College/University',
    jee: 'IIT-JEE',
    neet: 'NEET',
    professional: 'Professional'
  };
  return levels[level] || level;
};
