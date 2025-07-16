import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonInput, IonButton, IonGrid, IonRow, IonCol, IonLabel, IonSelectOption,IonSelect, IonItem, IonIcon, IonText, IonCardSubtitle, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';




@Component({
  selector: 'app-addproduct',
  templateUrl: 'addproduct.page.html',
  styleUrls: ['addproduct.page.scss'],
  imports: [IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonItem, IonLabel, IonCol, IonRow, IonGrid, IonButton, IonCardContent, IonCard, IonContent, IonInput, CommonModule, FormsModule, IonToolbar, IonHeader, IonTitle, IonSelectOption, ReactiveFormsModule, IonSelect]
})
export class AddproductPage {
  
  productForm = new FormGroup({
    name: new FormControl(''),
    product: new FormControl(''),
    size: new FormControl('')
  });

  saveProduct() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productForm.reset(); 
    }
  }
}
