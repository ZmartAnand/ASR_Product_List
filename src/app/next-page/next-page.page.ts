import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, AlertController, IonTitle, IonToolbar, IonSearchbar, IonItemDivider, IonLabel, IonItem, IonList, IonButton, IonBackButton, IonIcon, IonFooter, IonButtons, IonNote } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/services/firebase.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { PdfService } from 'src/services/pdfService';
import { LoadingService } from 'src/services/loading.service';
import { Base } from 'src/core/base';

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.page.html',
  styleUrls: ['./next-page.page.scss'],
  standalone: true,
  imports: [IonButtons, IonFooter, IonIcon, IonButton, RouterLink, IonList, IonItem, IonLabel, IonItemDivider, IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton]
})
export class NextPagePage extends Base {
  products: any[] = [];
  filteredProducts: any = []
  quantity: number = 1;

  constructor(
    private firestoreService: FirebaseService,
    private pdfService: PdfService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingService: LoadingService
  ) {
    super()
  }

  ngOnInit() {
    this.loadProducts();
  }

  searchTerm(event: any) {
    const query = event.target.value?.toLowerCase();
    if (!query) {
      this.filteredProducts = this.products;
      return;
    }
    this.filteredProducts = this.products.filter((product: any) => {
      return product?.productName?.toLowerCase().includes(query)
    })
  }

  loadProducts() {
    this.products = JSON.parse(localStorage.getItem('SelectedProducts') || '[]');
    this.filteredProducts = this.products
  }

  increaseQuantity(product: any) {
    product.quantity++;
    this.updateLocalStorage();
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.updateLocalStorage();
    }
  }

  updateLocalStorage() {
    localStorage.setItem('SelectedProducts', JSON.stringify(this.products));
    this.loadProducts();
  }

  removeProduct(product: any) {
    this.products = this.products.filter(
      (p: any) => !(p.productName === product.productName && p.size === product.size)
    );
    this.updateLocalStorage();
  }

  async saveProducts(value: any) {
    await this.loadingService.show()
    try {
      if (this.current?.history?._meta?.id) {
        await this.firestoreService.update(`history/${this.current?.history?._meta?.id}`, {
          name: value,
          saveProducts: this.products
        })
        this.current.history = null
      } else {
        await this.firestoreService.add('history', {
          name: value,
          saveProducts: this.products
        })
      }
      await this.pdfService.exportToPDF(this.products, value);
      localStorage.removeItem('SelectedProducts');
      this.products = [];
    } catch (error) {
      console.error('Error saving products:', error);
      await this.showToast('Error saving products or generating PDF', 'danger');
    } finally {
      this.loadingService.dismissAll();
      await this.showToast('Products saved and PDF generated successfully!', 'primary');
      this.router.navigate(['/'], { state: { fromSave: true } });
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    await toast.present();
  }

  async getPdfNameAlert() {
    const alert = await this.alertController.create({
      header: 'Save PDF',
      inputs: [
        {
          type: 'text',
          placeholder: 'Enter PDF name...',
          name: 'pdfName',
          value: ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',

        },
        {
          text: 'Save',
          handler: (data) => {
            const pdfName = data.pdfName || 'document';
            this.saveProducts(pdfName);
          }
        }
      ]
    });
    await alert.present();
  }
}