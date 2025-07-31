import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  IonHeader, ActionSheetController, IonToolbar, IonTitle, IonContent,
  IonSelect, IonSearchbar, IonSelectOption, IonAccordionGroup, IonAccordion,
  IonItem, IonLabel, IonChip, IonButton, IonButtons, IonText, IonItemDivider,
  IonList, IonRow, IonCol, IonIcon, IonCheckbox, LoadingController
} from '@ionic/angular/standalone';

import { where } from 'firebase/firestore';
import { Base } from 'src/core/base';
import { DocMetaStatus } from 'src/core/enums';
import { FirebaseService } from 'src/services/firebase.service';
import { LoadingService } from 'src/services/loading.service';
import { ProductSelectionService } from 'src/services/product-selection.service';

export interface SelectedProduct {
  productName: string;
  size?: string;
  quantity?: number;
}

@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonCheckbox, IonIcon, IonCol, IonRow, IonList,
    IonItemDivider, IonSelect, IonSelectOption, IonButton,
    IonChip, IonLabel, IonItem, IonAccordion, IonAccordionGroup,
    IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent
  ]
})
export class ProductPage extends Base {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  uniqueCategories: string[] = [];
  accordionOpen: boolean = false;
  listOpen: boolean = true;
  listSelectedProducts: SelectedProduct[] = [];
  selectedsize: { [productName: string]: string[] } = {};
  isLoading = true;

  constructor(
    private router: Router,
    private firestoreService: FirebaseService,
    private actionSheetCtrl: ActionSheetController,
    private productSelectionService: ProductSelectionService,
    private loadingService: LoadingService
  ) {
    super()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const state = this.router.getCurrentNavigation()?.extras?.state;
        if (state?.['fromSave']) {
          this.listSelectedProducts = [];
          localStorage.removeItem('SelectedProducts');
          this.selectedsize = {}
        } else {
          const saved = JSON.parse(localStorage.getItem('SelectedProducts') || '[]');
          this.listSelectedProducts = saved;
          this.listSelectedProducts.forEach(product => {
            const selectedSizes = saved
              .filter((p: any) => p.productName === product.productName)
              .map((p: any) => p.size);
            this.selectedsize[product?.productName] = selectedSizes
          });
        }
        this.productSelectionService.updateCount()
      }
    });
  }

  async ngOnInit() {
    localStorage.removeItem('SelectedProducts');
    await this.loadingService.show()
    this.firestoreService.colOnQuery$('products', [
      where('_meta.status', '==', DocMetaStatus.Live)
    ]).subscribe((products: any[]) => {
      this.allProducts = products;
      this.filteredProducts = [...this.allProducts];
      this.updateUniqueCategories();
      this.loadingService.dismissAll()
      this.isLoading = false;
    })
  }

  onSearchChange(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
    this.filteredProducts = this.allProducts.filter(product =>
      product.productName?.toLowerCase().includes(searchTerm)
    );
    this.updateUniqueCategories();
  }

  updateUniqueCategories() {
    const categorySet: any = []

    this.filteredProducts.forEach((product: any) => {
      if (product?.category?.id && !categorySet.includes(product?.category?.id)) {
        categorySet.push(product?.category?.id)
      }
      this.uniqueCategories = categorySet;
    })
  }

  getProductsByCategory(categoryId: string): any[] | undefined {
    if (!this.filteredProducts) return undefined;
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
    this.loadNextPage();
    this.router.navigate(['/next-page']);
  }

  loadNextPage() {
    const savedData = JSON.parse(localStorage.getItem('SelectedProducts') || '[]');
    const merged = this.listSelectedProducts.map((p: SelectedProduct) => {
      const existing = savedData.find((s: SelectedProduct) =>
        s.productName === p.productName && s.size === p.size
      );
      return {
        productName: p.productName,
        size: p.size,
        quantity: existing?.quantity || 1
      };
    });
    localStorage.setItem('SelectedProducts', JSON.stringify(merged));
    this.productSelectionService.updateCount();
  }

  isChecked(product: any): boolean {
    if (product.fileSize?.length && this.selectedsize[product?.productName]?.length) {
      return this.selectedsize[product?.productName]?.every((size: string) =>
        this.listSelectedProducts.some(p =>
          p.productName === product.productName && p.size === size
        )
      );
    } else {
      return this.listSelectedProducts.some(p =>
        p.productName === product.productName && !p.size
      );
    }
  }

  onChange(event: any, product: any) {
    const isChecked = event?.detail?.checked;
    this.listSelectedProducts = this.listSelectedProducts.filter(p =>
      !(p.productName === product.productName)
    );
    if (isChecked) {
      if (product.fileSize?.length && this.selectedsize[product?.productName]?.length) {
        this.selectedsize[product?.productName].forEach((size: string) => {
          this.listSelectedProducts.push({ productName: product.productName, size });
        });
      } else {
        this.listSelectedProducts.push({ productName: product.productName });
      }
    } else {
      if (product.fileSize?.length) this.selectedsize[product?.productName] = [];
    }
    this.loadNextPage();
  }

  onSizeChange(product: any) {
    this.listSelectedProducts = this.listSelectedProducts.filter(p =>
      !(p.productName === product.productName)
    );
    if (this.selectedsize[product?.productName]?.length) {
      this.selectedsize[product?.productName].forEach((size: string) => {
        this.listSelectedProducts.push({ productName: product.productName, size });
      });
    }
    this.loadNextPage();
  }
}
