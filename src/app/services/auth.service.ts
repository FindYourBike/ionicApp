import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import { RegistrationPage } from '../login/registration/registration.page';

const PoolData = {
  UserPoolId: 'us-east-1_Ef3bmvCFF',
  ClientId: 'j76onm4ggtf0jmgue5sr97dio'
};

const userPool = new CognitoUserPool(PoolData);

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, private router: Router) { }

  /// Sign Up User
  signupUser(username: string, password: string, email: string, name: string) {

    var attributeList = [];
    const dataEmail = {
      Name: 'email',
      Value: email
    };
    const  emailAtt = new CognitoUserAttribute(dataEmail);

    const dataName = {
      Name: 'name',
      Value: name
    }
    const nameAtt = new CognitoUserAttribute(dataName)
    const attributes = [];
    attributes.push(emailAtt)
    attributes.push(nameAtt)

    userPool.signUp(username,  password, attributes, null, function(err, result){
      if (err) {
        console.log('There was an error ', err);
      } else {
        console.log('You have successfully signed up, please confirm your email ');
      }
    })
    this.router.navigate(['/login/registration/confirm/' + username]);
  }
  


  /// Confirm User
  confirmUser(username: string, code: string) {
    const userData = {
      Username: username,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log('There was an error -> ', err)
      } else {
        console.log('You have been confirmed ')
      }
    })
    this.router.navigate(['/login']);
  }


  //// Sign in User
  signinUser(username: string, password: string) {
    const authData = {
      Username: username,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('You are now Logged in');
        console.log(result)
        // store the token
        localStorage.setItem('token', result.getIdToken().getJwtToken())
        //this.isUser.next(true);
        this.router.navigate(['/tabs'])
      },
      onFailure: (err) => {
        console.log('There was an error during login, please try again -> ', err)
      }
    })
  }


  /// Log User Out
  logoutUser() {
    userPool.getCurrentUser().signOut();
    console.log("logged out")
    localStorage.setItem('token',"")
    this.router.navigate(['/'])
  }

  /// Check whether user token is still valid
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getUserID(): string{
    return this.jwtHelper.decodeToken(this.getToken())["sub"]
  }
  
  public getToken(): string{
    return localStorage.getItem('token')
  }

  public getUserInfo(): IUserInfo{

    const user: IUserInfo = {
      username: this.jwtHelper.decodeToken(this.getToken())["cognito:username"],
      email: this.jwtHelper.decodeToken(this.getToken())["email"],
      name: this.jwtHelper.decodeToken(this.getToken())["name"],
    };

    return user
  }
}

export interface IUserInfo {
  username: string;
  email: string;
  name: string;
}


