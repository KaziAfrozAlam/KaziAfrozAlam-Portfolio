// Centralized, data-driven content for the entire portfolio.
// Every section reads from here — nothing is hardcoded twice.

export const BOOKING_URL = 'https://calendly.com/afrozalam-8760/30min';

export const profile = {
	name: 'KAZI AFROZ ALAM',
	first: 'KAZI',
	middle: 'AFROZ',
	last: 'ALAM',
	title: 'BACKEND AI ENGINEER',
	kicker: 'BACKEND AI ENGINEER / ML ENGINEER / BANGALORE',
	tagline: 'Building intelligent systems from data, retrieval, and code.',
	supporting: 'Currently building semantic content systems at FlyRank AI.',
	status: 'BUILDING',
	locationShort: 'BANGALORE, INDIA',
	year: '2026',
	email: 'afrozalam.8760@gmail.com',
	phone: '+91 8597037748',
	linkedin: 'https://linkedin.com/in/kazi-afroz-alam/',
	github: 'https://github.com/KaziAfrozAlam',
	cv: '/Kazi-Afroz-Alam-Resume-Updated.pdf',
	typingCycle: [
		'BACKEND AI ENGINEER',
		'AI SYSTEMS BUILDER',
		'RETRIEVAL / EMBEDDINGS',
		'ML ENGINEER',
	],
};

export const nav = [
	{ id: 'about', label: 'ABOUT' },
	{ id: 'experience', label: 'EXPERIENCE' },
	{ id: 'education', label: 'EDUCATION' },
	{ id: 'projects', label: 'PROJECTS' },
	{ id: 'skills', label: 'SKILLS' },
	{ id: 'research', label: 'PUBLICATIONS' },
	{ id: 'certifications', label: 'CERTIFICATIONS' },
	{ id: 'ai-agent', label: 'AI AGENT' },
	{ id: 'future-work', label: 'FUTURE WORK' },
	{ id: 'contact', label: 'CONTACT' },
];

// Ordered list of major sections for the INDEX 00X / 016 readout.
export const sectionIndex = [
	'hero',
	'metrics',
	'about',
	'experience',
	'education',
	'projects',
	'skills',
	'method',
	'research',
	'certifications',
	'ai-agent',
	'future-work',
	'contact',
];
export const TOTAL_INDEX = sectionIndex.length; // 14

export const metrics = [
	{ value: 29, suffix: '', label: 'BI DASHBOARDS' },
	{ value: 8, suffix: '+', label: 'ML MODELS' },
	{ value: 60, suffix: '%', label: 'MANUAL REPORTING REDUCTION' },
	{ value: 2, suffix: '', pad: true, label: 'AI/ML PUBLICATIONS' },
];

export const about = {
	statement: 'I BUILD SYSTEMS THAT TURN DATA INTO INTELLIGENCE.',
	summary:
		'Backend AI Engineer with production experience building retrieval and embeddings-based systems, grounded in a strong data engineering and analytics foundation.',
	table: [
		{ k: 'DISCIPLINE', v: 'BACKEND AI ENGINEERING' },
		{ k: 'FOCUS', v: 'RAG · EMBEDDINGS · RETRIEVAL' },
		{ k: 'STACK', v: 'FASTAPI · ML · AWS · DOCKER' },
		{ k: 'DATA', v: 'SQL · ETL · PANDAS · MONGODB' },
		{ k: 'LOCATION', v: 'BANGALORE, INDIA' },
	],
};

