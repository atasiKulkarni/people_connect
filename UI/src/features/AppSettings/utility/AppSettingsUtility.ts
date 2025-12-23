
export enum AppSettingsEndPoint {
  fetchAppSettings
}


export function getAppsettingsRequestURL(
  apiType: AppSettingsEndPoint) {
  switch (apiType) {
    case AppSettingsEndPoint.fetchAppSettings:
      return ''
    default : return '';
  }
}


