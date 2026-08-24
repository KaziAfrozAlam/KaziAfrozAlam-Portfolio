import Section, { SnapText } from '@/components/ui/Section';
import { aiAgent, certifications, currentSystem, experience, futureWork, profile, projects, research, skillGroups } from '@/data/portfolio';
import { Bot, ChevronRight, Send, Sparkles, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: number;
  role: 'user' | 'agent';
  text: string;
}

// Simple pattern matching for grounded responses
function getAgentResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
    const skills = skillGroups.flatMap((g) => g.items).filter((v, i, a) => a.indexOf(v) === i).slice(0, 12);
    return `My core technical stack includes: ${skills.join(', ')}. I specialize in Backend AI Engineering with a focus on RAG systems, embeddings-based retrieval, and production ML deployment.`;
  }

    if (q.includes('flyrank') || q.includes('current') || q.includes('now')) {
    return `I'm currently at FlyRank AI (Backend AI Engineering Intern). ${currentSystem.body.slice(0, 240)}`;
  }

  if (q.includes('ml') || q.includes('model') || q.includes('machine learning')) {
    return `I've engineered 8+ classification and regression models using Scikit-learn and TensorFlow. At Rooman Technologies, I automated model scoring pipelines (eliminating ~40% manual work) and boosted F1 scores by ~15% through feature engineering and hyperparameter tuning on imbalanced datasets.`;
  }

    if (q.includes('rag') || q.includes('retrieval') || q.includes('embedding')) {
    return `RAG and embeddings are a core focus. I built an LLM-powered RAG Personal Command Center with Express.js, local retrieval, and grounded responses (with server-side API-key handling). I work with embeddings and retrieval across my backend AI engineering, and I'm exploring advanced patterns like agentic RAG, self-RAG, and corrective RAG.`;
  }

  if (q.includes('learn') || q.includes('studying') || q.includes('next')) {
    const learning = futureWork.cards.find((c) => c.id === 'learning');
    const topics = learning?.items?.length
      ? learning.items.map((i) => i.title).join(', ')
      : 'RAG patterns and distributed systems';
    return `I'm currently deepening my knowledge in: ${topics}. I stay hands-on with backend AI systems, retrieval, and production ML so I can keep building reliable, real-world engineering solutions.`;
  }

  if (q.includes('publication') || q.includes('research') || q.includes('paper')) {
    return `I've co-authored 2 peer-reviewed publications: "${research[0].title}" (${research[0].publisher}, ${research[0].date}) and "${research[1].title}" (${research[1].publisher}, ${research[1].date}).`;
  }

  if (q.includes('experience') || q.includes('work') || q.includes('intern')) {
    const exp = experience.map((e) => `${e.company} (${e.role})`).join(', ');
    return `My professional experience: ${exp}. I've built ML pipelines, backend APIs, and data engineering solutions across these roles.`;
  }

  if (q.includes('education') || q.includes('degree') || q.includes('college')) {
    return `B.E. in Computer Science & Engineering from New Horizon College of Engineering (VTU, Bangalore), graduating in 2025 with a CGPA of 7.35/10. My foundation in CS led me through software → data → ML → AI → Backend systems.`;
  }

  if (q.includes('certification') || q.includes('course') || q.includes('credential')) {
    const certs = certifications.slice(0, 3).map((c) => c.name).join(', ');
    return `I hold ${certifications.length} certifications including: ${certs}, and more. These complement my hands-on engineering experience.`;
  }

  if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('hire')) {
    return `You can reach me at ${profile.email} or connect on LinkedIn (linkedin.com/in/kazi-afroz-alam). I'm open to discussing AI systems, backend engineering, and interesting technical challenges.`;
  }

    if (q.includes('project') || q.includes('built') || q.includes('portfolio')) {
    const titles = projects.map((p) => p.title).join(', ');
    return `Some of my projects: ${titles}. Ask me about any one for details!`;
  }

  if (q.includes('dns') || q.includes('cname') || q.includes('nameserver') || q.includes('domain name') || q.includes('how does a website') || q.includes('how does a url') || q.includes('resolve')) {
    return aiAgent.knowledgeBase.dns;
  }

  if (q.includes('readme') || q.includes('read me') || q.includes('documentation') || q.includes('how is this site built') || q.includes('how was this built') || q.includes('project overview')) {
    return aiAgent.knowledgeBase.readme;
  }

  // Default response
  return `I'm ${profile.name}, a Backend AI Engineer building retrieval systems, embeddings-based applications, and production ML APIs. Ask me about my skills, projects, current work at FlyRank, publications, DNS, or the project README — and if you have a more general technical question, just ask!`;
}

// Calls the `ai-agent` edge function for a grounded answer, falling back to the
// local responder if the function isn't deployed or errors.
async function getAgentAnswer(query: string): Promise<string> {
  if (supabase) {
    try {
      const { data, error } = await supabase.functions.invoke('ai-agent', {
        body: { query, sessionId: String(Date.now()) },
      });
      if (!error && data && typeof data.answer === 'string') return data.answer;
    } catch {
      // fall back to local grounded responses
    }
  }
  return getAgentResponse(query);
}