export const currentSystem = {
	tag: 'SYSTEM 001',
	sub: 'CURRENTLY BUILDING',
	company: 'FLYRANK AI',
	statement: 'BACKEND AI SYSTEMS',
	body: 'At FlyRank AI I build production backend/AI systems: an LLM-powered RAG Personal Command Center (Express.js, local retrieval, grounded responses), a FastAPI Task Management API (in-memory -> SQLite -> PostgreSQL/Docker -> Supabase JWT), a resilient Books scraping pipeline (Requests/BeautifulSoup/Pydantic), a PDF reporting service (FastAPI/Playwright), and Inngest background jobs for async report generation.',
	pipeline: [
		{ label: 'CONTENT', note: 'A 20\u2013200 post content library ingested as source nodes.' },
		{ label: 'EMBEDDINGS', note: 'Each post encoded into a semantic vector representation.' },
		{ label: 'SEMANTIC GRAPH', note: 'Posts linked as a relatedness graph, not keyword overlap.' },
		{ label: 'RELATEDNESS', note: 'Fast, no-N+1 relatedness queries run across the graph at scale.' },
		{ label: 'LINK SUGGESTIONS', note: 'Anchor-text-grounded suggestions with configurable hygiene rules.' },
		{ label: 'REVIEW', note: 'Accept / reject workflow; rejected suggestions stay suppressed.' },
		{ label: 'RECOMPUTE', note: 'Background pipeline recomputes only affected posts.' },
		{ label: 'UPDATED GRAPH', note: 'Added / stale / removed diffs surfaced back into the graph.' },
	],
	readout: [
		{ k: 'INPUT', v: 'CONTENT LIBRARY' },
		{ k: 'ENGINE', v: 'SEMANTIC RELATEDNESS' },
		{ k: 'METHOD', v: 'EMBEDDINGS' },
		{ k: 'API', v: 'FAST API' },
		{ k: 'PIPELINE', v: 'DYNAMIC RECOMPUTE' },
	],
};

export const experience = [
	{
		index: '01',
		company: 'FLYRANK AI',
		role: 'BACKEND AI ENGINEERING INTERN',
		period: 'JUL 2026 — PRESENT',
		location: 'Remote',
		featured: true,
		points: [
			'Completed the General AI Fluency Impact Project, building an LLM-powered RAG Personal Command Center with Express.js, local retrieval, grounded responses, and server-side API-key handling.',
			'Built a FastAPI Task Management API progressing from in-memory CRUD to SQLite, PostgreSQL/Docker, and Supabase JWT authentication and authorization.',
			'Engineered a resilient Books scraping pipeline using Requests, BeautifulSoup, Pydantic, caching, retries/backoff, validation, change detection, and JSON/CSV reporting.',
			'Developed a PDF reporting service using FastAPI, SQLite, SQL aggregation, Playwright/Chromium, report serving, 404 handling, and same-day idempotency.',
			'Implemented Inngest background jobs for asynchronous report generation with 202 responses, status polling, retries/backoff, and cron-scheduled heartbeat monitoring.',
		],
		stack: ['EXPRESS.JS', 'FASTAPI', 'RAG', 'BEAUTIFULSOUP', 'PLAYWRIGHT', 'INNGEST', 'PYTHON'],
	},
	{
		index: '02',
		company: 'ROOMAN TECHNOLOGIES',
		role: 'AI/ML ENGINEER INTERN',
		period: 'FEB 2025 — MAY 2025',
		location: 'Bangalore',
		points: [
			'Engineered 8+ classification and regression models (Python, Scikit-learn, TensorFlow), automating model scoring pipelines that eliminated ~40% of manual reporting steps and accelerated weekly business review cycles.',
			'Boosted model F1 scores by ~15% over baseline across 3 production iterations via feature engineering, hyperparameter tuning, and stratified cross-validation on imbalanced churn and customer-risk datasets.',
		],
		stack: ['SCIKIT-LEARN', 'TENSORFLOW', 'PYTHON', 'ML'],
	},
	{
		index: '03',
		company: 'VAULTOFCODES',
		role: 'PYTHON PROGRAMMING INTERN',
		period: 'NOV 2023 — DEC 2023',
		location: 'Remote',
		points: [
			'Delivered analysis-ready datasets from 5+ e-commerce sources by engineering Python scraping pipelines (BeautifulSoup, Scrapy), eliminating fully manual data collection.',
			'Reduced dataset noise by ~30% via Pandas-based deduplication logic; automated recurring collection via scheduled scripts, saving ~5 hours/week.',
		],
		stack: ['BEAUTIFULSOUP', 'SCRAPY', 'PANDAS', 'PYTHON'],
	},
];

export const education = [
	{
		year: '2021 → 2025',
		title: 'B.E. / COMPUTER SCIENCE & ENGINEERING',
		institution: 'NEW HORIZON COLLEGE OF ENGINEERING',
		meta: 'VTU / BANGALORE',
		score: 'CGPA 7.35 / 10',
		foundation: true,
	},
	{
		year: '2021',
		title: 'XII STANDARD',
		institution: 'EAST WEST MODEL SCHOOL',
		meta: 'PURBA BARDHAMAN, WEST BENGAL',
		score: '86%',
		foundation: false,
	},
];

