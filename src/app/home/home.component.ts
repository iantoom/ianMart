import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  template: `

    <div style="margin-top: 1em" *ngIf="displayLogin">
      <app-login></app-login>
    </div>

    <div *ngIf="!displayLogin">
      <span	class="mat-display-3">You	get	a	love,	you	get	a	love,
      you	get	a	love...</span>
    </div>
  `,
  styles: [`
    div[fxLayout] {
      margin-top: 1em;
    }
    button {
      margin-top: 1em;
    }
  `]
})
export class HomeComponent implements OnInit {

  private _displayLogin = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authStatus.subscribe(
      authStatus => (this._displayLogin =
        !authStatus.isAuthenticated)
    );
  }

  get displayLogin() {
    return this._displayLogin;
  }

}
