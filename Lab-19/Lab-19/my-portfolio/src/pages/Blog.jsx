import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.BLOG);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch posts');
      }

      setPosts(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-2xl text-gray-600">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">Blog</h1>
      
      {posts.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">No blog posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">
                {post.content.substring(0, 150)}
                {post.content.length > 150 ? '...' : ''}
              </p>
              {post.author && (
                <p className="text-sm text-gray-500 mb-2">
                  By: {post.author.username || post.author.email}
                </p>
              )}
              <p className="text-sm text-gray-400 mb-4">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <Link
                to={`/blog/${post._id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;

