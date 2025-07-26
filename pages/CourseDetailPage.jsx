import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';

const CourseContent = ({ course }) => {
	switch (course.contentType) {
		case 'ARTICLE':
			return (
				<div
					className="prose prose-invert max-w-none"
					dangerouslySetInnerHTML={{
						__html: course.content.replace(/\n/g, '<br/>'),
					}}
				/>
			);
		case 'VIDEO':
			return (
				<video
					className="w-full rounded-lg"
					src={course.filePath}
					controls
				/>
			);
		case 'AUDIO':
			return <audio className="w-full" src={course.filePath} controls />;
		case 'IMAGE':
			return (
				<img
					className="w-full rounded-lg"
					src={course.filePath}
					alt={course.title}
				/>
			);
		case 'PDF':
			return (
				<div className="p-6 bg-gray-800 rounded-lg text-center">
					<p className="mb-4">
						Konten ini tersedia sebagai dokumen PDF.
					</p>
					<a
						href={course.filePath}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block bg-white text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
					>
						Unduh PDF
					</a>
				</div>
			);
		case 'WORD':
			return (
				<div className="p-6 bg-gray-800 rounded-lg text-center">
					<p className="mb-4">
						Konten ini tersedia sebagai dokumen Word.
					</p>
					<a
						href={course.filePath}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block bg-white text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
					>
						Unduh Word
					</a>
				</div>
			);
		case 'PPT':
			return (
				<div className="p-6 bg-gray-800 rounded-lg text-center">
					<p className="mb-4">
						Konten ini tersedia sebagai presentasi PowerPoint.
					</p>
					<a
						href={course.filePath}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block bg-white text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
					>
						Unduh PowerPoint
					</a>
				</div>
			);
		default:
			return <p>Tipe konten tidak didukung.</p>;
	}
};

const CourseDetailPage = () => {
	const { courseId } = useParams();
	const { isAuthenticated } = useAuth();
	const [course, setCourse] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const response = await fetch(
					`http://localhost:4000/api/courses/${courseId}`
				);
				if (response.ok) {
					const courseData = await response.json();
					setCourse(courseData);
				} else {
					setCourse(null);
				}
			} catch (error) {
				console.error('Error fetching course:', error);
				setCourse(null);
			} finally {
				setLoading(false);
			}
		};

		fetchCourse();
	}, [courseId]);

	const handleLoginRedirect = () => {
		// Simpan URL saat ini ke state navigasi
		navigate('/login', {
			state: { from: { pathname: `/course/${courseId}` } },
		});
	};

	if (loading) {
		return <div className="text-center text-gray-400">Memuat...</div>;
	}

	if (!course) {
		return (
			<div className="text-center text-gray-400">
				Kursus tidak ditemukan.
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-0">
			<header className="mb-8">
				<h1 className="text-4xl font-black text-white sm:text-5xl mb-2">
					{course.title}
				</h1>
				<p className="text-lg text-gray-400 font-medium">
					oleh {course.author.name}
				</p>
			</header>

			<div className="bg-gray-800/60 p-8 sm:p-10 rounded-lg border border-gray-700 shadow-lg">
				{/* Konten selalu bisa dilihat oleh semua user (guest dan login) */}
				<CourseContent course={course} />
			</div>

			{/* Comment Section - guest bisa lihat komentar tapi tidak bisa komentar */}
			<div className="mt-10">
				<CommentSection
					courseId={course.id}
					comments={course.comments}
				/>
			</div>
		</div>
	);
};

export default CourseDetailPage;
