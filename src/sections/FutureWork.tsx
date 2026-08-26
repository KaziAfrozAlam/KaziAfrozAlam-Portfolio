import Section from '@/components/ui/Section';
import { futureWork } from '@/data/portfolio';
import { BookOpen, FlaskConical, GitBranch, GraduationCap, Microscope, Rocket, Share2, type LucideIcon } from 'lucide-react';

// Icon mapping - using Share2 for network nodes icon
const icons: Record<string, LucideIcon> = {
  'git-branch': GitBranch,
  flask: FlaskConical,
  'book-open': BookOpen,
  'graduation-cap': GraduationCap,
  network: Share2,
  microscope: Microscope
};

interface CardItem {
  title: string;
  note: string;
  status: string;
}

interface FutureCardData {
  id: string;
  label: string;
  icon: string;
  empty: boolean;
  items?: CardItem[];
}

// Empty state indicator
function EmptyState() {
  return (
    <div data-ev-id="ev_47df07299d" className="flex flex-1 flex-col items-center justify-center gap-3 py-16">
			<div data-ev-id="ev_ad3f35c297" className="h-3 w-3 rounded-full bg-[#3a3a3a]" />
			<p data-ev-id="ev_0ada2d6f9d" className="text-base text-[#6b6b6b]">Details coming soon.</p>
		</div>);

}

// Learning queue timeline
function LearningTimeline({ items }: {items: CardItem[];}) {
  return (
    <div data-ev-id="ev_a8b3381a6d" className="flex flex-col px-6 py-5">
			{items.map((item, i) =>
      <div data-ev-id="ev_0e9381117e" key={item.title} className="flex">
					{/* Left indicator column */}
					<div data-ev-id="ev_23e9f47bcb" className="flex w-6 flex-col items-center">
						<div data-ev-id="ev_5db2ef9f96" className="h-2.5 w-2.5 rounded-full bg-accent" />
						{i < items.length - 1 &&
          <div data-ev-id="ev_8f54a6dccd" className="my-1.5 w-px flex-1 bg-[#2a2a2a]" style={{ minHeight: '40px' }} />
          }
					</div>
					{/* Content */}
					<div data-ev-id="ev_01ad521997" className="flex flex-1 items-start justify-between gap-4 pb-6 pl-4">
						<div data-ev-id="ev_17e6308c0b" className="flex flex-col gap-1">
							<h4 data-ev-id="ev_b9152b58fc" className="font-display text-base font-semibold tracking-wide text-paper">
								{item.title}
							</h4>
							<p data-ev-id="ev_aee1a8697c" className="text-base text-[#6b6b6b]">{item.note}</p>
						</div>
						<span data-ev-id="ev_f6d3e55a5c" className="shrink-0 bg-[#2a2a2a] px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] text-[#6b6b6b]">
							{item.status}
						</span>
					</div>
				</div>
      )}
		</div>);

}

// Individual card component
function FutureCard({ card }: {card: FutureCardData;}) {
  const Icon = icons[card.icon] ?? Rocket;

  return (
    <div data-ev-id="ev_dab07857de" className="flex flex-col border border-[#1e1e1e] bg-[#0a0a0a]">
			{/* Card header */}
			<div data-ev-id="ev_7e83fc0ea0" className="flex items-center justify-between border-b border-[#1e1e1e] px-5 py-4">
				<div data-ev-id="ev_9672a886eb" className="flex items-center gap-3">
					<Icon size={20} className="text-accent" strokeWidth={1.5} />
					<h3 data-ev-id="ev_ed861cf303" className="font-display text-lg font-semibold tracking-wide text-paper">
						{card.label}
					</h3>
				</div>
				<span data-ev-id="ev_633ffa2a16" className="font-mono text-xs tracking-[0.15em] text-accent">
					IN PIPELINE
				</span>
			</div>

			{/* Card content */}
			{card.empty ?
      <EmptyState /> :

      <LearningTimeline items={card.items ?? []} />
      }
		</div>);

}

export default function FutureWork() {
  // Safely access cards with fallback
  const cards: FutureCardData[] = ((futureWork as {cards?: FutureCardData[];}).cards ?? []).filter(
    (c) => !c.empty,
  );

  return (
    <Section id="future-work" eyebrow="FUTURE WORK" bleed>
			{/* Outer container with subtle border */}
			<div data-ev-id="ev_e729a4b631" className="mx-5 my-10 border border-[#1a1a1a] bg-[#080808] p-8 sm:mx-8 sm:p-10 lg:mx-14 lg:p-12">
				{/* Section header */}
				<div data-ev-id="ev_46c8c98511" className="mb-10">
					<div data-ev-id="ev_6821265b8e" className="flex items-center gap-3">
						<Rocket size={24} className="text-accent" strokeWidth={1.5} />
						<h2 data-ev-id="ev_bd505c05ef" className="font-display text-3xl font-bold tracking-wide text-paper sm:text-4xl">
							{futureWork.title}
						</h2>
					</div>
					<p data-ev-id="ev_96af43ac9b" className="mt-3 text-base text-[#6b6b6b]">
						{futureWork.subtitle}
					</p>
				</div>

				{/* 2-column × 3-row grid */}
				<div data-ev-id="ev_56c33bd024" className="grid grid-cols-1 gap-5 lg:grid-cols-2">
					{cards.map((card) =>
          <FutureCard key={card.id} card={card} />
          )}
				</div>
			</div>
		</Section>);

}