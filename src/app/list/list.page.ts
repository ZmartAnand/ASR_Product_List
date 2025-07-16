import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonItem, IonList, IonLabel, IonChip, IonInput } from '@ionic/angular/standalone';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
  imports: [IonInput, IonChip, IonLabel, IonList, IonItem, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent,CommonModule]
})
export class ListPage {

  constructor() {}
  // Items list with id, name, and edit state
  items = [
    { id: 1, name: 'Switch', isEditing: false },
    { id: 2, name: 'Fan', isEditing: false },
    { id: 3, name: 'Wire', isEditing: false },
    { id: 4, name: 'Tube-Light', isEditing: false },
    { id: 5, name: 'Switch Board', isEditing: false },
    { id: 6, name: 'Plug', isEditing: false },
  ];

  // Handle edit button click
  editItem(item: any) {
    item.isEditing = true;
  }

  // Save after editing (on blur or enter)
  saveItem(item: any, event: any) {
    const newName = event.target.value.trim();
    if (newName) {
      item.name = newName;
    }
    item.isEditing = false;
  }

  // Remove item
  deleteItem(itemId: number) {
    this.items = this.items.filter(item => item.id !== itemId);
  }
}


