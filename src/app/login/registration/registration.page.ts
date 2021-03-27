import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  options = {
    minLength: 8,
    requireLetters: true,
    requireLowerCaseLetters: true,
    requireUpperCaseLetters: true,
    requireNumbers: true,
    requireSpecialCharacters: true
  }

  registerForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordValidator(this.options)]),
    confirmPassword: ['',  [Validators.required, matchOtherValidator('password'), passwordValidator(this.options)]]
  })

  constructor(public service : AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  
  tryRegister(): void{
    this.service.signupUser(this.registerForm.value["username"], this.registerForm.value["password"], this.registerForm.value["email"], this.registerForm.value["name"])
    this.registerForm.reset()
  }


  matchOtherValidator (otherControlName: string) {

    let thisControl: FormControl;
    let otherControl: FormControl;
  
    return function matchOtherValidate (control: FormControl) {
      if (!control.parent) {
        return null;
      }
      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }
      if (!otherControl) {
        return null;
      }
      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true
        };
      }
      return null;
    }
  }
}

// https://github.com/the-moebius/ng-validators/blob/master/src/validators/password.validator.ts

import { AbstractControl } from '@angular/forms';


export interface PasswordValidatorOptions {
  minLength?: number;
  maxLength?: number;
  requireLetters?: boolean;
  requireLowerCaseLetters?: boolean;
  requireUpperCaseLetters?: boolean;
  requireNumbers?: boolean;
  requireSpecialCharacters?: boolean;
}

export interface PasswordValidatorErrors {
  passwordMinLengthRequired?: {
    minLength: number;
  };
  passwordMaxLengthExceeded?: {
    maxLength: number;
  };
  passwordLetterRequired?: true;
  passwordLowerCaseLetterRequired?: true;
  passwordUpperCaseLetterRequired?: true;
  passwordNumberRequired?: true;
  passwordSpecialCharacterRequired?: true;
}


export function passwordValidator(options: PasswordValidatorOptions) {

  const validator = new PasswordValidator(options);

  return function validatePassword(control: AbstractControl) {
    return validator.validate(control.value);
  }

}


export class PasswordValidator {

  private letterMatcher = /[a-zA-Z]/;
  private lowerCaseLetterMatcher = /[a-z]/;
  private upperCaseLetterMatcher = /[A-Z]/;
  private numberMatcher = /[0-9]/;
  private specialCharactersMatcher = /[-+=_.,:;~`!@#$%^&*(){}<>\[\]"'\/\\]/;


  constructor(private options: PasswordValidatorOptions) {
  }


  public validate(value: string): PasswordValidatorErrors | null {

    if (!value) {
      return null;
    }

    const {
      minLength,
      maxLength,
      requireLetters,
      requireLowerCaseLetters,
      requireUpperCaseLetters,
      requireNumbers,
      requireSpecialCharacters,

    } = this.options;

    const errors: PasswordValidatorErrors = {};

    // Minimum length
    if (undefined !== minLength && minLength > 0 && value.length < minLength) {
      errors.passwordMinLengthRequired = {
        minLength: minLength,
      };
    }
    // Maximum length
    if (undefined !== maxLength && maxLength >= 0 && value.length > maxLength) {
      errors.passwordMaxLengthExceeded = {
        maxLength: maxLength,
      };
    }
    // Letters
    if (requireLetters && !this.letterMatcher.test(value)) {
      errors.passwordLetterRequired = true;
    }
    // Lower-case letters
    if (requireLowerCaseLetters && !this.lowerCaseLetterMatcher.test(value)) {
      errors.passwordLowerCaseLetterRequired = true;
    }
    // Upper-case letters
    if (requireUpperCaseLetters  && !this.upperCaseLetterMatcher.test(value)) {
      errors.passwordUpperCaseLetterRequired = true;
    }
    // Numbers
    if (requireNumbers && !this.numberMatcher.test(value)) {
      errors.passwordNumberRequired = true;
    }
    // Special characters
    if (requireSpecialCharacters && !this.specialCharactersMatcher.test(value)) {
      errors.passwordSpecialCharacterRequired = true;
    }
    return (
      Object.keys(errors).length > 0 ?
        errors :
        null
    );
  }
}

//https://github.com/the-moebius/ng-validators/blob/master/src/validators/match-other.validator.ts


export interface MatchOtherValidatorErrors {
  matchOther?: true;
}


export function matchOtherValidator(otherControlName: string) {

  let thisControl: (AbstractControl | undefined);
  let otherControl: (AbstractControl | undefined);

  return function matchOtherValidate(
    control: AbstractControl

  ): MatchOtherValidatorErrors | null {

    if (!control.parent) {
      return null;
    }

    // Initializing the validator on first call
    if (!thisControl) {

      thisControl = control;

      otherControl = (control.parent.get(otherControlName) || undefined);
      if (!otherControl) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }

      // Updating validity of this control when value in other control changes
      otherControl.valueChanges.subscribe(() => thisControl!.updateValueAndValidity());

    }

    if (!otherControl) {
      return null;
    }

    if (otherControl.value !== thisControl.value) {
      return { matchOther: true };
    }

    return null;

  }

}