export const educationBranch = ['COMPUTER SCIENCE', 'SOFTWARE', 'DATA', 'ML', 'AI', 'BACKEND'];

interface Project {
	num: string;
	title: string;
	stack: string;
	kind: 'flow' | 'ml' | 'stream' | 'bi' | 'tableau';
	accent: string;
	flow: string[];
	metrics: { big: string; small: string }[];
	github: string;
	points: string[];
	bars?: number[];
	cloud?: string[];
}

export const projects: Project[] = [
	{
		num: '01',
		title: 'RAG PERSONAL COMMAND CENTER',
		stack: 'EXPRESS.JS / RAG / LOCAL RETRIEVAL / LLM',
		kind: 'flow',
		accent: '#22d3ee',
		flow: ['USER', 'EXPRESS', 'RETRIEVAL', 'LLM', 'RESPONSE'],
		metrics: [],
		github: 'https://github.com/KaziAfrozAlam/General-AI-Fluency-Impact-Project',
		points: [
			'Completed the General AI Fluency Impact Project — built an LLM-powered RAG Personal Command Center with Express.js and local retrieval for grounded responses.',
			'Implemented server-side API-key handling so secrets never reach the client, with retrieval-augmented answers over local knowledge.',
		],
	},
	{
		num: '02',
		title: 'FASTAPI TASK MANAGEMENT API',
		stack: 'FASTAPI / SQLITE / POSTGRESQL / DOCKER / SUPABASE / JWT',
		kind: 'flow',
		accent: '#a3e635',
		flow: ['CLIENT', 'FASTAPI', 'AUTH', 'CRUD', 'DATABASE'],
		metrics: [],
		github: 'https://github.com/KaziAfrozAlam/Task-Management-CRUD-API-FastAPI',
		points: [
			'Built a FastAPI Task Management API progressing from in-memory CRUD to SQLite, then PostgreSQL with Docker Compose.',
			'Added Supabase JWT authentication and authorization — Bearer-token protected task, protected, and admin routes with 401/403 access control.',
		],
	},
	{
		num: '03',
		title: 'BOOKS SCRAPING PIPELINE',
		stack: 'REQUESTS / BEAUTIFULSOUP / PYDANTIC / CACHING',
		kind: 'flow',
		accent: '#f472b6',
		flow: ['SOURCE', 'SCRAPE', 'VALIDATE', 'CACHE', 'REPORT'],
		metrics: [],
		github: 'https://github.com/KaziAfrozAlam/Books-Scraper-Pipeline',
		points: [
			'Engineered a resilient Books scraping pipeline using Requests and BeautifulSoup with Pydantic validation and JSON/CSV reporting.',
			'Added caching, retries/backoff, validation, and change detection for reliable, low-noise data collection.',
		],
	},
	{
		num: '04',
		title: 'PDF REPORTING SERVICE',
		stack: 'FASTAPI / SQLITE / SQL / PLAYWRIGHT / CHROMIUM',
		kind: 'flow',
		accent: '#fbbf24',
		flow: ['REQUEST', 'FASTAPI', 'SQL', 'RENDER', 'SERVE'],
		metrics: [],
		github: 'https://github.com/KaziAfrozAlam/PDF-Report-Generator',
		points: [
			'Developed a PDF reporting service using FastAPI, SQLite, and SQL aggregation with Playwright/Chromium rendering.',
			'Implemented report serving, 404 handling, and same-day idempotency for repeatable, reliable report delivery.',
		],
	},
	{
		num: '05',
		title: 'INNGEST BACKGROUND JOBS',
		stack: 'INNGEST / FASTAPI / ASYNC / CRON',
		kind: 'stream',
		accent: '#818cf8',
		flow: ['API', 'INNGEST', 'JOB', 'POLL', 'DONE'],
		metrics: [],
		github: 'https://github.com/KaziAfrozAlam/Inngest-Server-Background-Job',
		points: [
			'Implemented Inngest background jobs for asynchronous report generation with 202 responses and status polling.',
			'Added retries/backoff and cron-scheduled heartbeat monitoring for resilient, observable job execution.',
		],
	},
	{
		num: '06',
		title: 'CUSTOMER CHURN PREDICTION API',
		stack: 'PYTHON / FASTAPI / SCIKIT-LEARN / DOCKER / AWS',
		kind: 'ml',
		accent: '#a3e635',
		flow: ['DATA', 'TRAIN', 'MODEL', 'API', 'DOCKER', 'AWS'],
		metrics: [ { big: '7,000+', small: 'RECORDS' }, { big: '85%', small: 'TEST ACCURACY' } ],
		github: 'https://github.com/KaziAfrozAlam/Churn-Prediction',
		cloud: ['EC2', 'ECR', 'S3', 'SAGEMAKER'],
		points: [
			'Production-ready ML FAST API using a Random Forest Classifier trained on 7,000+ telecom records, achieving 85% test accuracy.',
			'Deployed on AWS EC2 with Docker, ECR, CI/CD, IAM-controlled access, and SageMaker-managed training — an end-to-end ML deployment workflow.',
			'FastAPI prediction, health-check, and Pydantic validation endpoints for reliable model inference.',
		],
	},
	{
		num: '07',
		title: 'REAL-TIME TWITTER SENTIMENT ANALYSIS',
		stack: 'KAFKA / SPARK STREAMING / PYSPARK ML / NLP',
		kind: 'stream',
		accent: '#f472b6',
		flow: ['STREAM', 'KAFKA', 'SPARK', 'ML', 'SENTIMENT'],
		metrics: [ { big: '92%', small: 'ACCURACY' } ],
		github: 'https://github.com/KaziAfrozAlam/Real-Time-Social-Media-Analytics-Pipeline',
		points: [
			'Real-time sentiment analysis pipeline using Apache Kafka, Spark Streaming, and PySpark ML.',
			'Sentiment classification and model evaluation achieving 92% accuracy on the project dataset.',
			'Integrated the ML component with the streaming workflow to continuously process and classify incoming tweet data.',
		],
	},
	{
		num: '08',
		title: 'BUSINESS INTELLIGENCE / POWER BI',
		stack: '14 DASHBOARDS / SALES / HR / FINANCE',
		kind: 'bi',
		accent: '#fbbf24',
		flow: [],
		metrics: [ { big: '14', small: 'DASHBOARDS' }, { big: '50%+', small: 'REPORTING SAVED' } ],
		github: 'https://github.com/KaziAfrozAlam/PowerBI',
		bars: [64, 82, 40, 96, 58, 74],
		points: [
			'Designed 14 business-ready dashboards across Sales, HR, and Finance using SQL, Power Query, DAX, interactive KPIs, drill-through filters, and slicers.',
			'Automated reporting workflows and delivered stakeholder-ready visualizations — an estimated 50%+ reduction in manual reporting effort across covered functions.',
		],
	},
	{
		num: '09',
		title: 'BUSINESS INTELLIGENCE / TABLEAU',
		stack: '15 WORKBOOKS / 6+ DATASETS',
		kind: 'tableau',
		accent: '#818cf8',
		flow: [],
		metrics: [ { big: '15', small: 'WORKBOOKS' }, { big: '6+', small: 'DATASETS' } ],
		github: 'https://github.com/KaziAfrozAlam/Tableau',
		bars: [30, 55, 78, 46, 90, 62, 38, 70],
		points: [
			'Delivered 15 Tableau workbooks across 6+ datasets, transforming sales, logistics, and environmental data into interactive business insights.',
			'Implemented LOD expressions, calculated fields, parameters, and multi-source joins across multiple data granularities and business dimensions.',
		],
	},
];

