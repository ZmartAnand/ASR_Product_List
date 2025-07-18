import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonInput, IonButton, IonGrid, IonRow, IonCol, IonLabel, IonSelectOption, IonSelect, IonItem, IonIcon, IonText, IonCardSubtitle, IonCardTitle, IonCardHeader, IonList, IonSearchbar, IonAccordionGroup, IonAccordion } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';




@Component({
  selector: 'app-addproduct',
  templateUrl: 'addproduct.page.html',
  styleUrls: ['addproduct.page.scss'],
  imports: [IonAccordion, IonAccordionGroup, IonSearchbar, IonList, IonText, IonItem, IonLabel, IonCol, IonRow, IonGrid, IonButton, IonCard, IonContent, IonInput, CommonModule, FormsModule, IonToolbar, IonHeader, IonTitle, IonSelectOption, ReactiveFormsModule, IonSelect]
})
export class AddproductPage {

  nameForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  categoryForm = new FormGroup({
    product: new FormControl('', Validators.required),
    categoryNote: new FormControl('', Validators.required)
  });

  sizeForm = new FormGroup({
    size: new FormControl('', Validators.required),
    search: new FormControl('')
  });

  productOptions = [
    'Switch', 'Wood Board', 'Lights', 'Wire', 'Board Sheets',
    'Trip', 'Fan', 'Bulb', 'AC', 'MCB', 'Socket', 'Plug', 'Fuse',
    'Conduit', 'Junction Box', 'Panel', 'Cover Plate', 'Clamp', 'Channel', 'Insulation Tape'
  ];

  allSizes = ['Small', 'Medium', 'Large', 'XL', 'XXL', '10x10', '12x12', '15x15', '20x20', '25x25'];
  filteredSizes = [...this.allSizes];

  ngOnInit() {
    this.sizeForm.get('search')?.valueChanges.subscribe((term: any) => {
      this.filterSizes(term);
    });
  }

  saveName() {
    if (this.nameForm.valid) {
      console.log('Product Name:', this.nameForm.value);
      this.nameForm.reset();
    }
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      console.log('Product Category:', this.categoryForm.value);
      this.categoryForm.reset();
    }
  }

  saveSize() {
    if (this.sizeForm.valid) {
      console.log('Product Size:', this.sizeForm.value);
      this.sizeForm.reset();
    }
  }

  filterSizes(term: string) {
    term = term.toLowerCase();
    this.filteredSizes = this.allSizes.filter(size =>
      size.toLowerCase().includes(term)
    );
  }
}