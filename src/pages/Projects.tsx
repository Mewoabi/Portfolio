import { useState, useMemo } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Animate, AnimateList, AnimateListItem } from '../components/ui/Animate';
import { projects } from '../utils/projectList';
import { type Technology } from '../utils/projectList';


const maxDescriptionLength = 200; // Maximum length for project description before truncation
// Extract unique technologies from all projects
const allTechnologies = [...new Set(projects.flatMap((project) => project.technologies))];

// const container = {
// 	hidden: { opacity: 0 },
// 	show: {
// 		opacity: 1,
// 		transition: {
// 			staggerChildren: 0.2,
// 		},
// 	},
// };

// const item = {
// 	hidden: { opacity: 0, y: 20 },
// 	show: { opacity: 1, y: 0 },
// };

export default function Projects() {
	const [selectedTech, setSelectedTech] = useState<Technology[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [showReadMore, setShowReadMore] = useState<string | number>('');

	const filteredProjects = useMemo(() => {
		return projects.filter((project) => {
			const matchesTech =
				selectedTech.length === 0 ||
				selectedTech.every((tech) => project.technologies.includes(tech));
			const matchesSearch =
				project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				project.description.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesTech && matchesSearch;
		});
	}, [selectedTech, searchQuery]);

	const toggleTech = (tech: Technology) => {
		setSelectedTech((prev) =>
			prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
		);
	};

	return (
		<div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
			<Animate animation="slideUp" className="max-w-2xl mx-auto text-center mb-8 md:mb-12">
				<h1 className="text-4xl font-bold mb-4">My Projects</h1>
				<p className="text-gray-600 dark:text-gray-300 mb-8">
					Explore my recent projects and technical work. Each project represents a unique
					challenge and solution in web development.
				</p>
			</Animate>

			{/* Filters */}
			<div className="mb-8 md:mb-12">
				<Animate animation="fadeIn" className="max-w-4xl mx-auto space-y-4 md:space-y-6">
					<input
						type="text"
						placeholder="Search projects..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full px-4 py-2 mb-4 md:mb-6 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
					/>

					<div className="flex flex-wrap gap-2">
						{allTechnologies.sort((a, b) => a.localeCompare(b)).map((tech) => (
							<Button
								key={tech}
								variant={selectedTech.includes(tech) ? 'primary' : 'outline'}
								size="sm"
								onClick={() => toggleTech(tech)}
							>
								{tech}
							</Button>
						))}
					</div>
				</Animate>
			</div>

			{/* Projects Grid */}
			<AnimateList className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
				{filteredProjects.map((project, index) => (
					<AnimateListItem key={index}>
						<div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
							<div className="relative aspect-video">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							</div>
							<div className="p-4 md:p-6">
								<h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
								<p className="text-gray-600 dark:text-gray-300  mb-4">
									{project.description.length > maxDescriptionLength && showReadMore !== project.id ? `${project.description.substring(0, maxDescriptionLength)}...` : project.description}
									{project.description.length > maxDescriptionLength &&
										<button className="text-blue-500 hover:underline hover:cursor-pointer text-sm" onClick={() => setShowReadMore(showReadMore === project.id ? '' : project.id)}>{showReadMore === project.id ? "show less" : "Read More"}</button>}
								</p>
								{project.credentials && (
									<div className="mb-4">
										<button
											onClick={() => setShowReadMore(showReadMore === `credentials-${project.id}` ? '' : `credentials-${project.id}`)}
											className="flex items-center gap-2 text-blue-500 hover:underline text-sm"
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
											</svg>
											{showReadMore === `credentials-${project.id}` ? "Hide Credentials" : "See Live Preview Credentials"}
										</button>
										{showReadMore === `credentials-${project.id}` && (
											<div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded">
												<p><span className="font-semibold">Username:</span> {project.credentials.username}</p>
												<p><span className="font-semibold">Password:</span> {project.credentials.password}</p>
											</div>
										)}
									</div>
								)}
								<div className="flex flex-wrap gap-2 mb-4">
									{project.technologies.map((tech) => (
										<span
											key={tech}
											className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
										>
											{tech}
										</span>
									))}
								</div>
								<div className="flex gap-4">
									{project.githubUrl &&
										<a
											href={project.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2"
										>
											<Button variant="outline" size="sm">
												<Github size={18} />
												Code
											</Button>
										</a>}
									{project.liveUrl &&
										<a
											href={project.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2"
										>
											<Button size="sm">
												<ExternalLink size={18} />
												Live Demo
											</Button>
										</a>}
								</div>
							</div>
						</div>
					</AnimateListItem>
				))}
			</AnimateList>

			{filteredProjects.length === 0 && (
				<Animate animation="fadeIn" className="text-center py-12">
					<p className="text-gray-600 dark:text-gray-300">
						No projects found matching your criteria.
					</p>
				</Animate>
			)}
		</div>
	);
}