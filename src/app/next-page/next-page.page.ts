import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.page.html',
  styleUrls: ['./next-page.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NextPagePage implements OnInit {

  constructor() { }


  ngOnInit() {
  }

}
