import { Component, OnInit } from '@angular/core';
import { Role } from '../../auth/role.enum';
import { PhoneType, IUSState } from './data';
import { $enum } from 'ts-enum-util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../user/user';
import { EmailValidation, RequiredTextValidation, OneCharValidation,
  BirthDateValidation, OptionalTextValidation, USAZipCodeValidation } from '../../common/validations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  /**
   * Assign role.enum to Role instance variable
   */
  Role = Role;
  PhoneTypes = $enum(PhoneType).getKeys;
  userForm: FormGroup;
  states: Observable<IUSState[]>;
  userError = '';
  currentUserRole = this.Role.None;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authStatus.subscribe(
      authStatus => (this.currentUserRole = authStatus.userRole)
    );

    this.userService.getCurrentUser().subscribe(user => {
      this.buildUserForm(user);
    });

    /**
     * build Empty user form before getCurrentUser done
     */
    this.buildUserForm();
  }

  buildUserForm(user?: IUser) {
    this.userForm = this.formBuilder.group({
      email: [
        {
          value: (user && user.email) || '',
          disabled: this.currentUserRole !== this.Role.Manager
        },
        EmailValidation
      ],

      name: this.formBuilder.group({
        first: [(user && user.name.first) || '', RequiredTextValidation],
        middle: [(user && user.name.middle) || '', OneCharValidation],
        last: [(user && user.name.last) || '', RequiredTextValidation]
      }),

      role: [
        {
          value: (user && user.role) || '',
          disabled: this.currentUserRole !== this.Role.Manager
        },
        [Validators.required]
      ],

      dateOfBirth: [(user && user.role) || '', BirthDateValidation],

      address: this.formBuilder.group({
        line1: [
          (user && user.address && user.address.line1) || '',
          RequiredTextValidation
        ],
        line2: [
          (user && user.address && user.address.line2) || '',
          OptionalTextValidation
        ],
        city: [
          (user && user.address && user.address.city) || '',
          RequiredTextValidation
        ],
        state: [
          (user && user.address && user.address.city) || '',
          RequiredTextValidation
        ],
        zip: [
          (user && user.address && user.address.zip) || '',
          USAZipCodeValidation
        ]
      })
    });
  }
}
