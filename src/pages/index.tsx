import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { ScrollIndexProvider } from '@/context/scroll-index';
import About from '@/sections/About';
import AIAgent from '@/sections/AIAgent';
import Certifications from '@/sections/Certifications';
import Contact from '@/sections/Contact';
import Education from '@/sections/Education';
import Experience from '@/sections/Experience';
import FutureWork from '@/sections/FutureWork';
import Hero from '@/sections/Hero';
import Method from '@/sections/Method';
import Metrics from '@/sections/Metrics';
import Projects from '@/sections/Projects';
import Research from '@/sections/Research';
import Skills from '@/sections/Skills';

export default function Index() {
  return (
    <ScrollIndexProvider>
			<Cursor />
			<Nav />
			<main data-ev-id="ev_c30f90dc0d" className="relative w-full bg-ink">
				<Hero />
				<Metrics />
				<About />
				<Experience />
				<Education />
				<Projects />
				<Skills />
				<Method />
				<Research />
				<Certifications />
				<AIAgent />
				<FutureWork />
				<Contact />
			</main>
			<Footer />
		</ScrollIndexProvider>);

}