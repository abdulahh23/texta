import PostCard from '../components/PostCard';

const Profile = ({ posts = [] }) => {
  const userPosts = posts.filter((post) => post.userId === 1 || post.username === 'You');

  return (
    <div className="space-y-8 pt-6 sm:pt-8">
      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-semibold text-white shadow-md">
            Y
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">You</p>
            <p className="text-sm text-slate-500">Writer, thinker, and community member.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1.5">
            <span className="font-semibold text-slate-900">{userPosts.length}</span> posts
          </span>
          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-700">Member since 2026</span>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Your posts</h2>

        {userPosts.length > 0 ? (
          userPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-500">
            You have not published any posts yet.
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
