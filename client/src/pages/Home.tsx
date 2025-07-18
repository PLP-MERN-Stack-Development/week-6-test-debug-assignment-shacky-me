import { useEffect, useState } from "react";
import BugForm from "../components/BugForm";
import BugList from "../components/BugList";
import axios from "axios";
import { Bug } from "../types";

export default function Home() {
  const [bugs, setBugs] = useState<Bug[]>([]);

  const fetchBugs = async () => {
    const res = await axios.get("http://localhost:5000/api/bugs");
    setBugs(res.data);
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const createBug = async (bug: Bug) => {
    const res = await axios.post("http://localhost:5000/api/bugs", bug);
    setBugs((prev) => [...prev, res.data]);
  };

  const updateBug = async (id: string, status: string) => {
    const res = await axios.put(`http://localhost:5000/api/bugs/${id}`, {
      status,
    });
    setBugs((prev) => prev.map((b) => (b._id === id ? res.data : b)));
  };

  const deleteBug = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/bugs/${id}`);
    setBugs((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Bug Tracker</h1>
      <BugForm onSubmit={createBug} />
      <BugList bugs={bugs} onUpdate={updateBug} onDelete={deleteBug} />
    </main>
  );
}
