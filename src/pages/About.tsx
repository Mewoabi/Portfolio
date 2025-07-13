import { motion } from 'framer-motion';
import { Animate, AnimateList, AnimateListItem } from '../components/ui/Animate';
import { Code, Palette, Terminal, Server, Database, Wrench, Link } from 'lucide-react';
import SEO from '../components/SEO';

const skills = [
	{ 
		category: 'Frontend Frameworks', 
		icon: Code,
		items: ['React', 'Angular', 'Next.js', "React Native"] 
	},
	{ 
		category: 'Styling & UI', 
		icon: Palette,
		items: ['Tailwind CSS', 'Material UI', 'Bootstrap'] 
	},
	{ 
		category: 'Programming Languages', 
		icon: Terminal,
		items: ['TypeScript', 'Python', 'JavaScript', 'C', 'Java', 'Dart'] 
	},
	{ 
		category: 'Backend', 
		icon: Server,
		items: ['Nest.js','Node.js', 'Express', 'Fast API'] 
	},
	{ 
		category: 'Database', 
		icon: Database,
		items: ['MongoDB','MySQL', 'PostgreSQL', 'Firebase'] 
	},
	{ 
		category: 'Tools', 
		icon: Wrench,
		items: ['Git', 'Docker', 'Figma'] 
	},	{ 
		category: 'Blockchain', 
		icon: Link,
		items: ['Ethereum', 'Solidity', 'MetaMask', 'Thirdweb', 'IPFS', 'Blockchain', 'DApp'] 
	},
];

const experiences = [
	{
		title: 'Full Stack Developer Intern - Onsite',
		company: 'Digital Solutions Group',
		period: '2024 - Present',
		description: `Developed scalable real estate valuation software using Nest.js, implementing Clean Architecture 
		principles and Domain-Driven Design. Created RESTful APIs with comprehensive documentation, integrated property 
		market data sources, and established robust testing practices with Jest. Collaborated closely with frontend 
		teams to optimize API interfaces and implement real-time property valuation features.`,
	},
	{
		title: 'Full Stack Developer - Remote',
		company: 'Kejang Noah Group',
		period: '2023 - 2024',
		description: `Worked on backend development using Nest.js for real estate management platform, focusing on 
		microservices architecture and API security. Implemented caching strategies, database optimizations, 
		and automated CI/CD pipelines. Worked closely with UX teams to enhance data visualization features 
		and property comparison tools. Created RESTful APIs with comprehensive documentation using swagger, integrated property 
		market data sources, and established robust testing practices with Jest. Collaborated closely with frontend 
		teams to optimize API interfaces and implement real-time property valuation features.`,
	},
	{
		title: 'Freelance Full Stack Developer - Remote',
		company: 'Self-Employed',
		period: '2020 - 2023',
		description: `Developed diverse web applications for various clients, focusing on practical business solutions. 
		Key projects included: Building inventory management systems for small businesses, implementing point-of-sale 
		applications with payment integration and receipt generation capabilities, creating service advertising and 
		registration platforms, and developing data visualization and analytics dashboards. Utilized technologies like 
		React, Node.js, and MongoDB to deliver scalable solutions. Managed entire project lifecycles from requirement 
		gathering to deployment and maintenance.`,
	},
];

export default function About() {
	return (
		<>
			<SEO
				title="About Me"
				description="Learn more about my journey as a Full Stack Developer, my skills, and professional experience in web development."
				keywords="full stack developer, web development, React, Node.js, MongoDB, professional experience"
			/>

			<div className="max-w-4xl mx-auto px-4">
				<section className="py-8 md:py-16">
					<Animate animation="slideUp">
						<h1 className="text-4xl font-bold mb-6">About Me</h1>
						<div className="prose dark:prose-invert max-w-none">
							<p className="text-lg mb-6">
								I'm a passionate Full Stack Developer with a strong focus on creating intuitive and
								performant web applications which are feature rich and easy to scale. With over 5 years of experience in web development, I
								specialize in building scalable solutions using modern technologies.
							</p>
							<p className="text-lg mb-12">
								My journey in software development started with a curiosity about how things work on
								the web, and that curiosity has driven me to continuously learn and adapt to new
								technologies and best practices.
							</p>
						</div>
					</Animate>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mt-16"
					>
						<h2 className="text-2xl font-bold mb-8">Skills & Technologies</h2>
						<AnimateList className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{skills.map((skillGroup) => {
								const Icon = skillGroup.icon;
								return (
									<AnimateListItem key={skillGroup.category}>
										<motion.div
											className="border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
											whileHover={{ y: -5 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											<div className="flex items-center gap-3 mb-4">
												<div className="p-2 bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-md">
													<Icon size={24} strokeWidth={1.5} />
												</div>
												<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
													{skillGroup.category}
												</h3>
											</div>
											<div className="flex flex-wrap gap-2 mt-4">
												{skillGroup.items.map((skill) => (
													<motion.span
														key={skill}
														className="px-3 py-1 bg-gray-50  dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-full text-sm transition-colors"
														whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--color-primary-500), 0.1)" }}
														whileTap={{ scale: 0.95 }}
													>
														{skill}
													</motion.span>
												))}
											</div>
										</motion.div>
									</AnimateListItem>
								);
							})}
						</AnimateList>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="mt-16"
					>
						<h2 className="text-2xl font-bold mb-8">Professional Experience</h2>
						<div className="space-y-12">
							{experiences.map((experience, index) => (
								<motion.div
									key={experience.title}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.2 }}
									className="border-l-4 border-primary-500 pl-6"
								>
									<h3 className="text-xl font-semibold">{experience.title}</h3>
									<p className="text-gray-600 dark:text-gray-400 mb-2">
										{experience.company} • {experience.period}
									</p>
									<p className="text-gray-700 dark:text-gray-300">
										{experience.description}
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				</section>
			</div>
		</>
	);
}