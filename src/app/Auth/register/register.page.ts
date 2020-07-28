import { Component, OnInit } from '@angular/core';
import { UserToRegister } from 'src/app/_Data/UserToRegister';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_Services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup ;
  userToRegister: UserToRegister;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  pwdPattern = '^[a-z0-9._%+-]{6,12}$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  unamePattern = '^[a-z0-9_-]{8,15}$';
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.createRegisterForm();
  }
createRegisterForm(){
this.registerForm = this.formBuilder.group({
  Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  Password: ['', [Validators.required, Validators.minLength(8)]],
  PhoneNumber: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
  UserName: ['', [Validators.required, Validators.pattern(this.unamePattern)]],
  cnfmPwd: ['', Validators.required],
  image: [null]
  }, {validator: this.passWordMatchValidator});
}
passWordMatchValidator(fg: FormGroup) {
  return fg.get('Password').value === fg.get('cnfmPwd').value ? null : {mismatch: true};
}
async register() {
  this.userToRegister = new UserToRegister();
  this.userToRegister.Email = this.registerForm.get('Email').value;
  this.userToRegister.Password = this.registerForm.get('Password').value;
  this.userToRegister.PhoneNumber = this.registerForm.get('PhoneNumber').value;
  this.userToRegister.Username = this.registerForm.get('UserName').value;

  const loading = await this.loadingCtrl.create({
    message: 'Creating Account...',
    duration: 2000
  });
  await loading.present();

  this.authService.signUp(this.userToRegister)
  .subscribe(
    (Responsedata) => {
      loading.dismiss();
      console.log(Responsedata);
      console.log('Succesful: Check Email to finish Registration');
      // implement alert to notify user to check mail to confirm account
      this.showAlert('Authentication succesful', 'Check Email to finish Registration');
      this.registerForm.reset();
    }
    , (error: any) => {
      loading.dismiss();
      this.showAlert('Authentication Unsuccesful', 'Registration failed');
    });

  }


  onImagePicked(imageData: string | File){
    let imageFile;
    if (typeof imageData === 'string'){
      try{
        imageData = imageData.replace('data:image/png;base64,', '');
        imageData = imageData.replace('data:image/jpeg;base64,', '');
        imageFile = base64toBlob(imageData, 'image/jpeg');
      }
    catch (error)
     {
      console.error(error);
      return;
    }
    }
    else{
      imageFile = imageData;
    }
    this.registerForm.patchValue({image: imageFile});
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
