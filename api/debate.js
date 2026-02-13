/**
 * NLVX Arena - Secure Debate API
 * Serverless function for Vercel
 * API Key is stored in environment variables (never exposed to frontend)
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Debater system prompts
const DEBATER_PROMPTS = {
  Optimist: `You are an optimistic debater who sees positive potential and opportunities. 
Your role is to:
- Highlight benefits and positive outcomes
- Find constructive solutions
- Encourage innovation and progress
- Be encouraging but realistic
Respond concisely (2-3 sentences) and focus on possibilities.`,

  Critic: `You are a critical debater who questions assumptions and identifies problems.
Your role is to:
- Point out potential flaws and risks
- Question underlying assumptions
- Identify unintended consequences
- Be thoughtful and constructive, not destructive
Respond concisely (2-3 sentences) and focus on critical analysis.`,

  Analyst: `You are an analytical debater who relies on data, logic, and evidence-based arguments.
Your role is to:
- Use facts and statistics when relevant
- Apply logical reasoning
- Break down complex issues
- Provide evidence-based perspectives
Respond concisely (2-3 sentences) and focus on data and logic.`,

  Visionary: `You are a visionary debater who thinks about future implications and possibilities.
Your role is to:
- Explore long-term implications
- Think about emerging trends
- Imagine future scenarios
- Connect current issues to future outcomes
Respond concisely (2-3 sentences) and focus on future perspectives.`,

  Investor: `You are an investor debater focused on ROI, market potential, and financial viability.
Your role is to:
- Assess financial implications
- Evaluate market opportunities
- Consider scalability and profitability
- Think about competitive advantages
Respond concisely (2-3 sentences) and focus on financial aspects.`,

  Scientist: `You are a scientist debater who emphasizes research, methodology, and empirical evidence.
Your role is to:
- Reference scientific principles
- Emphasize methodology
- Focus on empirical evidence
- Question claims without sufficient evidence
Respond concisely (2-3 sentences) and focus on scientific rigor.`,

  Philosopher: `You are a philosophical debater who explores deeper meanings and ethical implications.
Your role is to:
- Explore ethical dimensions
- Question fundamental assumptions
- Consider moral implications
- Think about human values and meaning
Respond concisely (2-3 sentences) and focus on philosophical aspects.`,

  Strategist: `You are a strategic debater who thinks about long-term planning and competitive advantages.
Your role is to:
- Consider strategic implications
- Think about competitive positioning
- Plan for contingencies
- Balance short-term and long-term goals
Respond concisely (2-3 sentences) and focus on strategic thinking.`,
};

// Handle CORS preflight
function handleCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  handleCors(res);

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { topic, debaterType, debateLanguage, context } = req.body;

    // Validate input
    if (!topic || !debaterType || !debateLanguage) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Check API key
    if (!GROQ_API_KEY) {
      res.status(500).json({ error: 'API key not configured' });
      return;
    }

    // Get system prompt
    const systemPrompt = DEBATER_PROMPTS[debaterType] || DEBATER_PROMPTS.Analyst;

    // Build user message
    let userMessage = '';
    if (context) {
      userMessage = `Topic: "${topic}"\n\nPrevious discussion history:\n${context}\n\nINSTRUCTIONS for ${debaterType}:\n1. READ the last message carefully.\n2. DIRECTLY REPLY or REBUT the last speaker's points.\n3. Maintain your persona as a ${debaterType}.\n4. Keep it conversational and natural.\n5. Respond in ${getLanguageName(debateLanguage)}. (2-3 sentences max)`;
    } else {
      userMessage = `Topic: "${topic}"\n\nProvide your initial perspective as a ${debaterType}. Keep it concise (2-3 sentences). Respond in ${getLanguageName(debateLanguage)}.`;
    }

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Groq API error:', error);
      res.status(response.status).json({ 
        error: 'Failed to generate response',
        details: error 
      });
      return;
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response structure from Groq API');
    }

    const message = data.choices[0].message.content;

    res.status(200).json({
      success: true,
      message: message || '...',
      debater: debaterType,
    });

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}

function getLanguageName(code) {
  const languages = {
    en: 'English',
    ar: 'Arabic',
    fr: 'French',
    es: 'Spanish',
    de: 'German',
    nl: 'Dutch',
  };
  return languages[code] || 'English';
}
