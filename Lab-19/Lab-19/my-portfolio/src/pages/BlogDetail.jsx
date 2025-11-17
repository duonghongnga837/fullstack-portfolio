import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_ENDPOINTS, getAuthHeaders } from '../config/api';

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentError, setCommentError] = useState('');
  
  const { token, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.BLOG_BY_ID(id));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch post');
      }

      setPost(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.COMMENTS_BY_POST(id));
      const data = await response.json();

      if (response.ok) {
        setComments(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError('');

    if (!isAuthenticated) {
      setCommentError('You must be logged in to comment');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.COMMENTS_BY_POST(id), {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ body: commentBody })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to post comment');
      }

      setComments([data.data, ...comments]);
      setCommentBody('');
    } catch (err) {
      setCommentError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-2xl text-gray-600">Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error || 'Post not found'}
        </div>
        <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <Link to="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Blog
      </Link>
      
      <article className="bg-white rounded-lg shadow-xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        
        {post.author && (
          <p className="text-gray-600 mb-2">
            By: {post.author.username || post.author.email}
          </p>
        )}
        
        <p className="text-gray-400 mb-6">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        
        <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        {isAuthenticated ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            {commentError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {commentError}
              </div>
            )}
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border border-gray-300 rounded p-3 mb-4 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="mb-8 text-gray-600">
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>{' '}
            to post a comment
          </p>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-gray-700">{comment.body}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {comment.author?.username || comment.author?.email || 'Anonymous'} •{' '}
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;