export const skillGroups = [
	{ group: 'AI / ML', items: ['PYTHON', 'FASTAPI', 'EMBEDDINGS', 'RETRIEVAL', 'SCIKIT-LEARN', 'TENSORFLOW'] },
	{ group: 'BACKEND', items: ['FASTAPI', 'LANGCHAIN', 'PYTHON'] },
	{ group: 'CLOUD / DEVOPS', items: ['AWS', 'DOCKER', 'GIT', 'CI/CD'] },
	{ group: 'DATA ENGINEERING', items: ['PYTHON', 'SQL', 'MONGODB', 'PANDAS', 'NUMPY', 'ETL'] },
	{ group: 'ANALYTICS', items: ['POWER BI', 'TABLEAU', 'EXCEL'] },
	{ group: 'DATA ACQUISITION', items: ['SCRAPY', 'BEAUTIFULSOUP', 'OPENCV'] },
];

export const method = [
	{ step: 'UNDERSTAND', note: 'Frame the real problem and constraints before touching code.' },
	{ step: 'MODEL', note: 'Shape the data, entities, and relationships the system depends on.' },
	{ step: 'BUILD', note: 'Implement clean, validated services and pipelines.' },
	{ step: 'VALIDATE', note: 'Test against metrics, edge cases, and real inputs.' },
	{ step: 'DEPLOY', note: 'Ship to production with Docker, cloud, and CI/CD.' },
	{ step: 'ITERATE', note: 'Measure, recompute, and refine as the system evolves.' },
];

