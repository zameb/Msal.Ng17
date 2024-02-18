import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MSAL_INSTANCE, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { appRoutes } from './app.routes';
import { AuthMsalInterceptor } from './msal/msal-interceptor';
import { publicClientApp } from './msal/msal-service-factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([AuthMsalInterceptor])),
    provideAnimations(),
    { provide: MSAL_INSTANCE, useValue: publicClientApp },
    MsalService,
    MsalBroadcastService,
    provideAnimations()
  ]
};
