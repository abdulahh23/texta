import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Create', to: '/create' },
  { label: 'Profile', to: '/profile' },
];

const Nav = () => {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <NavLink to="/" className="brand-mark flex items-center gap-2 text-lg font-black tracking-[0.18em] text-slate-900 sm:text-xl">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 text-xs text-white shadow-sm">
            T
          </span>
          TEXTA
        </NavLink>

        <ul className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 p-1.5 shadow-sm sm:gap-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
