import { IPublicClientApplication, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./msal-config";

export const publicClientApp: IPublicClientApplication = new PublicClientApplication(msalConfig);
