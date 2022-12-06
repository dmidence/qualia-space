import { AlertsService } from './../../services/alerts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit, OnDestroy {
  store: any;

  storeTemplates: any[] = [];

  modalType = 1;

  editor: Editor = new Editor();

  template = {
    storeId: 0,
    name: '',
    type: '',
    html: '',
    css: '',
  };

  constructor(private http: UserService, private alert: AlertsService) {
    this.store = JSON.parse(localStorage.getItem('currentStore') || '');
    this.template.storeId = this.store._id;
  }

  ngOnInit(): void {
    console.log(this.template);
    this.http.getTemplatesByStoreId(this.store._id).subscribe((res: any) => {
      this.storeTemplates = res;
      console.log(this.storeTemplates);
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  openCreateModal() {
    this.modalType = 1;
  }

  openUpdateModal(template: any) {
    this.modalType = 2;
    this.template = { ...template };
  }

  createTemplate() {
    this.http.postTemplate(this.template).subscribe(
      (res) => {
        this.alert
          .successAlert('Creado', 'La pagina se ha creado exitosamente')
          .then((res) => {
            location.reload();
          });
      },
      (err) => {
        this.alert.errorAlert(
          'Ocurrio un error',
          'Ocurrio un error al crear la plantilla'
        );
      }
    );
  }

  updateTemplate() {
    this.http.updateTemplate(this.template).subscribe(
      (res) => {
        this.alert
          .successAlert(
            'Actualizado',
            'La pagina se ha actualizado exitosamente'
          )
          .then((res) => {
            location.reload();
          });
      },
      (err) => {
        this.alert.errorAlert(
          'Ocurrio un error',
          'Ocurrio un error al actualizar la plantilla'
        );
      }
    );
  }

  deleteTemplate(template: any) {
    this.alert
      .OptionAlert(
        `Eliminar ${template.name}?`,
        `Esta seguro de eliminar la plantilla ${template.name}`
      )
      .then((res) => {
        if (res.isConfirmed == true) {
          this.http.deleteTemplate(template._id).subscribe(
            (res) => {
              this.alert
                .successAlert(
                  'Eliminado',
                  'La Plantilla se ha eliminado exitosamente'
                )
                .then((res) => {
                  location.reload();
                });
            },
            (err) => {
              this.alert.errorAlert(
                'Ocurrio un error',
                'Ocurrio un error al eliminar la plantilla'
              );
            }
          );
        }
      });
  }
}
