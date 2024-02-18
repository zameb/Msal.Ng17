import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  template: `
    <button (click)="handleLogout()">
      Logout
    </button>
  `
})

export class LogoutButtonComponent {
  constructor(
    private msalService: MsalService,
    private router: Router) { }

  handleLogout(): void {
    this.msalService.instance.logoutPopup()
      .then(() => {
        this.router.navigateByUrl('');
      });
  }
}
