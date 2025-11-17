// src/pages/ProjectDetailPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data'; // Import the centralized data

function ProjectDetailPage() {
  // 1. Get the parameter from the URL
  const { projectId } = useParams(); // e.g., { projectId: '1' }

  // 2. Find the project. Note: useParams gives a string, so we compare loosely (==)
  //    or convert one side: project.id.toString() === projectId
  const project = projects.find(p => p.id.toString() === projectId);

  // 3. Handle case where ID is not found
  if (!project) {
    return (
      <div className="text-center p-20">
        <h1 className="text-3xl font-bold text-red-600">Project Not Found</h1>
        <p className="text-xl text-gray-700 mt-4">
          The project with ID "{projectId}" does not exist.
        </p>
        <Link to="/projects" className="text-blue-600 hover:underline mt-6 inline-block">
          &larr; Back to all projects
        </Link>
      </div>
    );
  }

  // 4. Render the project details
  return (
    <div className="container mx-auto p-8">
      {/* Styled like the Contact Me card */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        
        {/* Header and Tech Stack */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span key={tech} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          {project.description}
        </p>
        
        {/* You could add more details here, like images or longer text */}

        {/* Back Link */}
        <Link 
          to="/projects" 
          className="inline-block text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
        >
          &larr; Back to all projects
        </Link>
      </div>
    </div>
  );
}

export default ProjectDetailPage;