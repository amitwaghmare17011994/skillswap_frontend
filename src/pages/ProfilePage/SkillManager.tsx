import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";

// Skill type: { _id: string, name: string }
type Skill = { _id: string; name: string };

type SkillManagerProps = {
  title: string;
  skills: string[]; // selected skill IDs
  setSkills: (skills: string[]) => void;
  allSkills: Skill[];
  onAddSkill: (name: string) => Promise<void>;
};

export default function SkillManager({
  title,
  skills,
  setSkills,
  allSkills,
  onAddSkill,
}: SkillManagerProps) {
  const [input, setInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = (id: string) => {
    setSkills(skills.includes(id) ? skills.filter((s) => s !== id) : [...skills, id]);
  };

  const handleAdd = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setAdding(true);
    setError("");
    try {
      await onAddSkill(trimmed);
      setInput("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <h3 className="text-md font-medium mb-2">{title}</h3>
      <div className="relative mb-2">
        <Button
          type="button"
          variant="outline"
          className="w-full flex justify-between items-center"
          onClick={() => setDropdownOpen((v) => !v)}
        >
          {skills.length > 0
            ? allSkills.filter((s) => skills.includes(s._id)).map((s) => s.name).join(", ")
            : `Select skills...`}
          <ChevronDown className="ml-2 w-4 h-4" />
        </Button>
        {dropdownOpen && (
          <div className="absolute z-10 bg-white border rounded shadow w-full mt-1 max-h-48 overflow-y-auto">
            {allSkills.length === 0 && <div className="p-2 text-sm text-gray-400">No skills found.</div>}
            {allSkills.map((skill) => (
              <label key={skill._id} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100">
                <Checkbox
                  checked={skills.includes(skill._id)}
                  onCheckedChange={() => handleToggle(skill._id)}
                  id={skill._id}
                />
                <span>{skill.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Can't find your skill? Add it..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={adding}
        />
        <Button type="button" onClick={handleAdd} disabled={adding || !input.trim()}>
          {adding ? "Adding..." : "Add"}
        </Button>
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <div className="flex flex-wrap gap-2">
        {skills.length > 0 ? (
          allSkills.filter((s) => skills.includes(s._id)).map((skill) => (
            <Badge
              key={skill._id}
              variant="secondary"
              className="flex items-center gap-1 pr-2"
            >
              {skill.name}
              <button
                className="ml-1 text-muted-foreground hover:text-red-500"
                onClick={() => handleToggle(skill._id)}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No skills selected yet.</p>
        )}
      </div>
    </div>
  );
}
