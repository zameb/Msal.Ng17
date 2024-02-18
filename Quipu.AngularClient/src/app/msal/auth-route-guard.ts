import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { msalConfigScopes } from "./msal-config";

export const authenticationGuard: CanActivateFn = async (route, state) => {
  const msalService: MsalService = inject(MsalService);
  const router: Router = inject(Router);

  console.log('authenticationGuard check');
  const accounts = msalService.instance.getAllAccounts();
  if (accounts.length > 0) {
    console.log('Navigation allowed');
    return true;
  } else {
    //TODO: Implement silent token renewal
    console.log('Navigation blocked');
    await msalService.instance.loginPopup({ scopes: msalConfigScopes })
      .then(() => {
        router.navigateByUrl('companies');
      });
    return false;
  }
};
