import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text, tone, customTone } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const selectedTone = tone === "custom" ? customTone : tone;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional text editor. Your task is to improve the given text by:
            1. Fixing any grammatical errors
            2. Adjusting the tone to be ${selectedTone}
            3. Maintaining the original meaning while enhancing clarity and flow
            
            Provide only the processed text without any explanations or additional comments.`
        },
        {
          role: "user",
          content: text
        }
      ],
    });

    const processedText = completion.choices[0].message.content;

    return NextResponse.json({ processedText });
  } catch (error) {
    console.error("Error processing text:", error);
    return NextResponse.json(
      { error: "Failed to process text" },
      { status: 500 }
    );
  }
}