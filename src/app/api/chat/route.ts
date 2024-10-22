import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { message, product } = await request.json();

  if (!message) {
    return NextResponse.json({ message: 'Missing message in request body' }, { status: 400 });
  }


  const prompt = `
  You are an assistant that provides information about products.
  Here is the product information:
  ${JSON.stringify(product, null, 2)}
  
  The user asked: ${message}. Answer in a helpful way, using the product information provided.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });

    return NextResponse.json({ message: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return NextResponse.json({ message: 'Error processing your request' }, { status: 500 });
  }
}
