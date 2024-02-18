import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { msalConfigScopes } from './msal-config';

@Component({
  selector: 'app-login-button',
  standalone: true,
  template: `
    <button (click)="handleLogin()">
      Login
    </button>
  `
})

export class LoginButtonComponent {
  constructor(private msalService: MsalService, private router: Router) { }

  handleLogin(): void {
    this.msalService.instance.loginPopup({ scopes: msalConfigScopes })
      .then(() => {
        this.router.navigateByUrl('companies');
      });
  }
}