export const research = [
	{
		num: '01',
		title: 'AUTOMATED EVALUATION AND ASSESSMENT SYSTEM USING AI, MACHINE LEARNING, AND NLP',
		publisher: 'SPRINGER SINGAPORE',
		date: 'APR 15, 2026',
		description: 'This paper was presented at the 6th International Conference on Data Science, Machine Learning, and Applications (ICDSMLA 2024). Published in Volume 1529 of the Lecture Notes in Electrical Engineering series. The research proposes an AI-driven framework for automating evaluation and assessment systems using Machine Learning and Natural Language Processing, with a focus on improving accuracy, efficiency, and scalability in large-scale textual data processing.',
		link: 'https://doi.org/10.1007/978-981-95-5835-3_74',
	},
	{
		num: '02',
		title: 'UNVEILING THE TRENDS IN MACHINE LEARNING',
		publisher: 'IJSRCSEIT',
		date: 'JUN 20, 2024',
		description: 'This paper explores the rapid evolution and adoption of Machine Learning, highlighting its transformative potential across healthcare, finance, autonomous systems, and NLP. Discusses emerging methodologies like explainable AI, federated learning, and adversarial robustness techniques that offer solutions to bias, interpretability, and data privacy challenges.',
		link: 'https://ijsrcseit.com/CSEIT241074',
	},
];

export const certifications = [
	{ name: 'MACHINE LEARNING SPECIALIZATION', issuer: 'DEEPLEARNING.AI + STANFORD ONLINE' },
	{ name: 'FOUNDATION: INTRODUCTION TO LANGCHAIN - PYTHON', issuer: 'LANGCHAIN' },
	{ name: 'DATABRICKS FUNDAMENTALS', issuer: 'DATABRICKS ACADEMY' },
	{ name: 'CLOUD COMPUTING', issuer: 'NPTEL' },
	{ name: 'SQL BASIC', issuer: 'HACKERRANK' },
	{ name: 'PYTHON BASIC', issuer: 'HACKERRANK' },
];

export const capstone = {
	tag: 'SYSTEM 002',
	sub: 'NEXT BUILD',
	label: 'CAPSTONE / COMING SOON',
	statement: 'THE NEXT SYSTEM IS STILL BEING BUILT.',
	readout: [
		{ k: 'PROBLEM', v: '—' },
		{ k: 'SYSTEM', v: '—' },
		{ k: 'STACK', v: '—' },
		{ k: 'STATUS', v: 'IN DEVELOPMENT' },
	],
};

export const fieldNotes = [
	{ topic: 'RAG / EMBEDDINGS', tag: 'RETRIEVAL' },
	{ topic: 'BACKEND AI SYSTEMS', tag: 'ARCHITECTURE' },
	{ topic: 'ML DEPLOYMENT', tag: 'PRODUCTION' },
	{ topic: 'RETRIEVAL SYSTEMS', tag: 'SEARCH' },
	{ topic: 'ENGINEERING NOTES', tag: 'PROCESS' },
];

