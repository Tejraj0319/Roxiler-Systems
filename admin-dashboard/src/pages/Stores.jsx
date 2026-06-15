// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// import { getStores } from "../features/stores/storeThunk";

// const Stores = () => {
//   const dispatch = useDispatch();

//   const { stores, loading, error } = useSelector(
//     (state) => state.stores
//   );

//   const [filters, setFilters] = useState({
//     name: "",
//     email: "",
//     address: "",
//     sortBy: "name",
//     order: "asc",
//   });

//   useEffect(() => {
//     dispatch(getStores(filters));
//   }, [dispatch, filters]);

//   const handleChange = (e) => {
//     setFilters((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <div>
//       <h1>Stores</h1>

//       <Link to="/stores/create">
//         Create Store
//       </Link>

//       <hr />

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
//         name="sortBy"
//         value={filters.sortBy}
//         onChange={handleChange}
//       >
//         <option value="name">Name</option>
//         <option value="email">Email</option>
//         <option value="address">Address</option>
//       </select>

//       <select
//         name="order"
//         value={filters.order}
//         onChange={handleChange}
//       >
//         <option value="asc">Ascending</option>
//         <option value="desc">Descending</option>
//       </select>

//       {loading && <p>Loading...</p>}

//       {error && <p>{error}</p>}

//       {!loading && !error && (
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Address</th>
//               <th>Rating</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {stores?.map((store) => (
//               <tr key={store.id}>
//                 <td>{store.name}</td>
//                 <td>{store.email}</td>
//                 <td>{store.address}</td>
//                 <td>{store.rating}</td>

//                 <td>
//                   <Link to={`/stores/${store.id}`}>
//                     View Details
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Stores;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getStores } from "../features/stores/storeThunk";

const Stores = () => {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.stores);

  const [filters, setFilters] = useState({ name: "", email: "", address: "", sortBy: "name", order: "asc" });

  useEffect(() => { dispatch(getStores(filters)); }, [dispatch, filters]);

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
          <h1 className="text-white text-2xl font-semibold tracking-tight">Stores</h1>
          <p className="text-slate-500 text-sm mt-0.5">{stores?.length ?? 0} stores found</p>
        </div>
        <Link to="/stores/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-95">
          + Create Store
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Filters</p>
        <div className="flex flex-wrap gap-3">
          <input type="text" name="name" placeholder="Search name" value={filters.name} onChange={handleChange} className={inputClass} />
          <input type="text" name="email" placeholder="Search email" value={filters.email} onChange={handleChange} className={inputClass} />
          <input type="text" name="address" placeholder="Search address" value={filters.address} onChange={handleChange} className={inputClass} />
          <select name="sortBy" value={filters.sortBy} onChange={handleChange} className={selectClass}>
            <option value="name">Sort: Name</option>
            <option value="email">Sort: Email</option>
            <option value="address">Sort: Address</option>
          </select>
          <select name="order" value={filters.order} onChange={handleChange} className={selectClass}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading stores...
        </div>
      )}
      {error && <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400 mb-4">⚠ {error}</div>}

      {/* Table */}
      {!loading && !error && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/40 border-b border-slate-800">
                  {["Name", "Email", "Address", "Rating", "Action"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stores?.length > 0 ? stores.map((store) => (
                  <tr key={store.id} className="border-b border-slate-800/50 last:border-b-0 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-slate-200 font-medium">{store.name}</td>
                    <td className="px-6 py-4 text-slate-400">{store.email}</td>
                    <td className="px-6 py-4 text-slate-400">{store.address}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">
                        {store.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/stores/${store.id}`}
                        className="text-blue-400 text-xs font-medium hover:text-blue-300 transition">
                        View Details →
                      </Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500 text-sm">No stores found</td>
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

export default Stores;