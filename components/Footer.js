import React from 'react';

const Footer = () => {
	return (
		<footer className="bg-gray-900 border-t border-gray-700 mt-auto py-6">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center text-sm text-gray-400">
					<p>
						&copy; {new Date().getFullYear()} StillLearning. All
						rights reserved.
					</p>
					<p className="mt-1">
						Made with <span className="text-red-400">&#10084;</span>{' '}
						for lifelong learners.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
