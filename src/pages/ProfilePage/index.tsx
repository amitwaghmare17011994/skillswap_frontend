import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import Container from "@/components/layout/Container";
import { Input } from "@/components/ui/input";

type User = {
  name: string;
  email: string;
  photoURL: string;
  skills?: string[];
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser) {
      setUser(storedUser);
      setSkills(storedUser.skills || []);
    }
  }, []);

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    const updatedSkills = [...skills, skillInput.trim()];
    setSkills(updatedSkills);
    setSkillInput("");

    const updatedUser = { ...user, skills: updatedSkills } as User;
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <Container>
      <div className="flex items-center gap-4">
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <CardTitle>{user?.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-2">Your Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((skill, idx) => (
              <Badge key={idx} variant="secondary">
                {skill}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No skills added yet.
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add a new skill..."
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <Button onClick={handleAddSkill}>Add</Button>
      </div>
    </Container>
  );
}
