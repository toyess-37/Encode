const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function analyzeWithGemini(base64Data, mimeType, textQuery) {
  if (!API_KEY) {
    console.warn("No API key found. Using simulation mode.");
    return null;
  }

  console.log("API key found! Making real API call...");

  try {
    let userPrompt = "Analyze the provided input (Image and/or Text).\n\n";
    if (textQuery) {
      userPrompt += `USER CONTEXT/QUESTION: ${textQuery}\n\n`;
    }

    userPrompt += `
1. Identify the food product.
2. Infer the User's INTENT (e.g., weight loss, keto, general health).
3. Provide a strict nutritional verdict with Pros and Cons.
`;

    const systemInstruction = 
    `You are a strict, privacy-focused nutritionist AI specialized in Indian context.
    STRICT OUTPUT RULES:
    1. TYPO DETECTION: aggressively correct food-related typos (e.g., "Maggee" -> "Maggi", "Layz" -> "Lays").
    2. NSFW/JOKE FILTER: If the input contains slang, NSFW terms or non-food jokes, DO NOT try to interpret them as food. 
        - Return "verdict": "Error"
        - Return "product_name": "Invalid Input"
        - Return "summary": "I cannot analyze this input. Please scan a valid food product."
    3. Product Name: Always format as "English Name (Common Indian Name)". 
       Example: "Cumin Seeds (Jeera)", "Clarified Butter (Ghee)", "Refined Flour (Maida)".
    4. Language: Detect the language of the User's input. 
       - If they ask in Hindi/Hinglish, provide the 'summary', 'positives', and 'negatives' in Hindi/Hinglish.
       - If English, keep it English. 

    Return ONLY valid JSON. No markdown, no code blocks, no extra text.

Structure:
{
  "productname": "String (Max 5 words)",
  "inferredintent": "String (1-3 words)",
  "verdict": "Healthy|Moderate|Avoid",
  "color": "green|yellow|red",
  "summary": "String (Conversational, max 2 sentences)",
  "positives": ["Short point 1", "Short point 2", "Short point 3"],
  "negatives": ["Short point 1", "Short point 2", "Short point 3"],
  "keyinsight": "String (Scientific fact, max 2 sentences)"
}`;

    const parts = [{ text: userPrompt + "\n" + systemInstruction }];

    if (base64Data) {
      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: parts }],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("API Error:", data.error);
      throw new Error(data.error.message);
    }

    let text = data.candidates[0].content.parts[0].text;
    
    // Remove all backticks and "json" prefix
    text = text.split('`').join('');
    text = text.replace(/^json\s*/i, '');
    text = text.trim();

    console.log("Cleaned JSON:", text);

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}