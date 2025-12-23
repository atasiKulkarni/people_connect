import type { MMKV } from 'react-native-mmkv';
import { setComplateInvestmentReadines, setInvestmentReadinessApiRefectchState, setLoadingState, setRefreshTokenFailed,setIsMFCImported, setIsSDKModuleOpen } from '../../../src/features/AppSettings/slice/AppSettingsSlice';
import { store } from '../../redux/store';
// import { store } from '../../redux/store';
export class StorageService {
  private static instance: StorageService;
  private readonly storage: MMKV = new MMKV({
      id: 'mmkv.default',
      encryptionKey: 'MySmartSelect128Key', //need to change Replace encryption key MySmartSelect128Key
    });
  public readonly LOGGEDIN_USER_KEY = 'storage_user_key';

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  public set<T>(key: string, value: T) {
    const string = JSON.stringify(value);
    this.storage.set(key, string);
  }

  public get<T>(key: string): T | null {
    const string = this.storage.getString(key);
    if (string === undefined || string === '') {
      return null; // or return a default value
    }
    try {
      return JSON.parse(string) as T;
    } catch (error) {
      return null; // or handle the error as needed
    }
  }

  public remove(key: string) {
    this.storage.delete(key);
  }

  public removeAll() {
    this.storage.clearAll();
  }

  //here handle global state manage by using redux store
  public setLoadingState(loading : boolean){
    store.dispatch(setLoadingState({isLoading: loading}));
   }
  
   public setIsApiRefetchState(isApiRefetch : boolean){
    store.dispatch(setInvestmentReadinessApiRefectchState({isApiRefetchInvestmentReadiness: isApiRefetch}));
   }

   public setComplateInvestmentReadinesState(isComplateInvestmentFlag : boolean){
    store.dispatch(setComplateInvestmentReadines({isComplateInvestmentReadines: isComplateInvestmentFlag}));
   }

   public setRefreshTokenFailedState(isRefreshTokenFailed : boolean){
    store.dispatch(setRefreshTokenFailed({isRefreshTokenFailed: isRefreshTokenFailed}));
   }

   public setIsMFCImportedState(isMFCImported : boolean){
    store.dispatch(setIsMFCImported({isMFCImported: isMFCImported}));
   }
   
   public setIsSDKModuleOpenState(isSDKModuleOpen : boolean){
    store.dispatch(setIsSDKModuleOpen({isSDKModuleOpen: isSDKModuleOpen}));
   }
}
//here all mmkv local storage key
export enum MMKV_STORAGE_KEY {
  mobile = 'mobile',
  pan = 'pan',
  biometricAuth = 'biometricAuth',
  userAuthToken = 'userAuthToken',
  systemToken = 'systemToken',
  hasShownCarousel = 'hasShownCarousel',
  applicantKey = 'applicantKey',
  authorizationCode = 'authorizationCode',
  customerDetails = 'customerDetails',
  investmentReadinessFlags = 'investmentReadinessFlags',
  mfsdkFederatedToken = 'mfsdkFederatedToken',
  refreshtoken = 'refreshtoken',
  homepageDetails = 'homepageDetails',
}