// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import { logout } from "../features/auth/authSlice";

// const AdminLayout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>

//       <hr />

//       <nav>
//         <Link to="/dashboard">Dashboard</Link>

//         {" | "}

//         <Link to="/users">Users</Link>

//         {" | "}

//         <Link to="/stores">Stores</Link>

//         {" | "}

//         <button onClick={handleLogout}>Logout</button>
//       </nav>

//       <hr />

//       <Outlet />
//     </div>
//   );
// };

// export default AdminLayout;
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../features/auth/authSlice";

const NAV_LINKS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    to: "/users",
    label: "Users",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    to: "/stores",
    label: "Stores",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Navbar */}
      <header className="w-full border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-base select-none">
              S
            </span>
            <span className="text-white text-xl font-semibold tracking-tight">
              Store <span className="text-blue-400">Admin</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon }) => {
              const isActive = location.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
                    ${isActive
                      ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent"
                    }`}
                >
                  {icon}
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-400 transition hover:bg-rose-500/20 hover:text-rose-300 active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>

        {/* Mobile nav */}
        <div className="sm:hidden flex gap-1 px-4 pb-3">
          {NAV_LINKS.map(({ to, label }) => {
            const isActive = location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex-1 text-center rounded-lg px-3 py-1.5 text-xs font-medium transition
                  ${isActive
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent"
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;