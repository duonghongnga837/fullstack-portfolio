// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function to get auth headers
export const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/users/login`,
  REGISTER: `${API_BASE_URL}/users/register`,
  
  // Projects
  PROJECTS: `${API_BASE_URL}/projects`,
  PROJECT_BY_ID: (id) => `${API_BASE_URL}/projects/${id}`,
  
  // Blog
  BLOG: `${API_BASE_URL}/blog`,
  BLOG_BY_ID: (id) => `${API_BASE_URL}/blog/${id}`,
  
  // Comments
  COMMENTS_BY_POST: (postId) => `${API_BASE_URL}/blog/${postId}/comments`,
  
  // Contact
  CONTACT: `${API_BASE_URL}/contact`
};

