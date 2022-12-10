import { AlertsService } from './../../services/alerts.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Editor } from 'ngx-editor';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  store: any;

  storeProducts: any[] = [];

  modalType = 1;

  editor: Editor = new Editor();

  product: any = {
    storeId: 0,
    name: '',
    price: 0,
  };
  product_form_data = new FormData();

  storeHtmlTemplates: any[] = [];

  content = '';
  aceEditor: any;
  aceEditorCss: any;
  constructor(private http: UserService, private alert: AlertsService) {
    this.store = JSON.parse(localStorage.getItem('currentStore') || '');
    this.product.storeId = this.store._id;
  }

  ngOnInit(): void {
    this.http.getPoductsStore(this.store._id).subscribe((res: any) => {
      this.storeProducts = res;
      console.log('this.storeProducts');
      console.log(this.storeProducts);
    });
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  openCreateModal() {
    this.modalType = 1;
    this.product.name = '';
    this.product.price = 0;
  }

  openUpdateModal(template: any) {
    this.modalType = 2;
    this.product = { ...template };
    this.content = template.html;
  }

  createTemplate() {
    this.product_form_data.append('storeId', this.product.storeId);
    this.product_form_data.append('name', this.product.name);
    this.product_form_data.append('price', this.product.price);

    this.http.postProduct(this.product_form_data).subscribe(
      (res) => {
        this.alert
          .successAlert('Creado', 'El Producto se ha creado exitosamente')
          .then((res) => {
            location.reload();
          });
      },
      (err) => {
        this.alert.errorAlert(
          'Ocurrio un error',
          'Ocurrio un error al crear la producto'
        );
      }
    );
  }

  updateTemplate() {
    this.product_form_data.append('storeId', this.product.storeId);
    this.product_form_data.append('name', this.product.name);
    this.product_form_data.append('price', this.product.price);

    this.http.updateProduct(this.product_form_data).subscribe(
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
          'Ocurrio un error al actualizar el producto'
        );
      }
    );
  }

  deleteTemplate(template: any) {
    this.alert
      .OptionAlert(
        `Eliminar ${template.name}?`,
        `Esta seguro de eliminar el producto ${template.name}`
      )
      .then((res) => {
        if (res.isConfirmed == true) {
          this.http.deleteProduct(template._id).subscribe(
            (res) => {
              this.alert
                .successAlert(
                  'Eliminado',
                  'El Producto se ha eliminado exitosamente'
                )
                .then((res) => {
                  location.reload();
                });
            },
            (err) => {
              this.alert.errorAlert(
                'Ocurrio un error',
                'Ocurrio un error al eliminar el producto'
              );
            }
          );
        }
      });
  }
  fillHtmlTemplates(target: any) {
    console.log(target.value);

    this.content = target.value;
  }
  handleImage(target: any) {
    this.product_form_data.append('img', target.files[0]);
  }
}
