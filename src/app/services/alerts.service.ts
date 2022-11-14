import { Component, Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  errorAlert(title: string, text: string) {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  }
  successAlert(title: string, text: string) {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: text,
    });
  }
}
