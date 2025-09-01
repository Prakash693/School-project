import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/getSchools");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setSchools(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-700">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Schools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {schools.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl shadow overflow-hidden">
            <img src={`/schoolImages/${s.image}`} alt={s.name} className="h-44 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{s.name}</h3>
              <p className="text-sm text-gray-700">{s.address}</p>
              <p className="text-sm text-gray-700">{s.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
