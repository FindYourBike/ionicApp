import { Injectable } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';

const PoolData = {
  UserPoolId: 'us-east-1_Ef3bmvCFF',
  ClientId: 'j76onm4ggtf0jmgue5sr97dio'
};

const userPool = new CognitoUserPool(PoolData);

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /// Sign Up User
  signupUser(user: string, password: string, email: string) {
    const dataEmail = {
      Name: 'email',
      Value: email
    };
    const  emailAtt = [new CognitoUserAttribute(dataEmail)];

    userPool.signUp(user,  password, emailAtt, null, ((err, result) => {
      if (err) {
        console.log('There was an error ', err);
      } else {
        console.log('You have successfully signed up, please confirm your email ')
      }
    }))
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
        //this.isUser.next(true);
        //this.router.navigate(['/'])
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
    //this.router.navigate(['home'])
  }
}


