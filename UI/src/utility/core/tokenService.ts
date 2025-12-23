// import { MMKV_STORAGE_KEY, StorageService } from "../localstorage/StorageService";
// import { getRefreshTokenService, getSystemTokenService } from "./service";

// Utility to get tokens and refresh if needed
export class TokenService {
  static storage = StorageService.getInstance();

  static async getSystemToken(): Promise<string | null | unknown> {
    try {
      const token = this.storage.get(MMKV_STORAGE_KEY.systemToken);
      if (!token) {
        // await getSystemTokenService();
        return this.storage.get(MMKV_STORAGE_KEY.systemToken);
      }
      return token;
    } catch (error) {
      return '';
    }
  }

  static async getAuthToken(): Promise<string | null> {
    return this.storage.get(MMKV_STORAGE_KEY.userAuthToken);
  }

  static async refreshSystemToken(): Promise<void> {
   // Call a refresh endpoint and store the new system token
    this.storage.remove(MMKV_STORAGE_KEY.systemToken);
    // await getSystemTokenService();
  }

  static async getRefreshToken(): Promise<string | null> {
    return this.storage.get(MMKV_STORAGE_KEY.refreshtoken);
  }

  static async refreshAuthToken(): Promise<void> {
    // await getRefreshTokenService();// Call a refresh endpoint and store the new auth token
   }
  }