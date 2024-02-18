import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { msalConfigScopes } from "./msal-config";

export const authenticationGuard: CanActivateFn = async (route, state) => {
  const msalService: MsalService = inject(MsalService);
  const router: Router = inject(Router);

  const accounts = msalService.instance.getAllAccounts();
  if (accounts.length > 0) {
    return true;
  } else {
    //TODO: Implement silent token renewal
    await msalService.instance.loginPopup({ scopes: msalConfigScopes })
      .then(() => {
        router.navigateByUrl('companies');
      });
    return false;
  }
};
