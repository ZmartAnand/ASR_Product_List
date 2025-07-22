import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, ActionSheetController, IonToolbar, IonTitle, IonContent, IonSelect, IonSearchbar, IonSelectOption, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonChip, IonButton, IonButtons, IonText, IonItemDivider, IonList, IonRow, IonCol, IonIcon, IonCheckbox } from '@ionic/angular/standalone';
import { where } from 'firebase/firestore';
import { addIcons } from 'ionicons';
import { funnel, funnelOutline } from 'ionicons/icons';
import { DocMetaStatus } from 'src/core/enums';
import { FirebaseService } from 'src/services/firebase.service';


@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
  imports: [IonCheckbox, IonIcon, FormsModule, IonCol, CommonModule, IonRow, IonList, IonItemDivider, IonButtons, IonSelect, IonSelectOption, IonButton, IonChip, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class ProductPage {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  uniqueCategories: string[] = [];
  accordionOpen: boolean = false;
  listOpen: boolean = true;
  listSelectedProducts: string[] = [];

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
    if (this.listSelectedProducts?.length) {
      localStorage.setItem('SelectedProducts', JSON.stringify(this.listSelectedProducts))
    }
  }


  isChecked(product: any): boolean {
    return this.listSelectedProducts.some(item =>
      item === product.productName || item.startsWith(product.productName + ' ')
    );
  }

  onChange(event: any, product: any) {
    const isChecked = event.detail.checked;

    if (isChecked) {
      if (product.fileSize?.length && product.selectedSizes?.length) {
        product.selectedSizes.forEach((size: string) => {
          this.listSelectedProducts.push(`${product.productName} ${size}`);
        });
      } else {
        this.listSelectedProducts.push(product.productName);
      }
    } else {
      this.listSelectedProducts = this.listSelectedProducts.filter(item =>
        !(item === product.productName || item.includes(product.productName + ' '))
      );
    }
  }

  onSizeChange(product: any) {
    this.listSelectedProducts = this.listSelectedProducts.filter(item =>
      !(item === product.productName || item.startsWith(product.productName + ' '))
    );

    if (product.selectedSizes?.length) {
      product.selectedSizes.forEach((size: string) => {
        this.listSelectedProducts.push(`${product.productName} ${size}`);
      });
    }
  }
}
