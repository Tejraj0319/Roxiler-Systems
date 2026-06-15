// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// import { getUsers } from "../features/users/userThunk";

// const Users = () => {
//   const dispatch = useDispatch();

//   const { users, loading, error } = useSelector(
//     (state) => state.users
//   );

//   const [filters, setFilters] = useState({
//     name: "",
//     email: "",
//     address: "",
//     role: "",
//     sortBy: "name",
//     order: "asc",
//   });

//   useEffect(() => {
//     dispatch(getUsers(filters));
//   }, [dispatch, filters]);

//   const handleChange = (e) => {
//     setFilters((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <div>
//       <h1>Users</h1>

//       <Link to="/users/create">
//         Create User
//       </Link>

//       <hr />

//       <h3>Filters</h3>

//       <input
//         type="text"
//         name="name"
//         placeholder="Search Name"
//         value={filters.name}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="email"
//         placeholder="Search Email"
//         value={filters.email}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="address"
//         placeholder="Search Address"
//         value={filters.address}
//         onChange={handleChange}
//       />

//       <select
//         name="role"
//         value={filters.role}
//         onChange={handleChange}
//       >
//         <option value="">All Roles</option>
//         <option value="ADMIN">ADMIN</option>
//         <option value="USER">USER</option>
//         <option value="STORE_OWNER">STORE_OWNER</option>
//       </select>

//       <select
//         name="sortBy"
//         value={filters.sortBy}
//         onChange={handleChange}
//       >
//         <option value="name">Name</option>
//         <option value="email">Email</option>
//         <option value="address">Address</option>
//         <option value="role">Role</option>
//       </select>

//       <select
//         name="order"
//         value={filters.order}
//         onChange={handleChange}
//       >
//         <option value="asc">Ascending</option>
//         <option value="desc">Descending</option>
//       </select>

//       <hr />

//       {loading && <p>Loading users...</p>}

//       {error && <p>{error}</p>}

//       {!loading && !error && (
//         <table border="1" cellPadding="10">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Address</th>
//               <th>Role</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users?.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.address}</td>
//                   <td>{user.role}</td>

//                   <td>
//                     <Link to={`/users/${user.id}`}>
//                       View Details
//                     </Link>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Users;




import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getUsers } from "../features/users/userThunk";

const ROLE_STYLES = {
  ADMIN: "border-rose-500/20 bg-rose-500/10 text-rose-400",
  STORE_OWNER: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  USER: "border-slate-600/40 bg-slate-700/30 text-slate-400",
};

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "", sortBy: "name", order: "asc" });

  useEffect(() => { dispatch(getUsers(filters)); }, [dispatch, filters]);

  const handleChange = (e) => setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const inputClass =
    "rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  const selectClass =
    "rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-slate-500 text-sm mt-0.5">{users?.length ?? 0} users found</p>
        </div>
        <Link to="/users/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-95">
          + Create User
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Filters</p>
        <div className="flex flex-wrap gap-3">
          <input type="text" name="name" placeholder="Search name" value={filters.name} onChange={handleChange} className={inputClass} />
          <input type="text" name="email" placeholder="Search email" value={filters.email} onChange={handleChange} className={inputClass} />
          <input type="text" name="address" placeholder="Search address" value={filters.address} onChange={handleChange} className={inputClass} />
          <select name="role" value={filters.role} onChange={handleChange} className={selectClass}>
            <option value="">All Roles</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
            <option value="STORE_OWNER">STORE_OWNER</option>
          </select>
          <select name="sortBy" value={filters.sortBy} onChange={handleChange} className={selectClass}>
            <option value="name">Sort: Name</option>
            <option value="email">Sort: Email</option>
            <option value="address">Sort: Address</option>
            <option value="role">Sort: Role</option>
          </select>
          <select name="order" value={filters.order} onChange={handleChange} className={selectClass}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading users...
        </div>
      )}
      {error && <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400 mb-4">⚠ {error}</div>}

      {!loading && !error && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/40 border-b border-slate-800">
                  {["Name", "Email", "Address", "Role", "Action"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users?.length > 0 ? users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-800/50 last:border-b-0 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/20 border border-blue-500/20 text-xs font-semibold text-blue-400">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-slate-200 font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{user.email}</td>
                    <td className="px-6 py-4 text-slate-400">{user.address}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${ROLE_STYLES[user.role] ?? ROLE_STYLES.USER}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/users/${user.id}`} className="text-blue-400 text-xs font-medium hover:text-blue-300 transition">
                        View Details →
                      </Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500 text-sm">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;