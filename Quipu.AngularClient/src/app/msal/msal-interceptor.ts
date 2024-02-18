import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { from, switchMap } from 'rxjs';
import { msalConfigScopes } from './msal-config';

export const AuthMsalInterceptor: HttpInterceptorFn = (req, next) => {
  const msalService: MsalService = inject(MsalService);

  const accounts = msalService.instance.getAllAccounts();
  const account = accounts[0];
  if (account) {
    return from(msalService.instance.acquireTokenSilent({
      account,
      scopes: msalConfigScopes,
    })).pipe(
      switchMap((tokenResponse) => {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenResponse.accessToken}`
          }
        });
        return next(authReq);
      })
    );
  } else {
    return next(req);
  }  
};
