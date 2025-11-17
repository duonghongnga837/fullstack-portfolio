import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { API_ENDPOINTS, getAuthHeaders } from '../config/api';

function AdminDashboard() {
  const { token, user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('projects');
  
  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repoUrl: '',
    liveUrl: ''
  });
  const [editingProject, setEditingProject] = useState(null);
  
  // Blog posts state
  const [posts, setPosts] = useState([]);
  const [postForm, setPostForm] = useState({
    title: '',
    content: ''
  });
  const [editingPost, setEditingPost] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchPosts();
  }, []);

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PROJECTS);
      const data = await response.json();
      if (response.ok) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  // Fetch Blog Posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.BLOG);
      const data = await response.json();
      if (response.ok) {
        setPosts(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  // Create/Update Project
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const url = editingProject 
        ? API_ENDPOINTS.PROJECT_BY_ID(editingProject._id)
        : API_ENDPOINTS.PROJECTS;
      
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(token),
        body: JSON.stringify(projectForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save project');
      }

      setSuccess(editingProject ? 'Project updated!' : 'Project created!');
      setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(API_ENDPOINTS.PROJECT_BY_ID(id), {
        method: 'DELETE',
        headers: getAuthHeaders(token)
      });

      if (response.ok) {
        setSuccess('Project deleted!');
        fetchProjects();
      }
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  // Create/Update Blog Post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const url = editingPost 
        ? API_ENDPOINTS.BLOG_BY_ID(editingPost._id)
        : API_ENDPOINTS.BLOG;
      
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(token),
        body: JSON.stringify(postForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save post');
      }

      setSuccess(editingPost ? 'Post updated!' : 'Post created!');
      setPostForm({ title: '', content: '' });
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete Blog Post
  const handleDeletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(API_ENDPOINTS.BLOG_BY_ID(id), {
        method: 'DELETE',
        headers: getAuthHeaders(token)
      });

      if (response.ok) {
        setSuccess('Post deleted!');
        fetchPosts();
      }
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome, {user?.email}!</p>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-2 px-4 font-semibold ${
              activeTab === 'projects'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Manage Projects
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`py-2 px-4 font-semibold ${
              activeTab === 'blog'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Manage Blog
          </button>
        </nav>
      </div>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h2>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input
                  type="url"
                  value={projectForm.imageUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Repository URL</label>
                <input
                  type="url"
                  value={projectForm.repoUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, repoUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Live URL</label>
                <input
                  type="url"
                  value={projectForm.liveUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingProject ? 'Update' : 'Create'}
                </button>
                {editingProject && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject(null);
                      setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Projects List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Projects ({projects.length})</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {projects.map((project) => (
                <div key={project._id} className="border rounded p-4">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{project.description.substring(0, 100)}...</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProject(project);
                        setProjectForm({
                          title: project.title,
                          description: project.description,
                          imageUrl: project.imageUrl || '',
                          repoUrl: project.repoUrl || '',
                          liveUrl: project.liveUrl || ''
                        });
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blog Tab */}
      {activeTab === 'blog' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blog Post Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Content</label>
                <textarea
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="10"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingPost ? 'Update' : 'Create'}
                </button>
                {editingPost && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPost(null);
                      setPostForm({ title: '', content: '' });
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Blog Posts List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Blog Posts ({posts.length})</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {posts.map((post) => (
                <div key={post._id} className="border rounded p-4">
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{post.content.substring(0, 100)}...</p>
                  <p className="text-gray-400 text-xs mb-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setPostForm({
                          title: post.title,
                          content: post.content
                        });
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

