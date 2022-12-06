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
  OptionAlert(title: string, text: string) {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    });
  }
}
