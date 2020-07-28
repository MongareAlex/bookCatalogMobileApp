import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  selectedImage: string;
  useFilePicker = false;
  constructor(private platform: Platform) { }

  ngOnInit() {
    if (
      (this.platform.is('mobile') && !this.platform.is('hybrid'))
      || this.platform.is('desktop')
      ){
      this.useFilePicker = true;
    }
  }
  onPickImage(){
    if (!Capacitor.isPluginAvailable('Camera')){
      this.filePickerRef.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 300,
      width: 200,
      resultType: CameraResultType.DataUrl
    })
    .then(img => {
      this.selectedImage = img.dataUrl;
      this.imagePick.emit(img.dataUrl);
    }).catch(error => {
      if (this.useFilePicker){
        this.filePickerRef.nativeElement.click();
      }
      return false;
    });
  }

  onFileChosen(event: Event){
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile){
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }
}
