import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestGrammarFix } from '../services/postService';

const CreatePost = ({ onPublish }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [fixingGrammar, setFixingGrammar] = useState(false);

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;

  const validateDraft = () => {
    if (!title.trim()) {
      setError('Please add a title before publishing.');
      return false;
    }

    if (!body.trim()) {
      setError('Please add some post content before publishing.');
      return false;
    }

    setError('');
    return true;
  };

  const handleFixGrammar = async () => {
    if (!title.trim() || !body.trim()) {
      setError('Please add a title and content before fixing grammar.');
      return;
    }

    setFixingGrammar(true);
    setError('');

    const result = await requestGrammarFix(body);

    setFixingGrammar(false);
    navigate('/grammar-review', {
      state: {
        title: title.trim(),
        body,
        correctedText: result.correctedText,
      },
    });
  };

  const handlePublish = async () => {
    if (!validateDraft()) return;

    await onPublish({
      title: title.trim(),
      content: body.trim(),
      username: 'You',
      userId: 1,
      summary: 'A thoughtful story shared with the community.',
    });

    navigate('/profile');
  };

  return (
    <div className="space-y-6 pt-6 sm:pt-8">
      <header className="space-y-2">
        <div className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600">
          New post
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Create a post</h1>
        <p className="text-sm text-slate-500 sm:text-base">Share something worth reading.</p>
      </header>

      <div className="rounded-[30px] border border-slate-200 bg-white/90 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="space-y-5">
          <div>
            <label htmlFor="post-title" className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id="post-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Post title"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label htmlFor="post-body" className="mb-2 block text-sm font-medium text-slate-700">
              Post
            </label>
            <textarea
              id="post-body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="Write your post here..."
              rows={12}
              className="w-full resize-none rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-7 text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500">{wordCount} words</p>
            {error ? <p className="text-xs font-medium text-red-500">{error}</p> : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleFixGrammar}
              disabled={fixingGrammar || !body.trim() || !title.trim()}
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {fixingGrammar ? 'Fixing grammar...' : 'Fix Grammar'}
            </button>

            <button
              type="button"
              onClick={handlePublish}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:brightness-110"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
