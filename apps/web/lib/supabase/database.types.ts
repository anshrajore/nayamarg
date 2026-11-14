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
          full_name: string;
          phone: string;
          email: string | null;
          preferred_language: string;
          status: "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          phone: string;
          email?: string | null;
          preferred_language?: string;
          status?: "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string;
          email?: string | null;
          preferred_language?: string;
          status?: "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";
          created_at?: string;
          updated_at?: string;
        };
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          type: "EMPLOYER" | "AGENCY" | "INTERNAL";
          verification_status: "PENDING" | "VERIFIED" | "REJECTED";
          gstin: string | null;
          city: string;
          state: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type?: "EMPLOYER" | "AGENCY" | "INTERNAL";
          verification_status?: "PENDING" | "VERIFIED" | "REJECTED";
          gstin?: string | null;
          city: string;
          state: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: "EMPLOYER" | "AGENCY" | "INTERNAL";
          verification_status?: "PENDING" | "VERIFIED" | "REJECTED";
          gstin?: string | null;
          city?: string;
          state?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      organization_memberships: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string;
          role: "OWNER" | "ADMIN" | "RECRUITER" | "MEMBER";
          status: "ACTIVE" | "INVITED" | "SUSPENDED";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          user_id: string;
          role?: "OWNER" | "ADMIN" | "RECRUITER" | "MEMBER";
          status?: "ACTIVE" | "INVITED" | "SUSPENDED";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          user_id?: string;
          role?: "OWNER" | "ADMIN" | "RECRUITER" | "MEMBER";
          status?: "ACTIVE" | "INVITED" | "SUSPENDED";
          created_at?: string;
          updated_at?: string;
        };
      };
      staff_profiles: {
        Row: {
          user_id: string;
          department: "OPERATIONS" | "SUPPORT" | "ENGINEERING" | "EXECUTIVE";
          staff_status: "ACTIVE" | "INACTIVE";
          is_super_admin: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          department: "OPERATIONS" | "SUPPORT" | "ENGINEERING" | "EXECUTIVE";
          staff_status?: "ACTIVE" | "INACTIVE";
          is_super_admin?: boolean;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          department?: "OPERATIONS" | "SUPPORT" | "ENGINEERING" | "EXECUTIVE";
          staff_status?: "ACTIVE" | "INACTIVE";
          is_super_admin?: boolean;
          created_at?: string;
        };
      };
      contact_preferences: {
        Row: {
          id: string;
          user_id: string;
          channel: "VOICE" | "SMS" | "WHATSAPP";
          preference: "OPT_IN" | "OPT_OUT" | "SCHEDULED_ONLY";
          allowed_start_time: string | null;
          allowed_end_time: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          channel: "VOICE" | "SMS" | "WHATSAPP";
          preference?: "OPT_IN" | "OPT_OUT" | "SCHEDULED_ONLY";
          allowed_start_time?: string | null;
          allowed_end_time?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          channel?: "VOICE" | "SMS" | "WHATSAPP";
          preference?: "OPT_IN" | "OPT_OUT" | "SCHEDULED_ONLY";
          allowed_start_time?: string | null;
          allowed_end_time?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}
