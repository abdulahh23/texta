import { useLocation, useNavigate } from 'react-router-dom';

const GrammarReview = ({ onPublish }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const draft = location.state ?? {};

  const originalText = draft.body ?? 'Write your post here...';
  const correctedText = draft.correctedText ?? originalText;

  const handleUseCorrection = () => {
    if (!draft.title || !originalText.trim()) {
      navigate('/create');
      return;
    }

    onPublish({
      title: draft.title,
      content: correctedText,
      username: 'You',
      userId: 1,
      summary: 'AI-assisted rewrite prepared and published for the community.',
    });

    navigate('/profile');
  };

  return (
    <div className="space-y-6 pt-6 sm:pt-8">
      <header className="space-y-2">
        <div className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600">
          Review
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Review grammar</h1>
        <p className="text-sm text-slate-500 sm:text-base">
          Review the AI suggestion before publishing.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Original</p>
          <div className="min-h-[220px] whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            {originalText}
          </div>
        </section>

        <section className="rounded-[28px] border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-4 shadow-sm sm:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Corrected</p>
          <div className="min-h-[220px] whitespace-pre-wrap rounded-2xl border border-indigo-100 bg-white p-4 text-sm leading-7 text-slate-700">
            {correctedText}
          </div>
        </section>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleUseCorrection}
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-indigo-100"
        >
          Use correction &amp; publish
        </button>
      </div>
    </div>
  );
};

export default GrammarReview;
