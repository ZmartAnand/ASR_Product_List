import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, AlertController, IonTitle, IonToolbar, IonSearchbar, IonItemDivider, IonLabel, IonItem, IonList, IonButton, IonBackButton, IonIcon, IonFooter, IonButtons } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/services/firebase.service';
// import { PdfService } from 'src/services/pdf.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { PdfService } from 'src/services/pdfService';
import { addIcons } from 'ionicons';
import { addOutline, removeOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.page.html',
  styleUrls: ['./next-page.page.scss'],
  standalone: true,
  imports: [IonButtons, IonFooter, IonIcon, IonButton, RouterLink, IonList, IonItem, IonLabel, IonItemDivider, IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton]
})
export class NextPagePage implements OnInit {
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
    private route: ActivatedRoute
  ) {
    addIcons({ removeOutline, addOutline, trashOutline });
  }

  async ngOnInit() {
    await this.loadProducts();
  }

  searchItem(event: any) {
    const query = event.target.value?.toLowerCase();
    if (!query) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter((product: any) =>
      product?.toLowerCase().includes(query.toLowerCase())
    );
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
    const loading = await this.loadingController.create({
      message: 'Saving products and generating PDF...'
    });
    await loading.present();

    try {
      await this.firestoreService.add('history', {
        name: value,
        saveProducts: this.products
      })
      await this.pdfService.generateProductListPDFWithJsPDF(this.products, value);
      localStorage.removeItem('SelectedProducts');
      this.products = [];
      this.router.navigate(['/parent'], { state: { fromSave: true } });
      await this.showToast('Products saved and PDF generated successfully!', 'primary');
    } catch (error) {
      console.error('Error saving products:', error);
      await this.showToast('Error saving products or generating PDF', 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  async generateSimplePDF() {
    if (!this.products?.length) {
      await this.showToast('No products to save', 'warning');
      return;
    }

    try {
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>ASR-Works - Product List</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 40px; 
                line-height: 1.6;
              }
              .header { 
                text-align: center; 
                color: #333; 
                margin-bottom: 10px;
                font-size: 24px;
                font-weight: bold;
              }
              .date { 
                text-align: center; 
                margin-bottom: 30px; 
                color: #666; 
                font-size: 14px;
              }
              .product { 
                margin: 12px 0; 
                padding: 10px; 
                border-bottom: 1px solid #eee; 
                font-size: 16px;
              }
              .product-number { 
                font-weight: bold; 
                color: #007bff; 
                margin-right: 8px;
              }
              @media print {
                body { margin: 20px; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">ASR-Works - Product List</div>
            <div class="date">Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
            <div class="products">
              ${this.products.map((product: string, index: number) =>
        `<div class="product">
                  <span class="product-number">${index + 1}.</span>${product}
                </div>`
      ).join('')}
            </div>
            <div class="no-print" style="margin-top: 30px; text-align: center;">
              <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Print / Save as PDF
              </button>
              <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">
                Close
              </button>
            </div>
          </body>
        </html>
      `;

      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(printContent);
        newWindow.document.close();

        newWindow.focus();

        setTimeout(() => {
          newWindow.print();
        }, 1000);
      }

      await this.showToast('Print window opened', 'success');
    } catch (error) {
      console.error('Error generating simple PDF:', error);
      await this.showToast('Error opening print window', 'danger');
    }
  }

  private async showToast(message: string, color: string) {
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

}