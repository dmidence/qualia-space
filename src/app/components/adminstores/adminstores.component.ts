import { AlertsService } from './../../services/alerts.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminstores',
  templateUrl: './adminstores.component.html',
  styleUrls: ['./adminstores.component.css'],
})
export class AdminstoresComponent implements OnInit {
  stores: any = [];

  newStore: any = {
    name: '',
    description: '',
    userId: '',
  };
  users: any[];

  @ViewChild('closeModalButton', { static: false }) closeModalButton: any;

  modalType = 1; //1 para crear 2 para actualizar 3 para ver
  constructor(
    private http: UserService,
    private alert: AlertsService,
    private router: Router
  ) {
    this.http.getAllStores().subscribe((res) => {
      this.stores = res;
    });
    this.http.getUsers().subscribe((res) => {
      this.users = res.filter((user) => user.user_type === 'enterprise');
    });
  }

  ngOnInit(): void {}
  createStore() {
    this.newStore;
    this.http
      .postStore({ ...this.newStore, userId: this.newStore.userId })
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
      .OptionAlert('Eliminar', 'Desea eliminar esta empresa?')
      .then((resalert: any) => {
        if (resalert.isConfirmed) {
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
        }
      })
      .catch();
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

  setStore(store: any) {
    this.router.navigateByUrl('/store');
    localStorage.setItem('currentStore', JSON.stringify(store));
  }
}
