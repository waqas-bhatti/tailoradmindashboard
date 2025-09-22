// src/Config/config.ts
interface Config {
  appwriteUrl: string;
  appwriteProjecID: string;
}

// Simple config without validation - uses fallback values if env vars are missing
const config: Config = {
  appwriteUrl:
    process.env.NEXT_PUBLIC_APPWRITE_UR || "https://fra.cloud.appwrite.io/v1",
  appwriteProjecID:
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "68cfee05002d27da98bf",
};

export default config;
