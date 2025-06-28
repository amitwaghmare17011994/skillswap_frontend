import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import SkillManager from "./SkillManager";
import { getUserInfo } from "@/lib/services";

type User = {
  photoURL: string;
  name: string;
  email: string;
  skillsToTeach?: string[];
  skillsToLearn?: string[];
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [teachSkills, setTeachSkills] = useState<string[]>([]);
  const [learnSkills, setLearnSkills] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserInfo();
        setUser(res);
        setTeachSkills(res.skillsToTeach || []);
        setLearnSkills(res.skillsToLearn || []);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    })();
  }, []);

  const handleSave = () => {
    console.log("Saved user data:", {
      ...user,
      skillsToTeach: teachSkills,
      skillsToLearn: learnSkills,
    });
    // TODO: Call updateUserInfo() API
  };
  if (loading) {
    return (
      <div className="flex min-h-screen flex-1 justify-center">
        <div className="flex">
          {/* Sidebar Skeleton */}
          <aside className="w-64 bg-white shadow px-4 py-6 space-y-4">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <section className="flex-1 bg-white shadow p-6 space-y-6 min-w-xl">
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>

            <Separator />

            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>

            <Separator />

            <div>
              <Skeleton className="h-5 w-36 mb-2" />
              <div className="flex gap-2 mb-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-20" />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>

            <Separator />

            <div>
              <Skeleton className="h-5 w-36 mb-2" />
              <div className="flex gap-2 mb-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-20" />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-end">
              <Skeleton className="h-10 w-24 rounded-md" />
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

        {/* Profile Content */}
        <section className="flex-1 bg-white shadow p-6 flex flex-col min-h-[600px] min-w-xl">
          <div className="space-y-6 flex-grow">
            {/* Header */}
            <div>
              <h2 className="text-xl font-semibold">Public profile</h2>
              <p className="text-sm text-muted-foreground">
                Add information about yourself
              </p>
            </div>

            <Separator />

            {/* Basics */}
            <div>
              <h3 className="text-md font-medium mb-2">Basics:</h3>
              <Input placeholder="Name" value={user?.name} readOnly />
            </div>

            <Separator />

            {/* Skills to Teach */}
            <SkillManager
              title="Skills to Teach"
              skills={teachSkills}
              setSkills={setTeachSkills}
            />

            <Separator />

            {/* Skills to Learn */}
            <SkillManager
              title="Skills to Learn"
              skills={learnSkills}
              setSkills={setLearnSkills}
            />
          </div>

          {/* Save Button */}
          <Separator className="my-4" />
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
