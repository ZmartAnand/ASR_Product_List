import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, bag, cloudDownloadOutline, create,  eyeOutline, funnel, funnelOutline, list, pricetag, removeOutline, time, trashOutline } from 'ionicons/icons';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(){
    addIcons({funnel, funnelOutline,removeOutline, addOutline, trashOutline,list,pricetag,time,create,bag,eyeOutline,cloudDownloadOutline})
    this.setupUI();
  }

  async setupUI() {
  
    // Set transparent status bar
    await StatusBar.setBackgroundColor({ color: 'var(--ion-background-color)' }); 
    await StatusBar.setStyle({ style: Style.Dark }); 
  };
}