// AI Agent — interactive "Ask Kazi" interface grounded on portfolio data
export const aiAgent = {
	title: 'ASK AFROZ.AI',
	subtitle: 'AI AGENT',
	description: 'An interactive interface trained on my resume, projects, skills, publications, and future work. Ask me anything about my engineering journey.',
	suggestedQuestions: [
		'What are your core technical skills?',
		'Tell me about your FlyRank work',
		'What ML models have you built?',
		'What\'s your experience with RAG systems?',
		'What are you currently learning?',
		'Tell me about your publications',
		'How does DNS work?',
		'Can you show the project README / overview?',
	],
	// Knowledge base for the agent (grounded responses)
	knowledgeBase: {
		skills: 'Python, FastAPI, RAG, Embeddings, Retrieval, Scikit-learn, TensorFlow, AWS, Docker, SQL, MongoDB, Pandas, Power BI, Tableau',
		currentWork: 'At FlyRank AI (Backend AI Engineering Intern) I build production backend/AI systems: an LLM-powered RAG Personal Command Center, a FastAPI Task Management API with Supabase JWT auth, a resilient Books scraping pipeline, a PDF reporting service, and Inngest background jobs.',
		experience: '3 internships: FlyRank AI (Backend AI Engineering Intern — RAG, FastAPI, scraping, reporting, Inngest), Rooman Technologies (AI/ML), VaultOfCodes (Python). Built 8+ ML models and 29 BI dashboards.',
		education: 'B.E. Computer Science & Engineering from New Horizon College of Engineering, VTU Bangalore (2021-2025), CGPA 7.35/10',
		publications: '2 peer-reviewed publications: Springer ICDSMLA 2024 (AI/ML/NLP assessment system) and IJSRCSEIT Volume 10 (ML trends)',
		focus: 'Backend AI systems, RAG pipelines, embeddings-based retrieval, production ML deployment, data engineering',
		dns: 'DNS is the internet\'s phone book. When you type a name like www.example.com, your browser needs the server\'s numeric IP address to connect, and DNS translates the name into that number. A CNAME record is an alias that points one domain name to another (e.g., www.example.com -> example.com), which is useful when the underlying address may change — you update one record and everything pointing to it follows. When you type an address: (1) the browser asks your DNS resolver (your ISP\'s or a public one like 8.8.8.8); (2) if not cached, the resolver asks a root nameserver, which points it to the .com TLD nameserver; (3) the TLD nameserver points to the authoritative nameserver for the domain; (4) that authoritative server returns the actual record (an A record with the IP, or a CNAME leading to it); (5) the resolver caches the answer (per the record\'s TTL) and returns the IP to your browser; (6) the browser connects to that IP, the host answers, and the page loads. Chain: browser -> resolver -> root -> TLD nameserver -> authoritative nameserver -> record -> response -> browser -> host.',
		readme: 'This is a personal portfolio: a single-page React + TypeScript app built with Vite, styled with Tailwind CSS, and animated with Framer Motion. It presents my backend AI engineering background — experience, projects, skills, education, publications, and future work — plus an interactive AI agent (Afroz.AI). The AI agent is a Supabase Edge Function (Deno) grounded on my resume; it falls back to a local deterministic responder. Run locally with `npm install` then `npm run dev`. Deploy the agent with `supabase functions deploy ai-agent --no-verify-jwt` (set AGENT_API_KEY for optional LLM mode). Full details, env vars, and deploy steps are in the README.',
	},
};

// Future Work — engineering roadmap dashboard
export const futureWork = {
	title: 'FUTURE WORK',
	subtitle: 'Systems, experiments, research, and learning currently in the pipeline.',
	cards: [
		{ id: 'capstone', label: 'CAPSTONE WORK', icon: 'git-branch', empty: true },
		{ id: 'experiments', label: 'EXPERIMENTS', icon: 'flask', empty: true },
		{ id: 'field-notes', label: 'FIELD NOTES', icon: 'book-open', empty: true },
		{
			id: 'learning',
			label: 'LEARNING QUEUE',
			icon: 'graduation-cap',
			empty: false,
			items: [
				{ title: 'BASIC RAG', note: 'Foundations of retrieval-augmented generation', status: 'PLANNED' },
				{ title: 'DISTRIBUTED SYSTEMS', note: 'Scaling ML infrastructure', status: 'PLANNED' },
				{ title: 'ADVANCED RAG', note: 'Agentic RAG, self-RAG, corrective RAG', status: 'PLANNED' },
			],
		},
		{ id: 'applied-ai', label: 'APPLIED AI SYSTEMS', icon: 'network', empty: true },
		{ id: 'research', label: 'RESEARCH PROJECTS', icon: 'microscope', empty: true },
	],
};
