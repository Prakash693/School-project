export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">School Management Mini-Project</h1>
      <div className="flex gap-4">
        <a className="px-4 py-2 rounded bg-blue-600 text-white" href="/addSchool">Add School</a>
        <a className="px-4 py-2 rounded bg-gray-800 text-white" href="/showSchools">Show Schools</a>
      </div>
    </main>
  );
}
