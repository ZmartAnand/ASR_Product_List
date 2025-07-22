import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonLabel, IonItem, IonButton, IonIcon } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/services/firebase.service';
import { orderBy, where } from 'firebase/firestore';
import { DocMetaStatus } from 'src/core/enums';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PdfService } from 'src/services/pdfService';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [ IonButton, IonItem, IonLabel, IonList, IonSearchbar, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonContent]
})
export class HistoryPage implements OnInit {
  history: any[] = [];

  constructor(private firestoreService: FirebaseService, private destroyRef: DestroyRef, private pdfService: PdfService) { }

  ngOnInit() {
    this.firestoreService.colOnQuery$('history', [where('_meta.status', '==', DocMetaStatus.Live), orderBy('_meta.createdAt', 'desc')]).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((history: any) => {
        this.history = history
      })
    ).subscribe();
  }

  previewPDF(history: any) {
    this.pdfService.generateProductListPDFWithJsPDF(history.saveProducts, history?.name || 'ASR-Works-Products');
  }

}
