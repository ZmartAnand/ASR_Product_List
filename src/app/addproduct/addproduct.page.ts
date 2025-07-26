import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonInput, IonButton, IonGrid, IonRow, IonCol, IonLabel, IonSelectOption, IonSelect, IonItem, IonIcon, IonText, IonList, IonSearchbar, IonAccordionGroup, IonAccordion,LoadingController } from '@ionic/angular/standalone';
import { where, orderBy } from 'firebase/firestore';
import { DocMetaStatus } from 'src/core/enums';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: 'addproduct.page.html',
  styleUrls: ['addproduct.page.scss'],
  imports: [IonAccordion, IonAccordionGroup, IonSearchbar, IonList, IonText, IonItem, IonLabel, IonCol, IonRow, IonGrid, IonButton, IonCard, IonContent, IonInput, CommonModule, FormsModule, IonToolbar, IonHeader, IonTitle, IonSelectOption, ReactiveFormsModule, IonSelect]
})
export class AddproductPage {
  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  productForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    categorySelect: new FormControl('', Validators.required)
  });

  sizeForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    search: new FormControl('')
  });

  categories: any = []
  allProducts: any = []
  filteredProducts: any = [];
  selectedProduct: any = null;
  loading: HTMLIonLoadingElement | null = null;

  constructor(private firestoreService: FirebaseService, private destroyRef: DestroyRef,private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    await this.presentLoading();
    combineLatest([
      this.firestoreService.colOnQuery$('categories', [where('_meta.status', '==', DocMetaStatus.Live), orderBy('_meta.createdAt', 'desc')]),
      this.firestoreService.colOnQuery$('products', [where('_meta.status', '==', DocMetaStatus.Live), orderBy('_meta.createdAt', 'desc')])
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
      map(([categories, products]: any) => {
        this.categories = categories;
        this.allProducts = products;
        this.filteredProducts = [...this.allProducts];
        this.dismissLoading(); 
      })
    ).subscribe();


    this.sizeForm.get('search')?.valueChanges.subscribe((term: any) => {
      this.filterSizes(term);
    },
    (err: Error) => {
      console.error('Error loading products:', err);
      this.dismissLoading();
    });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading products...',
      spinner: 'lines-sharp',
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }


  async saveCategoryName() {
    if (this.categoryForm.valid) {
      await this.firestoreService.set(`categories/${this.categoryForm?.value?.name}`, {
        name: this.categoryForm?.value?.name
      })
      this.categoryForm.reset();
    }
  }

  async saveProductName() {
    if (this.productForm.valid) {
      const data: any = this.productForm.value;
      await this.firestoreService.add(`products`, {
        productName: data.productName,
        category: await this.firestoreService.getDocRef(`categories/${data?.categorySelect?._meta?.id}`),
        fileSize: []
      })
      this.productForm.reset();
    }
  }

  saveSize() {
    if (this.sizeForm.valid) {
      const data = this.sizeForm.value;
      this.firestoreService.update(`products/${this.selectedProduct?._meta?.id}`, {
        fileSize: this.firestoreService.arrayUnion([data?.size])
      })
      this.sizeForm.reset();
      this.selectedProduct = null;
    }
  }

  filterSizes(query: string) {
    if (!query) {
      return this.filteredProducts
    }
    this.filteredProducts = this.allProducts.filter((product: any) => {
      return product?.productName.toLowerCase().includes(query.toLowerCase());
    })
  }

  selectProduct(product: any) {
    this.selectedProduct = product;
    this.sizeForm.patchValue({ productName: this.selectedProduct?.productName });
  }
}