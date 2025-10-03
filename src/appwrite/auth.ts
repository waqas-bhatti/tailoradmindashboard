import { Client, Account, ID, Models, OAuthProvider } from "appwrite";
import config from "@/Config/config";

export class AuthService {
  private client: Client;
  private account: Account;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl) // Ensure your Appwrite endpoint is correct
      .setProject(config.appwriteProjecID); // Ensure your project ID is correct
    this.account = new Account(this.client);
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  async createAccount({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Models.User<Models.Preferences>> {
    if (!this.isValidEmail(email)) {
      throw new Error(`Invalid email format: ${email}`);
    }

    try {
      const userId = ID.unique();
      const userAccount = await this.account.create(userId, email, password);
      return userAccount;
    } catch (error: any) {
      throw new Error(`Failed to create account: ${error.message}`);
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Models.Session> {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        throw new Error("Invalid email or password");
      } else {
        throw new Error(`Login failed: ${error.message}`);
      }
    }
  }

  async googleLogin(): Promise <void> {
    try {
      this.account.createOAuth2Session(
        OAuthProvider.Google,
        "https://tailorix.netlify.app/dashboard"
      );
    } catch (error:any) {
      throw new Error("Error Login with Gmail")
    }
  }

  async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("Error fetching current user:", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Error logging out:", error);
    }
  }
}

const authService = new AuthService();
export default authService;
