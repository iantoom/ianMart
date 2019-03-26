import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailValidation, PasswordValidation } from '../common/validations';
import { UiServiceService } from '../common/ui-service.service';
import { Role } from '../auth/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError = '';
  redirectUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiServiceService

  ) {
    route.paramMap.subscribe(params => (this.redirectUrl =
      params.get('redirectUrl')));
  }

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation]
    });
  }

  async login(submittedForm: FormGroup) {
    this.authService.login(
      submittedForm.value.email, submittedForm.value.password
    ).subscribe(authStatus => {
      if (authStatus.isAuthenticated) {
        this.uiService.showToast(
          `Welcome! Role: ${authStatus.userRole}`
        );
        this.router.navigate([this.redirectUrl || this.homeRouteperRole(authStatus.userRole)]);
      }
    }, error => (this.loginError = error));
  }

  homeRouteperRole(role: Role) {
    switch (role) {
      case Role.Cashier: return '/pos';
      case Role.Clerk: return '/inventory';
      case Role.Manager: return '/manager';
      default: return '/user/profile';
    }
  }
}
