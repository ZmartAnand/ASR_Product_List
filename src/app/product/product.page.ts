import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, ActionSheetController, IonToolbar, IonTitle, IonContent, IonSelect, IonSearchbar, IonSelectOption, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonChip, IonButton, IonButtons, IonText, IonItemDivider, IonList, IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';
import { where } from 'firebase/firestore';
import { addIcons } from 'ionicons';
import { funnel, funnelOutline } from 'ionicons/icons';
import { DocMetaStatus } from 'src/core/enums';
import { FirebaseService } from 'src/services/firebase.service';


@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
  imports: [IonIcon, IonCol, CommonModule, IonRow, IonList, IonItemDivider, IonButtons, IonSelect, IonSelectOption, IonButton, IonChip, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class ProductPage {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  uniqueCategories: string[] = [];
  accordionOpen: boolean = false;
  listOpen: boolean = true;

  constructor(private router: Router, private firestoreService: FirebaseService, private actionSheetCtrl: ActionSheetController) {
    addIcons({ funnel, funnelOutline })
  }

  ngOnInit() {
    this.firestoreService.colOnQuery$('products', [
      where('_meta.status', '==', DocMetaStatus.Live)
    ]).subscribe((products: any[]) => {
      this.allProducts = products;
      this.filteredProducts = [...this.allProducts];
      this.updateUniqueCategories();
    });
  }

  onSearchChange(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
    this.filteredProducts = this.allProducts.filter(product =>
      product.productName?.toLowerCase().includes(searchTerm)
    );
    this.updateUniqueCategories();
  }

  updateUniqueCategories() {
    const categorySet = new Set<string>();
    this.filteredProducts.forEach(p => {
      if (p.category?.id) {
        categorySet.add(p.category.id);
      }
    });
    this.uniqueCategories = Array.from(categorySet);
  }

  getProductsByCategory(categoryId: string): any[] {
    return this.filteredProducts.filter(p => p.category?.id === categoryId);
  }

  async presentViewOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select View Type',
      buttons: [
        {
          text: 'List View',
          handler: () => {
            this.listOpen = true;
            this.accordionOpen = false;
          }
        },
        {
          text: 'Accordion View',
          handler: () => {
            this.listOpen = false;
            this.accordionOpen = true;
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  goToNext() {
    this.router.navigate(['/next-page']);
  }
}
