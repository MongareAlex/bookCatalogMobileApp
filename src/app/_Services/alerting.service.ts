import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
// Wrapper for alertify js methods
  export class AlertingService {

  constructor() { }

  confirm(message: string, okCallback: () => any) {
  alertify.confirm(message, function click(e: any) {
    if (e) {
      okCallback();
    } else {}
  });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }


}
