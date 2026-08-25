// Edge function: grounded AI-agent responses, powered by the portfolio's
// resume data. When AGENT_API_KEY is set, an LLM is used; otherwise a
// deterministic, resume-accurate responder answers.
// Deploy:  supabase functions deploy ai-agent --no-verify-jwt
import { log } from '../_shared/logger.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Knowledge base — mirrors src/data/portfolio.ts so answers stay on-resume.
const KB = {
  skills: 'Python, FastAPI, RAG, Embeddings, Retrieval, Scikit-learn, TensorFlow, AWS, Docker, SQL, MongoDB, Pandas, Power BI, Tableau',
  currentWork: 'At FlyRank AI (Backend AI Engineering Intern) I build production backend/AI systems: an LLM-powered RAG Personal Command Center (Express.js, local retrieval, grounded responses), a FastAPI Task Management API with Supabase JWT auth, a resilient Books scraping pipeline, a PDF reporting service, and Inngest background jobs for async report generation.',
  experience: '3 internships: FlyRank AI (Backend AI Engineering Intern — RAG, FastAPI, scraping, reporting, Inngest), Rooman Technologies (AI/ML), VaultOfCodes (Python). Built 8+ ML models and 29 BI dashboards.',
  education: 'B.E. Computer Science & Engineering from New Horizon College of Engineering, VTU Bangalore (2021-2025), CGPA 7.35/10',
  publications: '2 peer-reviewed publications: Springer ICDSMLA 2024 (AI/ML/NLP assessment system) and IJSRCSEIT Volume 10 (ML trends)',
  learning: 'BASIC RAG, DISTRIBUTED SYSTEMS, and ADVANCED RAG (agentic, self-RAG, corrective)',
  email: 'afrozalam.8760@gmail.com',
  linkedin: 'linkedin.com/in/kazi-afroz-alam',
  projects: 'RAG Personal Command Center (Express.js, local retrieval, grounded LLM responses), FastAPI Task Management API (SQLite to PostgreSQL/Docker to Supabase JWT), Books Scraping Pipeline (Requests/BeautifulSoup/Pydantic), PDF Reporting Service (FastAPI/Playwright), and Inngest Background Jobs (async report generation). I have also built a Customer Churn Prediction API (85% accuracy, AWS), Real-time Twitter Sentiment Analysis (92%, Kafka/Spark), and 29 BI dashboards across Power BI and Tableau.',
  dns: "DNS is the internet's phone book. When you type a name like www.example.com, your browser needs the server's numeric IP address to connect, and DNS translates the name into that number. A CNAME record is an alias that points one domain name to another (e.g., www.example.com -> example.com), which is useful when the underlying address may change. When you type an address: (1) the browser asks your DNS resolver (your ISP's or a public one like 8.8.8.8); (2) if not cached, the resolver asks a root nameserver, which points it to the .com TLD nameserver; (3) the TLD nameserver points to the authoritative nameserver for the domain; (4) that authoritative server returns the actual record (an A record with the IP, or a CNAME leading to it); (5) the resolver caches the answer (per the record's TTL) and returns the IP to your browser; (6) the browser connects to that IP, the host answers, and the page loads. Chain: browser -> resolver -> root -> TLD nameserver -> authoritative nameserver -> record -> response -> browser -> host.",
  readme: 'This is a personal portfolio: a single-page React + TypeScript app built with Vite, styled with Tailwind CSS, and animated with Framer Motion. It presents my backend AI engineering background — experience, projects, skills, education, publications, and future work — plus an interactive AI agent (Afroz.AI). The AI agent is a Supabase Edge Function (Deno) grounded on my resume; it falls back to a local deterministic responder. Run locally with `npm install` then `npm run dev`. Deploy the agent with `supabase functions deploy ai-agent --no-verify-jwt` (set AGENT_API_KEY for optional LLM mode). Full details, env vars, and deploy steps are in the README.',
};

function getAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
    return `My core technical stack includes: ${KB.skills}. I specialize in Backend AI Engineering with a focus on RAG systems, embeddings-based retrieval, and production ML deployment.`;
  }
    if (q.includes('flyrank') || q.includes('current') || q.includes('now')) {
    return `I'm currently at FlyRank AI (Backend AI Engineering Intern). ${KB.currentWork}`;
  }
  if (q.includes('ml') || q.includes('model') || q.includes('machine learning')) {
    return `I've engineered 8+ classification and regression models using Scikit-learn and TensorFlow. At Rooman Technologies I automated model scoring pipelines (eliminating ~40% manual work) and boosted F1 scores by ~15% through feature engineering and hyperparameter tuning on imbalanced datasets.`;
  }
    if (q.includes('rag') || q.includes('retrieval') || q.includes('embedding')) {
    return `RAG and embeddings are a core focus. I built an LLM-powered RAG Personal Command Center with Express.js, local retrieval, and grounded responses (server-side API-key handling). I work with embeddings and retrieval across my backend AI engineering, and I'm exploring advanced patterns like agentic RAG, self-RAG, and corrective RAG.`;
  }
  if (q.includes('learn') || q.includes('studying') || q.includes('next')) {
    return `I'm currently deepening my knowledge in: ${KB.learning}. I stay hands-on with backend AI systems, retrieval, and production ML.`;
  }
  if (q.includes('publication') || q.includes('research') || q.includes('paper')) {
    return `I've co-authored 2 peer-reviewed publications: ${KB.publications}.`;
  }
  if (q.includes('experience') || q.includes('work') || q.includes('intern')) {
    return `My professional experience: ${KB.experience}. I've built ML pipelines, backend APIs, and data engineering solutions across these roles.`;
  }
  if (q.includes('education') || q.includes('degree') || q.includes('college')) {
    return `B.E. in Computer Science & Engineering from New Horizon College of Engineering (VTU, Bangalore), graduating in 2025 with a CGPA of 7.35/10.`;
  }
  if (q.includes('certification') || q.includes('course') || q.includes('credential')) {
    return `I hold 6 core certifications — Machine Learning Specialization (DeepLearning.AI + Stanford), Foundations: Introduction to LangChain, Databricks Fundamentals, Cloud Computing (NPTEL), SQL Basic and Python Basic (HackerRank) — plus a set of Anthropic/AI learning credentials.`;
  }
  if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('hire')) {
    return `You can reach me at ${KB.email} or connect on LinkedIn (${KB.linkedin}). I'm open to discussing AI systems, backend engineering, and interesting technical challenges.`;
  }
  if (q.includes('project') || q.includes('built') || q.includes('portfolio')) {
    return `Key projects: ${KB.projects}`;
  }
  if (q.includes('dns') || q.includes('cname') || q.includes('nameserver') || q.includes('domain name') || q.includes('how does a website') || q.includes('how does a url') || q.includes('resolve')) {
    return `DNS: ${KB.dns}`;
  }
  if (q.includes('readme') || q.includes('read me') || q.includes('documentation') || q.includes('how is this site built') || q.includes('how was this built') || q.includes('project overview')) {
    return KB.readme;
  }
  return `I'm Kazi Afroz Alam, a Backend AI Engineer building retrieval systems, embeddings-based applications, and production ML APIs. Ask me about my skills, projects, current work at FlyRank, publications, DNS, or the project README — and feel free to ask a more general technical question too.`;
}

// Optional: if AGENT_API_KEY is provided, ground an LLM with the resume context.
async function maybeLLM(query: string): Promise<string | null> {
  const key = Deno.env.get('AGENT_API_KEY');
  if (!key) return null;
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are Kazi Afroz Alam's portfolio AI assistant. Use the context below to answer questions about Kazi's background, and you may also answer general technical questions accurately and helpfully. Be concise and professional:\n${JSON.stringify(KB)}`,
          },
          { role: 'user', content: query },
        ],
      }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.choices?.[0]?.message?.content?.trim() ?? null;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    await log('ai-agent', 'info', 'agent request received');

    const { query, sessionId } = await req.json();
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'query required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    let answer = await maybeLLM(query);
    if (!answer) answer = getAnswer(query);

    await log('ai-agent', 'info', 'agent responded', { sessionId });
    return new Response(JSON.stringify({ answer }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    await log('ai-agent', 'error', 'unhandled error', { error: String(err) });
    return new Response(
      JSON.stringify({ error: 'internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
