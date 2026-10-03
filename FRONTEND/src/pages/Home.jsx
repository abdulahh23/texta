import PostCard from '../components/PostCard';

const Home = ({ posts = [] }) => {
  return (
    <div className="space-y-6 pt-6 sm:pt-8">
      <header className="space-y-3 rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-7">
        <div className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600">
          Community
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your feed</h1>
        <p className="text-sm text-slate-500 sm:text-base">
          Thoughts, ideas, and stories from the community.
        </p>
      </header>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="soft-card rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-500">
            No posts yet. Create your first post.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
