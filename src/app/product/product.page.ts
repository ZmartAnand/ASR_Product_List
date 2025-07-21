import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonChip, IonButton, IonButtons, IonText } from '@ionic/angular/standalone';
import { where } from 'firebase/firestore';
import { DocMetaStatus } from 'src/core/enums';
import { FirebaseService } from 'src/services/firebase.service';


@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
  imports: [IonButtons, IonButton, IonChip, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class ProductPage {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  uniqueCategories: string[] = [];

  constructor(private router: Router, private firestoreService: FirebaseService) { }

  ngOnInit() {
    this.firestoreService.colOnQuery$('products', [
      where('_meta.status', '==', DocMetaStatus.Live)
    ]).subscribe((products: any[]) => {
      this.allProducts = products;
      this.filteredProducts = [...this.allProducts];

      const categorySet = new Set<string>();
      this.filteredProducts.forEach(p => {
        if (p.category?.id) {
          categorySet.add(p.category.id);
        }
      });
      this.uniqueCategories = Array.from(categorySet);
    });
  }

  getProductsByCategory(categoryId: string): any[] {
    return this.filteredProducts.filter(p => p.category?.id === categoryId);
  }


  goToNext() {
    this.router.navigate(['/next-page']);
  }
}
