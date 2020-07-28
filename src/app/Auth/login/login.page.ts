import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserLoginModel } from 'src/app/_Data/UserLoginModel';
import { AuthService } from 'src/app/_Services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  // pwdPattern = '^[a-z0-9._%+-]{6,12}$';
emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
userLoginModel = new UserLoginModel();
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.createLoginForm();
  }
createLoginForm(){
  this.loginForm = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    Password: ['', [Validators.required]]
  });
}
async login() {
  this.userLoginModel.Email = this.loginForm.get('Email').value;
  this.userLoginModel.PassWord = this.loginForm.get('Password').value;

  const loading = await this.loadingCtrl.create({
    message: 'Logging in...',
    duration: 2000
  });

  await loading.present();
  this.authService.login(this.userLoginModel).subscribe(next => {
    loading.dismiss();
    this.router.navigate(['/home/books']);
               },
               error => {
                loading.dismiss();
                console.error('Unauthorized');
                this.showAlert('Unauthorized','Authentication failed ');
                this.router.navigate(['/start']);

               }
     );

   }

   private async showAlert( header: string, message: string){
    const alert = await this.alertCtrl.create({
     header,
     message,
     buttons: ['Okay']
     });
    await alert.present();
   }
}
