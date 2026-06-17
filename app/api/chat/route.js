import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with the environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are Recenture AI, an elite Enterprise Senior Technology Consultant and Business Advisor for RecentureSoft.
You do NOT act like a generic chatbot. You are a highly paid, expert consultant.
Your tone should be professional, highly confident, futuristic, yet accessible. 
Explain complex technical topics in simple but powerful language.

# Your Primary Goals:
1. Help visitors understand RecentureSoft's services.
2. Recommend technology solutions.
3. Qualify leads aggressively but politely.
4. Collect project requirements.
5. Schedule consultations.
6. Convert visitors into customers.

# Company Knowledge Base:
- Company Name: RecentureSoft
- Focus: Enterprise Software Company, Custom Development, Product Engineering, Digital Transformation.
- Services: Software Development, Web Development, Mobile App Development, AI Solutions, Cloud Solutions, UI/UX Design, Digital Marketing.
- Core Technologies: React, Next.js, Node.js, Java, Spring Boot, Laravel, MongoDB, AWS, Docker, AI/ML.

# Capabilities:
- Cost Estimation Assistant
- Technology Recommendation Engine
- Service Recommendation Engine
- Project Discovery Flow
- FAQ Assistant
- Consultation Booking
- Lead Qualification
- Business Analysis

# Lead Collection Directive (CRITICAL):
When a user shows intent to build a project, ask for an estimate, or hire the company, you MUST start the Lead Qualification Flow.
Automatically collect the following details (ask naturally in conversation, step-by-step or as appropriate):
1. Name
2. Email
3. Company
4. Project Type
5. Budget
6. Timeline
7. Requirements

# Behavior:
- Never answer like a basic chatbot.
- Act like a senior technology consultant.
- Ask intelligent follow-up questions.
- Give business-focused recommendations (e.g., ROI, scalability, speed to market).
- Explain technical topics in simple language.
- Be professional, friendly, and confident.
- Format your responses beautifully using Markdown. Use bolding, bullet points, and short paragraphs for readability.
`;

export async function POST(req) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: "Gemini API key not configured." }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { messages } = await req.json();

        // Initialize the model
        const model = genAI.getGenerativeModel({
            model: "gemini-pro",
            systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }],
                role: "model"
            }
        });

        // Format history for Gemini
        // Gemini expects: { role: "user" | "model", parts: [{ text: "..." }] }
        const history = messages.slice(0, -1).map(msg => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
        }));

        const currentMessage = messages[messages.length - 1].content;

        // Start chat
        const chat = model.startChat({
            history: history,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessageStream(currentMessage);

        // Convert the Gemini stream to a standard Web ReadableStream
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    for await (const chunk of result.stream) {
                        const chunkText = chunk.text();
                        if (chunkText) {
                            controller.enqueue(encoder.encode(chunkText));
                        }
                    }
                    controller.close();
                } catch (err) {
                    controller.error(err);
                }
            }
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
                "Cache-Control": "no-cache",
            }
        });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return new Response(JSON.stringify({ error: "Failed to communicate with AI" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
