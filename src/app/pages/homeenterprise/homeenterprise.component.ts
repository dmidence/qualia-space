import { AlertsService } from './../../services/alerts.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homeenterprise',
  templateUrl: './homeenterprise.component.html',
  styleUrls: ['./homeenterprise.component.css'],
})
export class HomeenterpriseComponent implements OnInit {
  userId = JSON.parse(
    sessionStorage.getItem('qspaceuser') || '{"dataUser":{"logged":false}}'
  ).dataUser._id;

  stores: any = [];

  newStore: any = {
    name: '',
    description: '',
  };

  @ViewChild('closeModalButton', { static: false }) closeModalButton: any;

  modalType = 1; //1 para crear 2 para actualizar 3 para ver
  constructor(private http: UserService, private alert: AlertsService) {
    this.http.getStoresByUserId(this.userId).subscribe((res) => {
      this.stores = res;
    });
  }

  ngOnInit(): void {}
  createStore() {
    this.newStore;
    this.userId;
    this.http
      .postStore({ ...this.newStore, userId: this.userId })
      .subscribe((res: any) => {
        this.alert
          .successAlert(
            'Creado',
            'La tienda se ha creado de forma satisfactoria'
          )
          .then((alertres) => {
            this.stores.push(res);
          });
        (err: any) => {
          console.log(err);
        };
      });
  }

  deleteStore(storeId: string) {
    this.alert
      .errorAlert('Eliminar', 'Desea eliminar esta empresa?')
      .then((resalert: any) => {
        this.http.deletStore(storeId).subscribe(
          (res: any) => {
            this.alert
              .successAlert(
                'Tienda Eiminada',
                'Ha eliminado la tienda exitosamente'
              )
              .then((resalert) => {
                this.stores = this.stores.filter(
                  (store: any) => store._id != storeId
                );
              });
          },
          (err: any) => {
            this.alert.errorAlert(
              'Error al Eliminar',
              'No se pudo eliminar la tienda.'
            );
          }
        );
      });
  }

  editStore() {
    this.http.updateStore(this.newStore).subscribe(
      (res) => {
        this.alert
          .successAlert('Actualizado', 'Su tienda se actualizo correctamente')
          .then(
            (this.stores = this.stores.map((store: any) => {
              if (store._id == this.newStore._id) {
                store = this.newStore;
              }
              return store;
            }))
          )
          .then(this.closeModalButton.nativeElement.click());
      },
      (err) => {
        this.alert.errorAlert('Error', 'Error al actualizar su tienda');
      }
    );
  }

  setToCreate() {
    this.modalType = 1;
    this.newStore = { name: '', description: '' };
  }

  setToEditStore(store: any) {
    this.modalType = 2;
    this.newStore = { ...store };
  }
}
