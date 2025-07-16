import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonChip }  from '@ionic/angular/standalone';


@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
  imports: [IonChip, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class ProductPage {
  constructor() {}
}
