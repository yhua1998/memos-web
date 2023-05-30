interface Profile {
    mode: string;
    version: string;
}

interface CustomizedProfile {
    name: string;
    logoUrl: string;
    description: string;
    locale: Locale;
    appearance: Appearance;
    externalUrl: string;
}

interface OpenAIConfig {
    key: string;
    host: string;
}

interface SystemStatus {
    host?: User;
    profile: Profile;
    dbSize: number;
    // system settings
    allowSignUp: boolean;
    ignoreUpgrade: boolean;
    disablePublicMemos: boolean;
    maxUploadSizeMib: number;
    additionalStyle: string;
    additionalScript: string;
    customizedProfile: CustomizedProfile;
    storageServiceId: number;
    localStoragePath: string;
    memoDisplayWithUpdatedTs: boolean;
}

interface SystemSetting {
    name: string;
    value: string;
}
