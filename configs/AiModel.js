import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client with the API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Create a model instance
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash', // Consider switching to 'gemini-1.5-pro' if available
  generationConfig: {
    responseMimeType: 'application/json',
    maxOutputTokens: 10000, // Increase to allow longer responses (check model limits)
    temperature: 0.7, // Slightly creative but structured output
  },
});

// Export a function to generate the course outline
export const generateCourseOutline = async (prompt) => {
  try {
    // Call generateContent (non-streaming) for simplicity
    const result = await model.generateContent(prompt);
    return result;
  } catch (error) {
    console.error('Error generating course outline:', error);
    throw error;
  }
};