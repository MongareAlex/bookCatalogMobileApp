import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_Services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
this.createForgotPasswordForm();
  }
createForgotPasswordForm(){
this.forgotPasswordForm = this.formBuilder.group(
  {Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]}
);
}
forgotPassword(){}
}
