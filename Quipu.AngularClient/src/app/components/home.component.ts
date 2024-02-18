import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div>
      <h3>This is the home (landing) page</h3>
      <p>This page does not require authorizarion</p>
    </div>
  `,
  styles: []
})
export class HomeComponent { }