export default function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || typing) return;

    const userMsg: Message = { id: Date.now(), role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    const query = input.trim();
    setInput('');
    setTyping(true);

    const response = await getAgentAnswer(query);

    const agentMsg: Message = { id: Date.now() + 1, role: 'agent', text: response };
    setMessages((prev) => [...prev, agentMsg]);
    setTyping(false);
  };

  const askSuggested = (q: string) => {
    setInput(q);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <Section id="ai-agent" eyebrow="AI AGENT" className="relative overflow-hidden py-20 lg:py-28">
			<div data-ev-id="ev_54e9c474d0" className="pointer-events-none absolute inset-0 bg-grid opacity-[0.2]" />
			<div data-ev-id="ev_9196783e5f" className="relative pt-10">
				<div data-ev-id="ev_a94f66eac0" className="flex items-center gap-4">
					<div data-ev-id="ev_61c4df2417" className="flex h-12 w-12 items-center justify-center border border-accent bg-accent/10">
						<Bot size={24} className="text-accent" />
					</div>
					<div data-ev-id="ev_80de906e16">
						<h2 data-ev-id="ev_00342cf65c" className="font-display text-4xl font-bold tracking-tight text-paper sm:text-6xl">
							<SnapText text={aiAgent.title} />
						</h2>
						<p data-ev-id="ev_77023de4e7" className="mt-1 font-mono text-[11px] tracking-widest text-accent">{aiAgent.subtitle}</p>
					</div>
				</div>
				<p data-ev-id="ev_11759f384a" className="mt-6 max-w-2xl text-pretty text-base font-light text-paper/70">{aiAgent.description}</p>

				<div data-ev-id="ev_00897732eb" className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
					{/* Chat interface */}
					<div data-ev-id="ev_081c1c6413" className="flex flex-col border border-line bg-panel/30">
						<div data-ev-id="ev_d82e69deff" className="flex items-center justify-between border-b border-line px-4 py-3">
							<div data-ev-id="ev_b2ca478f6d" className="flex items-center gap-2">
								<span data-ev-id="ev_0621f9fdde" className="h-2 w-2 animate-pulse rounded-full bg-accent" />
								<span data-ev-id="ev_e2e7640f24" className="font-mono text-[10px] tracking-widest text-accent">AGENT ONLINE</span>
							</div>
							<span data-ev-id="ev_e1d2231653" className="font-mono text-[11px] tracking-[0.18em] text-dim">GROUNDED ON PORTFOLIO DATA</span>
						</div>

						<div data-ev-id="ev_8b64d3bd9f" ref={chatRef} className="flex min-h-[320px] flex-1 flex-col gap-4 overflow-y-auto p-4">
							{messages.length === 0 &&
              <div data-ev-id="ev_9458514da9" className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
									<Sparkles size={32} className="text-accent/50" />
									<p data-ev-id="ev_245ed80212" className="font-mono text-xs tracking-[0.15em] text-dim">
										ASK ME ANYTHING ABOUT MY ENGINEERING JOURNEY
									</p>
								</div>
              }
							<AnimatePresence>
								{messages.map((msg) =>
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>

										<div data-ev-id="ev_c44e2f4f0c"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center ${
                  msg.role === 'agent' ? 'bg-accent/20' : 'bg-line'}`
                  }>

											{msg.role === 'agent' ?
                    <Bot size={16} className="text-accent" /> :

                    <User size={16} className="text-paper" />
                    }
										</div>
										<div data-ev-id="ev_bd9d1f48a1"
                  className={`max-w-[80%] px-4 py-3 text-base leading-relaxed ${
                  msg.role === 'agent' ?
                  'border border-line bg-ink text-paper/80' :
                  'bg-accent text-accent-foreground'}`
                  }>

											{msg.text}
										</div>
									</motion.div>
                )}
							</AnimatePresence>
							{typing &&
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3">

									<div data-ev-id="ev_43fc1e86a5" className="flex h-8 w-8 items-center justify-center bg-accent/20">
										<Bot size={16} className="text-accent" />
									</div>
									<div data-ev-id="ev_24afc7eb53" className="flex gap-1 px-4 py-3">
										{[0, 1, 2].map((i) =>
                  <motion.span
                    key={i}
                    className="h-2 w-2 rounded-full bg-accent"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />

                  )}
									</div>
								</motion.div>
              }
						</div>

						<form data-ev-id="ev_1610827de2" onSubmit={handleSubmit} className="flex border-t border-line">
							<input data-ev-id="ev_64d741d2b0"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent px-4 py-4 text-base text-paper outline-none placeholder:text-dim" />

							<button data-ev-id="ev_7c1d908c34"
              type="submit"
              disabled={!input.trim() || typing}
              className="flex items-center justify-center bg-accent px-5 text-accent-foreground transition-opacity disabled:opacity-40">

								<Send size={18} />
							</button>
						</form>
					</div>

					{/* Suggested questions */}
					<div data-ev-id="ev_14d9008401" className="flex flex-col gap-4">
						<h3 data-ev-id="ev_2a646234f8" className="font-mono text-xs tracking-[0.18em] text-dim">SUGGESTED QUERIES</h3>
						<div data-ev-id="ev_f515e7b645" className="flex flex-col gap-2">
							{aiAgent.suggestedQuestions.map((q, i) =>
              <button data-ev-id="ev_166c57d71c"
              key={i}
              onClick={() => askSuggested(q)}
              className="group flex items-center gap-3 border border-line bg-panel/30 px-4 py-3 text-left transition-all hover:border-accent hover:bg-panel">

									<ChevronRight size={14} className="shrink-0 text-dim transition-colors group-hover:text-accent" />
									<span data-ev-id="ev_32cd7ff97f" className="text-base text-paper/80 transition-colors group-hover:text-paper">{q}</span>
								</button>
              )}
						</div>

						<div data-ev-id="ev_e314278bd4" className="mt-4 border-t border-line pt-4">
							<p data-ev-id="ev_d528fa2e1c" className="font-mono text-[10px] leading-relaxed tracking-[0.15em] text-dim">
								* THIS AGENT IS GROUNDED ON REAL PORTFOLIO DATA.
								RESPONSES ARE GENERATED FROM MY RESUME, PROJECTS,
								SKILLS, AND EXPERIENCE.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Section>);

}