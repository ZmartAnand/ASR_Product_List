import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,  IonInput, IonButton, IonText, IonGrid, IonRow, IonCol, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/angular/standalone';



@Component({
  selector: 'app-addproduct',
  templateUrl: 'addproduct.page.html',
  styleUrls: ['addproduct.page.scss'],
  imports: [IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonCol, IonRow, IonGrid, IonButton, IonInput, IonCardContent, IonCard, IonContent, CommonModule, FormsModule, IonText, IonToolbar, IonHeader, IonTitle]
})
export class AddproductPage {
  constructor() {}
  productName: string = '';
  productSize: string = '';

  saveProduct(form: any) {
    console.log('Product Name:', this.productName);
    console.log('Product Size:', this.productSize);
  
    // Clear values
    this.productName = '';
    this.productSize = '';
  
    form.resetForm();
  }
}
