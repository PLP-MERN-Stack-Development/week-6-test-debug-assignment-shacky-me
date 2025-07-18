import { Bug } from "../types";

type Props = {
  bug: Bug;
  onUpdate: (id: string, status: string) => void;
  onDelete: (id: string) => void;
};

export default function BugItem({ bug, onUpdate, onDelete }: Props) {
  return (
    <div className="border p-3 rounded shadow-sm flex justify-between items-start">
      <div>
        <h2 className="font-bold">{bug.title}</h2>
        <p className="text-sm">{bug.description}</p>
        <p className="text-xs text-gray-500">Status: {bug.status}</p>
      </div>
      <div className="space-x-1">
        {bug.status !== "resolved" && (
          <button
            onClick={() =>
              onUpdate(
                bug._id!,
                bug.status === "open" ? "in-progress" : "resolved"
              )
            }
            className="text-xs bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Advance Status
          </button>
        )}
        <button
          onClick={() => onDelete(bug._id!)}
          className="text-xs bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
