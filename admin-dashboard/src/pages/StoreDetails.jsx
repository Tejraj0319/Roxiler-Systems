// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";

// import { getStoreById } from "../features/stores/storeThunk";
// import { clearSelectedStore } from "../features/stores/storeSlice";

// const StoreDetails = () => {
//   const { id } = useParams();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { selectedStore, loading, error } = useSelector((state) => state.stores);

//   useEffect(() => {
//     dispatch(getStoreById(id));

//     return () => {
//       dispatch(clearSelectedStore());
//     };
//   }, [dispatch, id]);

//   if (loading) return <h2>Loading...</h2>;

//   if (error) return <h2>{error}</h2>;

//   if (!selectedStore) return null;

//   return (
//     <div>
//       <h1>Store Details</h1>

//       <hr />

//       <p>
//         <strong>Name:</strong> {selectedStore.name}
//       </p>

//       <p>
//         <strong>Email:</strong> {selectedStore.email}
//       </p>

//       <p>
//         <strong>Address:</strong> {selectedStore.address}
//       </p>

//       <p>
//         <strong>Average Rating:</strong> {selectedStore.averageRating}
//       </p>

//       <hr />

//       <h2>Store Owner</h2>

//       <p>
//         <strong>Name:</strong> {selectedStore.owner?.name}
//       </p>

//       <p>
//         <strong>Email:</strong> {selectedStore.owner?.email}
//       </p>

//       <hr />

//       <h2>Ratings</h2>

//       {selectedStore.ratings?.length > 0 ? (
//         <table border="1" cellPadding="10">
//           <thead>
//             <tr>
//               <th>Rating ID</th>
//               <th>User ID</th>
//               <th>Rating</th>
//             </tr>
//           </thead>

//           <tbody>
//             {selectedStore.ratings.map((rating) => (
//               <tr key={rating.id}>
//                 <td>{rating.id}</td>
//                 <td>{rating.userId}</td>
//                 <td>{rating.rating}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No ratings found</p>
//       )}

//       <br />

//       <button onClick={() => navigate("/stores")}>Back</button>
//     </div>
//   );
// };

// export default StoreDetails;



import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getStoreById } from "../features/stores/storeThunk";
import { clearSelectedStore } from "../features/stores/storeSlice";

const StoreDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedStore, loading, error } = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStoreById(id));
    return () => { dispatch(clearSelectedStore()); };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm">Loading store...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-6 py-4 text-sm text-rose-400">⚠ {error}</div>
      </div>
    );
  }

  if (!selectedStore) return null;

  const Field = ({ label, value }) => (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-0.5">{label}</p>
      <p className="text-slate-200 text-sm">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10">
      <button onClick={() => navigate("/stores")}
        className="mb-6 flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Stores
      </button>

      <h1 className="text-white text-2xl font-semibold mb-6 tracking-tight">Store Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Store Info */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Store Info</h2>
          <Field label="Name" value={selectedStore.name} />
          <Field label="Email" value={selectedStore.email} />
          <Field label="Address" value={selectedStore.address} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-0.5">Average Rating</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-white">{selectedStore.averageRating ?? 0}</span>
              <span className="text-slate-500 text-sm">/ 5</span>
              <span className="text-xl ml-1">⭐</span>
            </div>
          </div>
        </div>

        {/* Owner Info */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Store Owner</h2>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/20 border border-blue-500/20 text-sm font-semibold text-blue-400">
              {selectedStore.owner?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-slate-200 font-medium text-sm">{selectedStore.owner?.name}</p>
              <p className="text-slate-500 text-xs">{selectedStore.owner?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold text-base">Ratings</h2>
          <p className="text-slate-500 text-xs mt-0.5">{selectedStore.ratings?.length ?? 0} total ratings</p>
        </div>

        {selectedStore.ratings?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/40 border-b border-slate-800">
                  {["Rating ID", "User ID", "Rating"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedStore.ratings.map((rating) => (
                  <tr key={rating.id} className="border-b border-slate-800/50 last:border-b-0 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-slate-400 text-xs">{rating.id}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{rating.userId}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">
                        ⭐ {rating.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-500 text-sm">No ratings found for this store.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetails;
