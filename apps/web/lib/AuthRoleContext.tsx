"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "guest" | "employer" | "worker" | "admin";

export interface EmployerProfileData {
  companyName: string;
  facilityLocation: string;
  gstin: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  hiringRadiusKm: number;
  coverageMultiplier: number;
  isVerified: boolean;
}

export interface WorkerProfileData {
  fullName: string;
  phone: string;
  city: string;
  trade: string;
  experienceYears: number;
  expectedSalary: number;
  preferredLanguage: "Marathi" | "Hindi" | "English";
  commuteRadiusKm: number;
  shiftPreference: "Day" | "Night" | "Rotational" | "Any";
  consentGranted: boolean;
}

export interface AdminProfileData {
  staffName: string;
  staffId: string;
  department: string;
  clearanceLevel: "SUPER_ADMIN" | "CAMPAIGN_OPERATOR" | "COMPLIANCE_OFFICER";
  activeDesk: string;
  mfaEnabled: boolean;
}

interface AuthRoleContextType {
  role: UserRole;
  employerProfile: EmployerProfileData;
  workerProfile: WorkerProfileData;
  adminProfile: AdminProfileData;
  setRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  updateEmployerProfile: (data: Partial<EmployerProfileData>) => void;
  updateWorkerProfile: (data: Partial<WorkerProfileData>) => void;
  updateAdminProfile: (data: Partial<AdminProfileData>) => void;
}

const DEFAULT_EMPLOYER: EmployerProfileData = {
  companyName: "Precision Forge & Tools Ltd.",
  facilityLocation: "Plot 42, Satpur MIDC Industrial Area, Nashik - 422007",
  gstin: "27AABCP1234F1Z8",
  contactPerson: "Rupali Patil",
  contactEmail: "rupalipatil.2301@gmail.com",
  contactPhone: "+91 98231 •••••",
  hiringRadiusKm: 25,
  coverageMultiplier: 1.5,
  isVerified: true,
};

const DEFAULT_WORKER: WorkerProfileData = {
  fullName: "Ramesh Tukaram Shinde",
  phone: "+91 98231 45670",
  city: "Nashik (Satpur MIDC)",
  trade: "CNC Machine Operator",
  experienceYears: 3.5,
  expectedSalary: 17500,
  preferredLanguage: "Marathi",
  commuteRadiusKm: 15,
  shiftPreference: "Day",
  consentGranted: true,
};

const DEFAULT_ADMIN: AdminProfileData = {
  staffName: "Rupali Patil",
  staffId: "NYM-OPS-042",
  department: "Autonomous Campaign Operations",
  clearanceLevel: "SUPER_ADMIN",
  activeDesk: "Nashik Industrial Cluster Desk #1",
  mfaEnabled: true,
};

const AuthRoleContext = createContext<AuthRoleContextType | undefined>(undefined);

export function AuthRoleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [role, setRoleState] = useState<UserRole>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nayamarg_user_role");
      if (saved && ["guest", "employer", "worker", "admin"].includes(saved)) {
        return saved as UserRole;
      }
    }
    return "guest";
  });

  const [employerProfile, setEmployerProfile] = useState<EmployerProfileData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nayamarg_profile_employer");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return DEFAULT_EMPLOYER;
  });

  const [workerProfile, setWorkerProfile] = useState<WorkerProfileData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nayamarg_profile_worker");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return DEFAULT_WORKER;
  });

  const [adminProfile, setAdminProfile] = useState<AdminProfileData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nayamarg_profile_admin");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return DEFAULT_ADMIN;
  });

  useEffect(() => {
    localStorage.setItem("nayamarg_user_role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("nayamarg_profile_employer", JSON.stringify(employerProfile));
  }, [employerProfile]);

  useEffect(() => {
    localStorage.setItem("nayamarg_profile_worker", JSON.stringify(workerProfile));
  }, [workerProfile]);

  useEffect(() => {
    localStorage.setItem("nayamarg_profile_admin", JSON.stringify(adminProfile));
  }, [adminProfile]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const loginAs = (targetRole: UserRole) => {
    setRoleState(targetRole);
    if (targetRole === "employer") {
      router.push("/employer");
    } else if (targetRole === "worker") {
      router.push("/worker");
    } else if (targetRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  const logout = () => {
    setRoleState("guest");
    router.push("/");
  };

  const updateEmployerProfile = (data: Partial<EmployerProfileData>) => {
    setEmployerProfile((prev) => ({ ...prev, ...data }));
  };

  const updateWorkerProfile = (data: Partial<WorkerProfileData>) => {
    setWorkerProfile((prev) => ({ ...prev, ...data }));
  };

  const updateAdminProfile = (data: Partial<AdminProfileData>) => {
    setAdminProfile((prev) => ({ ...prev, ...data }));
  };

  return (
    <AuthRoleContext.Provider
      value={{
        role,
        employerProfile,
        workerProfile,
        adminProfile,
        setRole,
        loginAs,
        logout,
        updateEmployerProfile,
        updateWorkerProfile,
        updateAdminProfile,
      }}
    >
      {children}
    </AuthRoleContext.Provider>
  );
}

export function useAuthRole() {
  const context = useContext(AuthRoleContext);
  if (!context) {
    throw new Error("useAuthRole must be used within an AuthRoleProvider");
  }
  return context;
}
