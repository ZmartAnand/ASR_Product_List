import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/services/firebase.service';
import { IonHeader, IonLabel, IonList, IonItem, IonContent, IonItemDivider, IonTitle, IonBackButton, IonToolbar, IonSearchbar, IonButton } from "@ionic/angular/standalone";
import { Base } from 'src/core/base';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss'],
  imports: [IonButton, IonSearchbar, IonToolbar, IonBackButton, IonTitle, IonItemDivider, IonContent, IonItem, IonList, IonLabel, IonHeader,]
})
export class ViewHistoryComponent extends Base {

  history: any = []
  filteredHistory: any = []

  constructor(private route: ActivatedRoute, private firestoreService: FirebaseService, private router:Router, private loadingService:LoadingService) { 
    super()
  }

  async ngOnInit() {
    await this.loadingService.show()
    this.history = await this.firestoreService.getDocData(`history/${this.route.snapshot.params['id']}`)
    this.filteredHistory = this.history
    this.loadingService.dismissAll()
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

  updateProducts() {
    localStorage.setItem('SelectedProducts',JSON.stringify(this.history?.saveProducts))
    this.current.history = this.filteredHistory
    this.router.navigate(['/'])
  }

}
