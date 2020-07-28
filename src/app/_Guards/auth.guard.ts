import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../_Services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  async canActivate(): Promise<boolean>{
    const result = await this.auth.isLoggedIn();

    if (result === true){
      return result;
    }
    else{
      this.router.navigate(['start']);
      return false;
    }

  }
  }
