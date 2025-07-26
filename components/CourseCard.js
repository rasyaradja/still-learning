import React from 'react';
import { Link } from 'react-router-dom';
import {
	IconArticle,
	IconImage,
	IconPDF,
	IconAudio,
	IconVideo,
	IconWord,
	IconPPT,
} from './Icons';

const ContentTypeIcon = ({ type }) => {
	const iconClasses = 'w-5 h-5 text-gray-400';
	switch (type) {
		case 'ARTICLE':
			return <IconArticle className={iconClasses} />;
		case 'IMAGE':
			return <IconImage className={iconClasses} />;
		case 'PDF':
			return <IconPDF className={iconClasses} />;
		case 'AUDIO':
			return <IconAudio className={iconClasses} />;
		case 'VIDEO':
			return <IconVideo className={iconClasses} />;
		case 'WORD':
			return <IconWord className={iconClasses} />;
		case 'PPT':
			return <IconPPT className={iconClasses} />;
		default:
			return null;
	}
};

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x200?text=No+Preview';

const CourseCard = ({ course }) => {
	const renderPreview = () => {
		if (course.contentType === 'VIDEO' && course.filePath) {
			return (
				<video
					className="h-48 w-full object-cover bg-black"
					src={course.filePath}
					controls
					muted
				/>
			);
		}
		if (course.contentType === 'AUDIO' && course.filePath) {
			return (
				<div className="h-48 w-full flex items-center justify-center bg-gray-800">
					<audio src={course.filePath} controls />
				</div>
			);
		}
		if (course.contentType === 'IMAGE' && course.filePath) {
			return (
				<img
					className="h-48 w-full object-cover"
					src={course.filePath}
					alt={course.title}
					onError={(e) => (e.target.src = PLACEHOLDER_IMAGE)}
				/>
			);
		}
		// Fallback for missing or unsupported media
		return (
			<div className="h-48 w-full flex items-center justify-center bg-gray-800">
				<img
					src={PLACEHOLDER_IMAGE}
					alt="No preview"
					className="h-24 w-40 object-contain opacity-40"
				/>
				<div className="absolute inset-0 flex items-center justify-center">
					<ContentTypeIcon type={course.contentType} />
				</div>
			</div>
		);
	};

	return (
		<Link
			to={`/course/${course.id}`}
			className="block group focus:outline-none focus:ring-2 focus:ring-blue-400"
		>
			<div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-400 transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-800/40 min-h-[370px]">
				<div className="relative">
					{renderPreview()}
					<div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity"></div>
				</div>
				<div className="p-5 flex flex-col flex-grow">
					<div className="flex justify-between items-start mb-2">
						<h3
							className="text-xl font-bold text-white group-hover:text-blue-200 truncate"
							title={course.title}
						>
							{course.title}
						</h3>
						<div
							className="flex-shrink-0 ml-2"
							title={`Tipe Konten: ${course.contentType}`}
						>
							<ContentTypeIcon type={course.contentType} />
						</div>
					</div>
					<p className="text-sm text-gray-300 flex-grow line-clamp-2">
						{course.description}
					</p>
					<div className="mt-4 text-xs text-gray-400">
						<span>Oleh {course.author.name}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CourseCard;
