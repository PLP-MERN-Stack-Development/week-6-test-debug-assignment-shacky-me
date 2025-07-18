import { Bug } from "../types";
import BugItem from "./BugItem";

type Props = {
  bugs: Bug[];
  onUpdate: (id: string, status: string) => void;
  onDelete: (id: string) => void;
};

export default function BugList({ bugs, onUpdate, onDelete }: Props) {
  if (!bugs.length) return <p className="text-gray-600">No bugs reported.</p>;

  return (
    <div className="space-y-3">
      {bugs.map((bug) => (
        <BugItem
          key={bug._id}
          bug={bug}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
