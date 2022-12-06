import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit, OnDestroy {
  store: any;

  storeTemplates = [
    { id: 1, name: 'Nombre 1', type: 'type 1', html: ' html 1', css: 'css 1' },
    { id: 2, name: 'Nombre 2', type: 'type 2', html: ' html 2', css: 'css 2' },
    { id: 3, name: 'Nombre 3', type: 'type 3', html: ' html 3', css: 'css 3' },
    { id: 4, name: 'Nombre 4', type: 'type 4', html: ' html 4', css: 'css 4' },
  ];

  modalType = 1;

  editor: Editor = new Editor();
  html: string = '';

  constructor() {
    this.store = JSON.parse(localStorage.getItem('currentStore') || '');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  openCreateModal() {
    this.modalType = 1;
  }

  createTemplate() {
    console.log(this.editor);
    console.log(this.html);
  }
}
