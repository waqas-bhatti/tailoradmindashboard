import { Client, Databases, Query, ID, Account } from "appwrite";
import config from "@/Config/config";
import authServices from "./auth";

export class StorageServices {
  private client: Client;
  private account: Account;
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjecID);
    this.account = new Account(this.client);
  }
}
const storageService = new StorageServices();
export default storageService;
