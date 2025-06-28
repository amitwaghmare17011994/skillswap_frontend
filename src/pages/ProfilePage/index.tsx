import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { getUserInfo } from "@/lib/services";

type User = {
  photoURL: string;
  name: string;
  email: string;
  skillsToTeach?: string[];
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserInfo();
        setUser(res);
        setSkills(res.skillsToTeach || []);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || skills.includes(trimmed)) return;

    const updatedSkills = [...skills, trimmed];
    setSkills(updatedSkills);
    setSkillInput("");

    if (user) {
      setUser({ ...user, skillsToTeach: updatedSkills });
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);

    if (user) {
      setUser({ ...user, skillsToTeach: updatedSkills });
    }
  };
  if (loading) {
    return (
      <div className="flex min-h-screen flex-1 justify-center">
        <div className="flex">
          {/* Sidebar Skeleton */}
          <aside className="w-64 bg-white shadow px-4 py-6 space-y-4">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <section className="flex-1 bg-white shadow p-6 space-y-6 min-w-xl">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-5 w-36" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-20" />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-1 justify-center">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-white shadow px-4 py-6 space-y-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 flex items-center justify-center">
              <img
                src={user?.photoURL}
                alt="User"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </aside>

        {/* Profile Form */}
        <section className="flex-1 bg-white shadow p-6 space-y-6 min-w-xl">
          <div>
            <h2 className="text-xl font-semibold">Public profile</h2>
            <p className="text-sm text-muted-foreground">
              Add information about yourself
            </p>
          </div>

          {/* Basics */}
          <div>
            <h3 className="text-md font-medium mb-2">Basics:</h3>
            <div className="grid grid-cols-1 gap-4 mb-3">
              <Input placeholder="Name" value={user?.name} />
            </div>
          </div>

          {/* Skills to Teach */}
          <div>
            <h3 className="text-md font-medium mb-2">Skills to Teach</h3>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add a skill..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <Button onClick={handleAddSkill}>Add</Button>
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
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No skills added yet.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
