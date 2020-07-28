import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserLoginModel } from '../_Data/UserLoginModel';
import { UserToRegister } from '../_Data/UserToRegister';
import { JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_Data/User';
import { BehaviorSubject } from 'rxjs';
import { ChangeEmailModel } from '../_Data/changeEmailModel';
import { ChangePasswordModel } from '../_Data/ChangePasswordModel';
import { AlertingService } from './alerting.service';
import {Plugins} from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private alertService: AlertingService) {

}
baseUrl = environment.AuthApiUrl;
AuthV2Base = environment.AuthV2ApiUrl;
jwtHelper = new JwtHelperService();
role: string;
loggedIn = new BehaviorSubject<boolean>(false);
currentUser?: User;
login(userToLogInModel: UserLoginModel) {
  const loginurlpart = 'login';
  return this.http.post (this.baseUrl + loginurlpart,
      userToLogInModel).pipe(
        map((response: any) => {
          this.loggedIn.next(true);
          const usertoken = response;
          if (usertoken != null) {
          this.storeAuthData(usertoken.token);
          // localStorage.setItem ('token', usertoken.token);
          }
        })
  );
}

getUserInfo(): User {
  const token = localStorage.getItem('token');
  const decodedToken = this.jwtHelper.decodeToken(token);
  this.currentUser = new User();
  this.currentUser.Email = decodedToken.Email;
  this.currentUser.UniqueId = decodedToken.unique_name;
  this.currentUser.UserName = decodedToken.given_name;
  this.currentUser.PhoneNumber = decodedToken['mobile number'];
  return this.currentUser;
}

async isLoggedIn() {
 return await this.getStoredAuthData();
//  .pipe(
//    map(storedToken => {
//     console.log('trying to retrieve token info');
//     if (storedToken === null) {
//              return false;
//            }
//     if (this.jwtHelper.isTokenExpired(storedToken.value)) {
//          return false;
//            }
//     if (!this.jwtHelper.decodeToken(storedToken.value)) {
//              return false;
//            }
//     return true;
//    }
//  ));


}

logOut() {
  console.log('Logged out from pt1 authguard');
  localStorage.removeItem('token');
  this.loggedIn.next(false);
}

signUp(userToSignUp: UserToRegister) {
  const signUpUrl = 'signUp';
  return this.http.post(this.baseUrl + signUpUrl, userToSignUp);
}

updateEmail(emailModel: ChangeEmailModel) {
    const url = 'ChangeEmail';
    return this.http.post (this.AuthV2Base + url,
      emailModel);
}

updatePassword(passwordModel: ChangePasswordModel) {
    const url = 'ChangePassword';
    return this.http.post (this.AuthV2Base + url,
      passwordModel);
}

recoverAccountPassword() {
  const forgotPassword = 'ForgotPassword';
  window.location.href = environment.AuthV2ApiUrl + forgotPassword;
}


private storeAuthData(userToken: any ){
Plugins.Storage.set({key: 'token', value: userToken});
}

private getStoredAuthData(){
  return Plugins.Storage.get({key: 'token'})
  .then((token) => {
    console.log('trying to retrieve token info');
    if (token === null) {
         return false;
       }
    if (this.jwtHelper.isTokenExpired(token.value)) {

     return false;
       }
    if (!this.jwtHelper.decodeToken(token.value)) {
         return false;
       }
    return true;

});
}
}
