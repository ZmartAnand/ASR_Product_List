import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ProductSelectionService } from 'src/services/product-selection.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [CommonModule,IonBadge, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  selectedCount = 0;

  constructor(private productSelectionService: ProductSelectionService) {
    this.productSelectionService.selectedCount$.subscribe(count => {
      this.selectedCount = count;
    });
  }
}
