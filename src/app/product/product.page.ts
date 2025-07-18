import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonChip, IonButton, IonButtons }  from '@ionic/angular/standalone';


@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
  imports: [IonButtons, IonButton, IonChip, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class ProductPage {
  
  constructor(private router: Router) {}
  goToNext() {
    this.router.navigate(['/next-page']);
  }
}
