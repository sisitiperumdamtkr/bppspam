
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  bio?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  // Fungsi untuk mengambil profil pengguna dari database
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  // Fungsi untuk memperbarui state user dengan data dari session dan profil
  const updateUserState = async (currentSession: Session | null) => {
    if (!currentSession?.user) {
      setUser(null);
      return;
    }

    const profile = await fetchProfile(currentSession.user.id);
    
    const authUser: AuthUser = {
      id: currentSession.user.id,
      name: profile?.name || currentSession.user.user_metadata?.name || currentSession.user.email?.split("@")[0] || "",
      email: profile?.email || currentSession.user.email || "",
      role: profile?.role || currentSession.user.user_metadata?.role || "user",
      bio: profile?.bio || "",
    };
    
    setUser(authUser);
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state change:", event);
        setSession(currentSession);
        await updateUserState(currentSession);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      await updateUserState(currentSession);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: "user"
          }
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Supabase secara otomatis mengirimkan email konfirmasi
      toast({
        title: "Registrasi berhasil",
        description: "Silakan periksa email Anda untuk verifikasi.",
      });
      
    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<AuthUser>) => {
    if (!user || !user.id) {
      throw new Error("Tidak ada pengguna yang login");
    }

    try {
      // Update profil di supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profileData.name,
          email: profileData.email,
          bio: profileData.bio,
          role: profileData.role,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        throw new Error(error.message);
      }

      // Update user state
      setUser(prev => prev ? { ...prev, ...profileData } : null);
      
      return;
    } catch (error: any) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
