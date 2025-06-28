import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

type SkillManagerProps = {
  title: string;
  skills: string[];
  setSkills: (skills: string[]) => void;
};

export default function SkillManager({
  title,
  skills,
  setSkills,
}: SkillManagerProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills([...skills, trimmed]);
    setInput("");
  };

  const handleRemove = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div>
      <h3 className="text-md font-medium mb-2">{title}</h3>
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Add a skill..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 pr-2"
            >
              {skill}
              <button
                className="ml-1 text-muted-foreground hover:text-red-500"
                onClick={() => handleRemove(skill)}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}
