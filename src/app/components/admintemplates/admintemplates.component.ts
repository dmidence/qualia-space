import { AlertsService } from './../../services/alerts.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

import * as ace from 'ace-builds';
@Component({
  selector: 'app-admintemplates',
  templateUrl: './admintemplates.component.html',
  styleUrls: ['./admintemplates.component.css'],
})
export class AdmintemplatesComponent implements OnInit {
  @ViewChild('editor2') private editor2: ElementRef<HTMLElement>;
  @ViewChild('editor3') private editor3: ElementRef<HTMLElement>;
  stores: any[];
  htmlTemplates: any[];
  aceEditor: any;
  aceEditorCss: any;
  constructor(
    private http: UserService,
    private alert: AlertsService,
    private router: Router
  ) {}
  template = {
    name: '',
    html: '',
    css: '',
  };
  storeHtmlTemplates: any[] = [];
  modalType = 1;
  ngOnInit(): void {
    this.getAllHtmlTemplates();
  }
  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    this.aceEditor = ace.edit(this.editor2.nativeElement);
    this.aceEditor.setTheme('ace/theme/twilight');
    this.aceEditor.session.setMode('ace/mode/html');
    this.aceEditorCss = ace.edit(this.editor3.nativeElement);
    this.aceEditorCss.setTheme('ace/theme/twilight');
    this.aceEditorCss.session.setMode('ace/mode/css');
  }
  getAllStores() {
    this.http.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });
  }
  getAllHtmlTemplates() {
    this.http.getHtmlTemplates().subscribe((res: any) => {
      this.htmlTemplates = res;
      console.log(this.htmlTemplates);
    });
  }
  openCreateModal() {
    this.modalType = 1;
  }
  deleteTemplate(template: any) {
    this.alert
      .OptionAlert(
        `Eliminar ${template.name}?`,
        `Esta seguro de eliminar la plantilla ${template.name}`
      )
      .then((res) => {
        if (res.isConfirmed == true) {
          this.http.deleteHtmlTemplate(template._id).subscribe(
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
  openUpdateModal(template: any) {
    this.modalType = 2;
    this.template = template;
    this.aceEditor.session.setValue(template.html);
    this.aceEditorCss.session.setValue(template.css);
  }
  createTemplate() {
    this.template.html = this.aceEditor.getValue();
    this.template.css = this.aceEditorCss.getValue();
    this.http.postHtmlTemplate(this.template).subscribe(
      (res) => {
        this.alert
          .successAlert('Creado', 'La plantilla se ha creado exitosamente')
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
    this.template.html = this.aceEditor.getValue();
    this.template.css = this.aceEditorCss.getValue();
    this.http.updateHtmlTemplate(this.template).subscribe(
      (res) => {
        this.alert
          .successAlert(
            'Actualizado',
            'La plantilla se ha actualizado exitosamente'
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
}
