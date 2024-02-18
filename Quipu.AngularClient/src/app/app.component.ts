import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subscription } from 'rxjs';
import { publicClientApp } from './msal/msal-service-factory';
import { LoginButtonComponent } from './msal/login-button.component';
import { LogoutButtonComponent } from './msal/logout-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoginButtonComponent,
    LogoutButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  companyId: string = "";
  isAuthenticated = false;
  isSigningIn = false;
  isInitialized = false;
  isCallingApi = false;
  isValidatingToken = false;

  private msalSubscription: Subscription = null!;

  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
    publicClientApp.initialize().then(() => {
      console.log('MSAL well initialized');
      this.isInitialized = true;
    });

    this.msalSubscription = this.msalBroadcastService.inProgress$
      .subscribe((status: InteractionStatus) => {
        this.isSigningIn = true;
        console.log('Interaction status:', status);
        if (status === InteractionStatus.None || status === InteractionStatus.Startup) {
          this.isAuthenticated = this.msalService.instance.getAllAccounts().length > 0;
          this.isSigningIn = false;
        } else {
          this.isSigningIn = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.msalSubscription.unsubscribe();
  }
}
