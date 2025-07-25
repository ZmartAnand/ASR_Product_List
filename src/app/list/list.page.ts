import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar,
  IonItem, IonList, IonLabel, IonChip, IonInput,
  IonButton, IonButtons, IonIcon, AlertController, IonItemDivider } from '@ionic/angular/standalone';
import { orderBy, where } from 'firebase/firestore';
import { addIcons } from 'ionicons';
import { bookmark, createOutline, trashOutline } from 'ionicons/icons';
import { DocMetaStatus } from 'src/core/enums';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
  standalone: true,
  imports: [IonItemDivider, 
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonItem, IonList, IonLabel,
    IonInput, IonButtons, IonButton, IonIcon
  ]
})
export class ListPage {
  allProducts: any = [];
  filteredProducts: any[] = [];
  isEditing: { [key: string]: boolean } = {};
  inputValues: { [key: string]: string } = {};
  editedOldSize: string = '';



  constructor(
    private firestoreService: FirebaseService,
    private destroyRef: DestroyRef,
    private alertController: AlertController
  ) {
    addIcons({ trashOutline, createOutline, bookmark });
  }

  // ngOnInit() {
  //   this.firestoreService.colOnQuery$('products', [
  //     where('_meta.status', '==', DocMetaStatus.Live),
  //     orderBy('_meta.createdAt', 'desc')
  //   ]).subscribe((products: any[]) => {
  //     this.allProducts = products;
  //     this.filteredProducts = [...this.allProducts];
  //   });
  // }
  ngOnInit() {
    this.firestoreService.colOnQuery$('products', [
      where('_meta.status', '==', DocMetaStatus.Live), orderBy('_meta.createdAt', 'desc')
    ]).subscribe((products: any[]) => {
      this.allProducts = products;
      this.filteredProducts = [...this.allProducts]; // IMPORTANT: initialize filteredProducts here
    });
  }

  async toggleEdit(product: any, size: any) {
    const key = product?.productName + size
    console.log('key--', key)
    this.isEditing[key] = true;
    const inputs = [
      {
        name: 'productName',
        type: 'text' as const,
        placeholder: 'Enter product name',
        value: product.productName
      }
    ];

    if (size) {
      this.editedOldSize = size;
      inputs.push({
        name: 'productSize',
        type: 'text',
        placeholder: 'Enter size',
        value: size
      });
    }

    const alert = await this.alertController.create({
      header: 'Edit Product',
      inputs: inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.isEditing[key] = false;
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            const newName = data.productName;
            const newSize = data.productSize || '';
            this.saveProduct(product, newName, newSize);
          }
        }
      ]
    });

    await alert.present();
  }

  saveProduct(product: any, newName: any, newSize: any) {

    const updatePayload: any = {
      productName: newName
    };

    if (product?.fileSize?.length && (this.editedOldSize || newSize === '')) {
      const indexToReplaceSize = product.fileSize.findIndex((i: any) => i === this.editedOldSize);

      if (indexToReplaceSize !== -1) {
        if (!newSize || newSize.trim() === '') {
          product.fileSize.splice(indexToReplaceSize, 1);
        } else {
          product.fileSize[indexToReplaceSize] = newSize;
        }
        updatePayload.fileSize = [...product.fileSize];
      }
    }
    this.firestoreService.update(`products/${product?._meta?.id}`, updatePayload);
    const key = newName + newSize;
    this.isEditing[key] = false;
    this.editedOldSize = '';
  }


  async alertDeleteProduct(product: any, size?: string) {
    const alert = await this.alertController.create({
      header: 'Delete Confirmation',
      message: size
        ? `Are you sure you want to delete the size "${size}" from product "${product.productName}"?`
        : `Are you sure you want to delete the entire product "${product.productName}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.confirmationDelete(product, size);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmationDelete(product: any, size?: string) {
    if (size && product?.fileSize?.length) {
      const index = product.fileSize.findIndex((s: string) => s === size);

      if (index !== -1) {
        product.fileSize.splice(index, 1);

        const updatePayload: any = {
          fileSize: [...product.fileSize]
        };
        if (updatePayload.fileSize.length === 0) {
          this.firestoreService.delete(`products/${product._meta.id}`);
        } else {
          this.firestoreService.update(`products/${product._meta.id}`, updatePayload);
        }
      }
    } else {
      this.firestoreService.delete(`products/${product._meta.id}`);
    }
  }
  searchTerm(event: any) {
    const query = event.target.value?.toLowerCase() || '';

    if (!query) {
      this.filteredProducts = this.allProducts
      return;
    }
    this.filteredProducts = this.allProducts.filter((product: any) => {
      return product?.productName?.toLowerCase().includes(query)
    })
  }

}

