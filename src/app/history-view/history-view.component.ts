import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonTitle, IonBackButton, IonToolbar, IonHeader, IonContent, IonSearchbar, IonItemDivider, IonLabel, IonList, IonItem, IonButton, IonIcon, IonButtons } from "@ionic/angular/standalone";
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss'],
  imports: [IonItem, IonList, IonLabel, IonItemDivider, IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton]
})
export class HistoryViewComponent implements OnInit {
  history: any = []
  filteredHistory: any = []

  constructor(private route: ActivatedRoute, private firestoreService: FirebaseService) { }

  async ngOnInit() {
    this.history = await this.firestoreService.getDocData(`history/${this.route.snapshot.params['id']}`)
    this.filteredHistory = this.history
  }


  searchTerm(event: any) {
    const query = event.target.value?.toLowerCase();
    if (!query) {
      this.filteredHistory = this.history;
      return;
    }
    const filteredProducts = this.history?.saveProducts?.filter((product: any) => {
      return product?.productName?.toLowerCase().includes(query);
    });
    this.filteredHistory = {
      ...this.history,
      saveProducts: filteredProducts
    };
  }

}
