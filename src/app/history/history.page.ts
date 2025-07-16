import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar } from '@ionic/angular/standalone';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonContent]
})
export class HistoryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
