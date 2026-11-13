import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

describe("NayaMarg 2.0 — Backend Security & Leak Audit", () => {
  const repoRoot = path.resolve(__dirname, "../../..");

  it("Security Test 1: Zero tracked .env files in Git index", () => {
    const trackedFiles = execSync("git ls-files", { cwd: repoRoot, encoding: "utf-8" }).split("\n");
    const trackedEnvFiles = trackedFiles.filter(
      (f) => f.includes(".env") && !f.endsWith(".example") && !f.endsWith(".md")
    );

    expect(trackedEnvFiles).toEqual([]);
  });

  it("Security Test 2: Zero secrets (sb_secret_, sb_publishable_) committed in Git tracked files", () => {
    const trackedFiles = execSync("git ls-files", { cwd: repoRoot, encoding: "utf-8" }).trim().split("\n");
    const leakedFiles: string[] = [];

    for (const file of trackedFiles) {
      if (!file || file.includes("backend-security-check.spec.ts")) continue;
      const fullPath = path.join(repoRoot, file);
      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        const content = fs.readFileSync(fullPath, "utf-8");
        if (content.includes("sb_secret_") || content.includes("sb_publishable_")) {
          leakedFiles.push(file);
        }
      }
    }

    expect(leakedFiles).toEqual([]);
  });

  it("Security Test 3: .gitignore strictly rules out all environment and credential files", () => {
    const gitignoreContent = fs.readFileSync(path.join(repoRoot, ".gitignore"), "utf-8");
    expect(gitignoreContent).toContain(".env");
    expect(gitignoreContent).toContain("*.env");
    expect(gitignoreContent).toContain(".env.local");
  });
});
