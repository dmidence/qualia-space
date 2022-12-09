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
import * as ace from 'ace-builds';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('editor2') private editor2: ElementRef<HTMLElement>;
  @ViewChild('editor3') private editor3: ElementRef<HTMLElement>;

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

  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button

    ['link', 'image', 'video'] // link and image, video
  ];

  content = '';
  aceEditor: any;
  aceEditorCss: any;
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
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  openCreateModal() {
    this.modalType = 1;
    this.content = '';
  }

  openUpdateModal(template: any) {
    this.modalType = 2;
    this.template = { ...template };
    this.content = template.html;
  }

  openUpdateModal2(template: any) {
    this.modalType = 3;
    this.template = { ...template };
    this.aceEditor.session.setValue(template.html);
    this.aceEditorCss.session.setValue(template.css);
  }

  createTemplate() {
    this.template.html = this.content;
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
    if (this.modalType == 3) {
      this.template.html = this.aceEditor.getValue();
      this.template.css = this.aceEditorCss.getValue();
    } else {
      this.template.html = this.content;
    }
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
