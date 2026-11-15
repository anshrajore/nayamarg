export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          phone: string | null;
          full_name: string | null;
          role: "worker" | "employer" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          phone?: string | null;
          full_name?: string | null;
          role?: "worker" | "employer" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          phone?: string | null;
          full_name?: string | null;
          role?: "worker" | "employer" | "admin";
          created_at?: string;
          updated_at?: string;
        };
      };
      hiring_requests: {
        Row: {
          id: string;
          organization_id: string;
          title: string;
          category: string;
          vacancies: number;
          status: string;
          location: Json;
          salary: Json;
          experience: Json;
          languages: string[];
          requirements: string[];
          shift: string;
          job_type: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          title: string;
          category: string;
          vacancies: number;
          status?: string;
          location: Json;
          salary: Json;
          experience: Json;
          languages?: string[];
          requirements?: string[];
          shift?: string;
          job_type?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          title?: string;
          category?: string;
          vacancies?: number;
          status?: string;
          location?: Json;
          salary?: Json;
          experience?: Json;
          languages?: string[];
          requirements?: string[];
          shift?: string;
          job_type?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
