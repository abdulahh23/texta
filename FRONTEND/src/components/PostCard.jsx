const PostCard = ({ post }) => {
  const title = post?.title ?? 'Untitled post';
  const content = post?.content ?? 'No content available.';
  const username = post?.username ?? 'Abdullah';
  const summary =
    post?.summary ?? 'A short AI summary of this post for readers who want the key idea quickly.';

  return (
    <article className="soft-card group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(79,70,229,0.10)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-semibold text-white">
            {username.charAt(0).toUpperCase()}
          </div>
          <p className="text-sm font-semibold text-slate-600">{username}</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          TEXTA
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-[2rem]">{title}</h2>
      <p className="mt-3 text-base leading-7 text-slate-700">{content}</p>

      <div className="mt-6 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-3 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
          AI SUMMARY
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{summary}</p>
      </div>
    </article>
  );
};

export default PostCard;
