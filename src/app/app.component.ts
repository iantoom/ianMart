import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  _displayAccountIcons = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private authService: AuthService, public media: MediaObserver) { // ObservableMedia changed to MediaObserver in Angular 7
    iconRegistry.addSvgIcon('heart', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/heart.svg'));
  }

  ngOnInit() {
    this.authService.authStatus.subscribe(
      authStatus => {
        setTimeout(
           () => {
             this._displayAccountIcons = authStatus.isAuthenticated;
            }, 0
        );
      }
    );
  }

  get displayAccountIcons () {
    return this._displayAccountIcons;
  }
}
