import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getTokenFromLLM(contents: string): Promise<string> {
    const prompt = `
You are an AI designed to analyze the content of financial posts to extract specific information. Evaluate the following text based on two conditions:

1. **Buy/Bull Post**: Determine if the post indicates a "buy" sentiment or is a bullish statement.
2. **Token Address**: Extract the token address if it is present.

Input Text:
"${contents}"

Instructions:
- If the post satisfies **both conditions**, return **only the token address** as a string (e.g., "6AJcP7wuLwmRYLBNbi825wgguaPsWzPBEHcHndpRpump").
- If **either condition is not met**, return "null".

Examples:
- Input: "This is a bull post! 6AJcP7wuLwmRYLBNbi825wgguaPsWzPBEHcHndpRpump"
  Output: "6AJcP7wuLwmRYLBNbi825wgguaPsWzPBEHcHndpRpump"

- Input: "This token is useless! Avoid it!"
  Output: "null"
    `;

    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are an assistant that evaluates financial posts for buy signals and token addresses." },
            { role: "user", content: prompt },
        ],
    });

    const response = completion.choices[0].message.content?.trim() ?? "null";

    const sanitizedResponse = response.replace(/^"(.*)"$/, '$1');

    return sanitizedResponse;
}
