import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonLabel, IonItem, IonButton, IonIcon, IonItemDivider, IonBackButton } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/services/firebase.service';
import { orderBy, where } from 'firebase/firestore';
import { DocMetaStatus } from 'src/core/enums';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PdfService } from 'src/services/pdfService';
import { LoadingController, AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonItemDivider, IonIcon, IonButton, IonItem, IonLabel, IonList, IonSearchbar, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonContent]
})
export class HistoryPage implements OnInit {
  histories: any[] = [];
  filterHistories: any[] = [];
  isLoading = false;

  constructor(private firestoreService: FirebaseService, private destroyRef: DestroyRef, private pdfService: PdfService, private loadingService: LoadingService, private router: Router, private alertController: AlertController,) { }


  async ngOnInit() {
    await this.loadingService.show()
    this.isLoading = true;
    this.firestoreService.colOnQuery$('history', [where('_meta.status', '==', DocMetaStatus.Live), orderBy('_meta.createdAt', 'desc')]).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((histories: any) => {
        this.histories = histories;
        this.filterHistories = this.histories;
        this.loadingService.dismissAll()
        this.isLoading = false;
      })
    ).subscribe();
  }
  async alertDeleteProduct(history: any) {
    const alert = await this.alertController.create({
      header: 'Delete Confirmation',
      message: `Are you sure you want to delete the history "${history?.name}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'

        },
        {
          text: 'Delete',
          handler: () => {
            this.confirmationDelete(history);
          }
        }
      ]
    });
    await alert.present();
  }
  async confirmationDelete(history: any) {
    await this.loadingService.show()
    await this.firestoreService.delete(`history/${history?._meta?.id}`);
    this.loadingService.dismissAll()

  }



  searchTerm(event: any) {
    const query = event.target.value?.toLowerCase();
    if (!query) {
      this.filterHistories = this.histories;
      return;
    }
    this.filterHistories = this.histories.filter((history: any) => {
      return history?.name?.toLowerCase().includes(query)
    })
  }

  previewPDF(history: any) {
    this.router.navigate([`view-history/${history._meta?.id}`])
  }
}
