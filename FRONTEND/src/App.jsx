import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import GrammarReview from './pages/GrammarReview';
import Profile from './pages/Profile';
import { createPost, fallbackPosts, fetchPosts } from './services/postService';

const STORAGE_KEY = 'texta-posts';

const getInitialPosts = () => {
  if (typeof window === 'undefined') {
    return fallbackPosts;
  }

  try {
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    if (savedPosts) {
      const parsed = JSON.parse(savedPosts);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Unable to load posts from storage', error);
  }

  return fallbackPosts;
};

function App() {
  const [posts, setPosts] = useState(getInitialPosts);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }
  }, [posts]);

  useEffect(() => {
    let isCurrent = true;

    fetchPosts().then((nextPosts) => {
      if (isCurrent && nextPosts?.length) {
        setPosts(nextPosts);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  const handlePublish = async (draft) => {
    const nextPost = await createPost(draft);
    setPosts((previousPosts) => [nextPost, ...previousPosts]);
  };

  return (
    <div className="app-shell min-h-screen">
      <Nav />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/create" element={<CreatePost onPublish={handlePublish} />} />
          <Route path="/grammar-review" element={<GrammarReview onPublish={handlePublish} />} />
          <Route path="/profile" element={<Profile posts={posts} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
