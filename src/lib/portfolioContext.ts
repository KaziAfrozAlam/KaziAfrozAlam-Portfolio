// Pure, framework-agnostic helpers that turn the live portfolio data into a
// flat, searchable context. Used by both the client (AIAgent fallback) and the
// Supabase edge function (LLM grounding). No hardcoded knowledge here — the
// portfolio module IS the source of truth.

export interface ContextChunk {
  section: string;
  text: string;
}

function joinNonEmpty(values: Array<unknown>): string {
  return values
    .filter((v) => typeof v === 'string' || typeof v === 'number')
    .map((v) => String(v).trim())
    .filter((v) => v.length > 0)
    .join('. ');
}

function asArray<T = any>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

// Flatten the (already serialized) portfolio object into labeled chunks.
// Granularity: one chunk per meaningful entity (project, experience, card…)
// so retrieval and LLM grounding stay precise.
export function flattenPortfolio(data: any): ContextChunk[] {
  const chunks: ContextChunk[] = [];
  if (!data || typeof data !== 'object') return chunks;

  const profile = data.profile;
  if (profile) {
    chunks.push({
      section: 'Profile',
      text: joinNonEmpty([
        profile.name,
        profile.title,
        profile.tagline,
        profile.supporting,
        profile.locationShort,
        `Email: ${profile.email ?? ''}`,
        `LinkedIn: ${profile.linkedin ?? ''}`,
        `GitHub: ${profile.github ?? ''}`,
        `Booking: ${data.BOOKING_URL ?? ''}`,
      ]),
    });
  }

  const skillGroups = asArray(data.skillGroups);
  for (const g of skillGroups) {
    const items = asArray(g.items).join(', ');
    if (items) chunks.push({ section: `Skills — ${g.label ?? g.title ?? 'Group'}`, text: items });
  }

  const experience = asArray(data.experience);
  for (const e of experience) {
    const points = asArray(e.points).join(' ');
    const stack = asArray(e.stack).length ? ` Stack: ${asArray(e.stack).join(', ')}` : '';
    chunks.push({
      section: `Experience — ${e.company ?? ''}`,
      text: joinNonEmpty([`${e.role ?? ''} (${e.period ?? ''}, ${e.location ?? ''})`, points + stack]),
    });
  }

  const education = asArray(data.education);
  for (const e of education) {
    chunks.push({
      section: `Education — ${e.school ?? e.institution ?? ''}`,
      text: joinNonEmpty([e.degree, e.period, e.detail, e.note]),
    });
  }

  const projects = asArray(data.projects);
  for (const p of projects) {
    const tech = asArray(p.tech).length ? ` Tech: ${asArray(p.tech).join(', ')}` : '';
    const link = p.link ? ` Link: ${p.link}` : '';
    chunks.push({ section: `Project — ${p.title ?? ''}`, text: `${p.description ?? ''}${tech}${link}` });
  }

  const research = asArray(data.research);
  for (const r of research) {
    const link = r.link ? ` Link: ${r.link}` : '';
    chunks.push({
      section: `Publication — ${r.title ?? r.paperTitle ?? ''}`,
      text: joinNonEmpty([`${r.publisher ?? ''} (${r.date ?? ''})`, r.description]) + link,
    });
  }

  const certifications = asArray(data.certifications);
  if (certifications.length) {
    const list = certifications.map((c: any) => `${c.name ?? ''} (${c.issuer ?? ''})`).join('; ');
    chunks.push({ section: 'Certifications', text: list });
  }

  const fieldNotes = asArray(data.fieldNotes);
  if (fieldNotes.length) {
    const list = fieldNotes.map((f: any) => `${f.topic ?? ''} [${f.tag ?? ''}]`).join('; ');
    chunks.push({ section: 'Field Notes', text: list });
  }

  const currentSystem = data.currentSystem;
  if (currentSystem) {
    chunks.push({
      section: `Current Work — ${currentSystem.company ?? 'FlyRank'}`,
      text: joinNonEmpty([currentSystem.statement, currentSystem.body]),
    });
  }

  const futureWork = data.futureWork;
  if (futureWork && Array.isArray(futureWork.cards)) {
    for (const c of futureWork.cards) {
      const items = asArray(c.items)
        .map((i: any) => `${i.title ?? ''}${i.note ? ` — ${i.note}` : ''}${i.link ? ` (${i.link})` : ''}`)
        .join(' | ');
      const tech = asArray(c.tech).length ? ` Tech: ${asArray(c.tech).join(', ')}` : '';
      const link = c.link ? ` Link: ${c.link}` : '';
      chunks.push({
        section: `Future Work — ${c.label ?? c.id ?? ''}`,
        text: joinNonEmpty([c.status ? `Status: ${c.status}` : '', c.title, c.description, items]) + tech + link,
      });
    }
  }

  // Site documentation (DNS explainer, README/overview) lives in the agent's
  // knowledgeBase — treat it as portfolio-provided info, not hardcoded answers.
  const kb = data.aiAgent?.knowledgeBase;
  if (kb) {
    if (kb.dns) chunks.push({ section: 'Site Documentation — DNS', text: kb.dns });
    if (kb.readme) chunks.push({ section: 'Site Documentation — README / Project Overview', text: kb.readme });
  }

  return chunks.filter((c) => c.text && c.text.trim().length > 0);
}

export function toContextText(data: any): string {
  return flattenPortfolio(data)
    .map((c) => `### ${c.section}\n${c.text}`)
    .join('\n\n');
}
