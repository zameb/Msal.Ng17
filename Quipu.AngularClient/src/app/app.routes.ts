import { Routes } from '@angular/router';
import { CompanyListComponent } from './components/company-list.component';
import { HomeComponent } from './components/home.component';
import { Page404Component } from './components/page404.component';
import { authenticationGuard } from './msal/auth-route-guard';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'companies', component: CompanyListComponent, canActivate: [authenticationGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];
