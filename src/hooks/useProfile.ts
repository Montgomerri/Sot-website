"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function useProfile() {
  const supabase = createClient();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        
        

        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        
        

        if (data) {
          setProfile(data);
        }

      } catch (error) {
        console.error("PROFILE FETCH ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, []);

  return {
    profile,
    loading,
  };
}