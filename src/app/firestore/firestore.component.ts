import { Component, OnInit } from '@angular/core';
import { IonList, IonItem, IonLabel, IonButton } from "@ionic/angular/standalone";
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-firestore',
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonButton],
  templateUrl: './firestore.component.html',
  styleUrls: ['./firestore.component.scss'],
})
export class FirestoreComponent implements OnInit {

  constructor(private firestore: FirebaseService) { }

  ngOnInit() { }

  addListProduct() {
    const listProducts = [
      // -- Switch --
      { "name": "Switch - 5A" },
      { "name": "Switch - 15A" },
      { "name": "Switch - 20A" },
      { "name": "Switch - 2Way" },
      { "name": "Switch Dummy" },
      { "name": "Switch Bell" },
      { "name": "DP Switch - 32A" },
      { "name": "Indicator" },
      { "name": "USB Socket" },
      { "name": "Socket - 2pin" },
      { "name": "Socket - 16A" },
      { "name": "Socket - 5A" },
      { "name": "Fan Dimmer" },
      { "name": "Fuse carrier - 16/415A" },
      { "name": "Fuse carrier - 32/415A" },
      { "name": "Tape Roll" },

      // -- Wall Fitting --
      { "name": "Ceiling Rose" },
      { "name": "Angle Holder" },
      { "name": "Batten Holder" },
      { "name": "Pendent Holder" },
      { "name": "2 Pin Top" },
      { "name": "3 Pin Top" },
      { "name": "Round Sheet" },
      { "name": "Round Sheet Dummy" },
      { "name": "Fan Round Sheet" },
      { "name": "Calling Bell" },

      // -- Board --
      { "name": "Wood Board - 15*4" },
      { "name": "Wood Board - 12*6" },
      { "name": "Wood Board - 12*4" },
      { "name": "Wood Board - 10*6" },
      { "name": "Wood Board - 10*4" },
      { "name": "Wood Board - 8*6" },
      { "name": "Wood Board - 8*4" },
      { "name": "Wood Board - 6*4" },
      { "name": "Wood Board - 4*4" },
      { "name": "Metal Box - 2M" },
      { "name": "Metal Box - 3M" },
      { "name": "Metal Box - 4M" },
      { "name": "Metal Box - 6M" },
      { "name": "Metal Box - 8M" },
      { "name": "Metal Box - 10M" },
      { "name": "Metal Box - 12M" },
      { "name": "Metal Box - 16M" },
      { "name": "Meter Board - 12*9" },
      { "name": "Meter Board - 15*12" },
      { "name": "Meter Board - 24*18" },
      { "name": "T Bolt" },
      { "name": "Earth Link - Copper" },
      { "name": "Stay Clamp - 3/4\"" },
      { "name": "Stay Clamp - 1\"" },
      { "name": "Service Pipe -3/4\"" },
      { "name": "Service Pipe - 1\"" },

      // -- Board Sheets --
      { "name": "Wood Model Sheet - 12*4" },
      { "name": "Wood Model Sheet - 10*6" },
      { "name": "Wood Model Sheet - 10*4" },
      { "name": "Wood Model Sheet - 8*4" },
      { "name": "Wood Model Sheet - 6*4" },
      { "name": "Wood Model Sheet - 4*4" },
      { "name": "Metal Box Sheet - 2M" },
      { "name": "Metal Box Sheet - 3M" },
      { "name": "Metal Box Sheet - 4M" },
      { "name": "Metal Box Sheet - 6M" },
      { "name": "Metal Box Sheet - 8M" },
      { "name": "Metal Box Sheet - 12M" },
      { "name": "Metal Box Sheet - 16M" },

      // -- Pipes Fitting --
      { "name": "Junction Box - 1W" },
      { "name": "Junction Box - 2W" },
      { "name": "Junction Box - 3W" },
      { "name": "Junction Box - 4W" },
      { "name": "Depth Box - 3/4\"" },
      { "name": "Depth Box - 1\"" },
      { "name": "Bend - 3/4\"" },
      { "name": "Bend - 1\"" },
      { "name": "pipe 3/4 - 2MM" },
      { "name": "pipe 3/4 - 1.5MM" },
      { "name": "Pipe 1\" - 2MM" },
      { "name": "Pipe 1\" - 1.5MM" },
      { "name": "Fan Box - Metal" },
      { "name": "Fan Box - PVC" },
      { "name": "Spot Light Box" },

      // -- Trip --
      { "name": "MCB - 10A" },
      { "name": "MCB - 16A" },
      { "name": "MCB - 20A" },
      { "name": "MCB Two pol- 32A" },
      { "name": "MCB Two pol- 40A" },
      { "name": "MCB Box - 2Pol" },
      { "name": "MCB Box - 3Pol" },
      { "name": "MCB Box - 4Pol" },
      { "name": "ELCB - 10A" },
      { "name": "ELCB - 16A" },
      { "name": "ELCB - 20A" },
      { "name": "ELCB Two pol - 32A" },
      { "name": "ELCB Two pol - 40A" },
      { "name": "Isolator Two Pol - 32A" },
      { "name": "Isolator Two Pol - 40A" },
      { "name": "Isolator Four Pol - 32A" },
      { "name": "Isolator Four Pol - 40A" },
      { "name": "RCCB Two Pol - 32A" },
      { "name": "RCCB Two Pol - 40A" },
      { "name": "Panel Box - 6M" },
      { "name": "Panel Box - 8M" },
      { "name": "Panel Box - 12M" },
      { "name": "3 Phase Panel Board - 16M" },
      { "name": "3 Phase Panel Board - 18M" },
      { "name": "Rotary Switch - 63A" },

      // -- Lights --
      { "name": "Tube Light LED" },
      { "name": "LED Bulb - 9W" },
      { "name": "LED Bulb - 12W" },
      { "name": "LED Bulb - 23W" },
      { "name": "LED Bulkhead - 12W" },
      { "name": "LED Bulkhead - 18W" },
      { "name": "LED Bulkhead - 20W" },
      { "name": "LED Bulkhead - 23W" },
      { "name": "Spot light - W" },
      { "name": "Spot light - WW" },
      { "name": "Spot light - MC" },
      { "name": "Spot light - B" },
      { "name": "Spot light - G" },
      { "name": "Spot light - P" },
      { "name": "Stair Light" },
      { "name": "Slip Light - W" },
      { "name": "Slip Light - WW" },
      { "name": "Slip Light - MC" },
      { "name": "Slip Light - B" },
      { "name": "Slip Light - G" },
      { "name": "Slip Light - v" },
      { "name": "Foot lamb Light - 4 Model" },
      { "name": "Foot lamb Light - 3Model" },
      { "name": "Gate Light" },
      { "name": "Depth Box Light - W" },
      { "name": "Depth Box Light - WW" },
      { "name": "Depth Box Light - MC" },
      { "name": "Depth Box Light - B" },
      { "name": "Depth Box Light - G" },
      { "name": "Depth Box Light - P" },

      // -- Wire --
      { "name": "Wire - 1 QMM" },
      { "name": "Wire - 1.5-QMM" },
      { "name": "Wire - 2.5-QMM" },
      { "name": "Wire - 4-QMM" },
      { "name": "Speaker Wire" },
      { "name": "CTS Wire - 3/20" },
      { "name": "CTS Wire - 7/20" },
      { "name": "Reel - 2P" },
      { "name": "Reel - 4P" },
      { "name": "Green Wire - 1/2Kg" },
      { "name": "Green Wire - 1kg" },
      { "name": "Green Wire - 2kg" },

      // -- Sintex Tank --
      { "name": "Tank - 500L - 3L" },
      { "name": "Tank - 500L - 4L" },
      { "name": "Tank - 750L - 3L" },
      { "name": "Tank - 750L - 4L" },
      { "name": "Tank - 1000L - 3L" },
      { "name": "Tank - 1000L - 4L" },

      // -- Valve --
      { "name": "Ball Valve Brass - 1/2\"" },
      { "name": "Ball Valve Brass - 3/4\"" },
      { "name": "Ball Valve Brass - 1\"" },
      { "name": "Ball Valve Brass - 1/4\"" },
      { "name": "Ball Valve Brass - 1/2\"" },
      { "name": "Angle Valve" },
      { "name": "NRV Valve - 3/4\"" },
      { "name": "NRV Valve - 1\"" },
      { "name": "NRV Valve - 1/4\"" },
      { "name": "NRV Valve - 1/2\"" },
      { "name": "NRV Valve - 2\"" },

      // -- Tap --
      { "name": "CP Tap" },
      { "name": "PVC Tap" },
      { "name": "Kitchen Tap" },
      { "name": "Wash basin Tap" },
      { "name": "Washing Machine Tap" },

      // -- Solvent --
      { "name": "Solvent - 50ML" },
      { "name": "Solvent - 100ML" },
      { "name": "Solvent CPVC - 50ML" },
      { "name": "Solvent CPVC - 100ML" },
      { "name": "Pull Tag" },

      // -- UPVC --
      { "name": "Tank Connector UPVC - 3/4\"" },
      { "name": "Tank Connector UPVC - 1\"" },
      { "name": "Tank Connector UPVC - 1-1/4\"" },
      { "name": "Tee UPVC - 1/2\"" },
      { "name": "Tee UPVC - 3/4\"" },
      { "name": "Tee UPVC - 1\"" },
      { "name": "Tee UPVC - 1-1/4\"" },
      { "name": "Tee UPVC - 1-1/2\"" },
      { "name": "Coupler UPVC - 1/2\"" },
      { "name": "Coupler UPVC - 3/4\"" },
      { "name": "Coupler UPVC - 1\"" },
      { "name": "Coupler UPVC - 1-1/4\"" },
      { "name": "Coupler UPVC - 1-1/2\"" },
      { "name": "Elbow UPVC - 1/2\"" },
      { "name": "Elbow UPVC - 3/4\"" },
      { "name": "Elbow UPVC - 1\"" },
      { "name": "Elbow UPVC - 1-1/4\"" },
      { "name": "Elbow UPVC - 1-1/2\"" },
      { "name": "MTA UPVC - 1/2\"" },
      { "name": "MTA UPVC - 3/4\"" },
      { "name": "MTA UPVC - 1\"" },
      { "name": "MTA UPVC - 1-1/4\"" },
      { "name": "MTA UPVC - 1-1/2\"" },
      { "name": "FTA UPVC - 1/2\"" },
      { "name": "FTA UPVC - 3/4\"" },
      { "name": "FTA UPVC - 1\"" },
      { "name": "FTA UPVC - 1-1/4\"" },
      { "name": "FTA UPVC - 1-1/2\"" },
      { "name": "Union UPVC - 1/2\"" },
      { "name": "Union UPVC - 3/4\"" },
      { "name": "Union UPVC - 1\"" },
      { "name": "Union UPVC - 1-1/4\"" },
      { "name": "Union UPVC - 1-1/2\"" },
      { "name": "Brass Reducer UPVC - 3/4*1/2" },
      { "name": "Brass Elbow UPVC - 3/4*1/2" },
      { "name": "Brass Tee UPVC - 3/4*1/2" },
      { "name": "Reducing Tee UPVC - 1*3/4" },

      // -- CPVC Fitting --
      { "name": "Tank Connector CPVC - 3/4\"" },
      { "name": "Tank Connector CPVC - 1\"" },
      { "name": "Tank Connector CPVC - 1-1/4\"" },
      { "name": "Tee CPVC - 1/2\"" },
      { "name": "Tee CPVC - 3/4\"" },
      { "name": "Tee CPVC - 1\"" },
      { "name": "Tee CPVC - 1-1/4\"" },
      { "name": "Tee CPVC - 1-1/2\"" },
      { "name": "Coupler CPVC - 1/2\"" },
      { "name": "Coupler CPVC - 3/4\"" },
      { "name": "Coupler CPVC - 1\"" },
      { "name": "Coupler CPVC - 1-1/4\"" },
      { "name": "Coupler CPVC - 1-1/2\"" },
      { "name": "Elbow CPVC - 1/2\"" },
      { "name": "Elbow CPVC - 3/4\"" },
      { "name": "Elbow CPVC - 1\"" },
      { "name": "Elbow CPVC - 1-1/4\"" },
      { "name": "Elbow CPVC - 1-1/2\"" },
      { "name": "MTA CPVC - 1/2\"" },
      { "name": "MTA CPVC - 3/4\"" },
      { "name": "MTA CPVC - 1\"" },
      { "name": "MTA CPVC - 1-1/4\"" },
      { "name": "MTA CPVC - 1-1/2\"" },
      { "name": "FTA CPVC - 1/2\"" },
      { "name": "FTA CPVC - 3/4\"" },
      { "name": "FTA CPVC - 1\"" },
      { "name": "FTA CPVC - 1-1/4\"" },
      { "name": "FTA CPVC - 1-1/2" },
      { "name": "Union CPVC - 1/2\"" },
      { "name": "Union CPVC - 3/4\"" },
      { "name": "Union CPVC - 1\"" },
      { "name": "Union CPVC - 1-1/4\"" },
      { "name": "Union CPVC - 1-1/2\"" },
      { "name": "Brass Reducer CPVC - 3/4*1/2" },
      { "name": "Brass Elbow CPVC - 3/4*1/2" },
      { "name": "Brass Tee CPVC - 3/4*1/2" },
      { "name": "Reducing Tee CPVC - 1*3/4" },

      // -- PVC_Fittings --
      { "name": "FTA PVC - 1/2\"" },
      { "name": "FTA PVC - 3/4\"" },
      { "name": "FTA PVC - 1\"" },
      { "name": "FTA PVC - 1-1/4\"" },
      { "name": "FTA PVC - 1-1/2\"" },
      { "name": "MTA PVC - 1/2\"" },
      { "name": "MTA PVC - 3/4\"" },
      { "name": "MTA PVC - 1\"" },
      { "name": "MTA PVC - 1-1/4\"" },
      { "name": "MTA PVC - 1-1/2\"" },
      { "name": "Elbow PVC - 1/2\"" },
      { "name": "Elbow PVC - 3/4\"" },
      { "name": "Elbow PVC - 1\"" },
      { "name": "Elbow PVC - 1-1/4\"" },
      { "name": "Elbow PVC - 1-1/2\"" },
      { "name": "Elbow PVC - 2\"" },
      { "name": "Elbow PVC - 2-1/2\"" },
      { "name": "Elbow PVC - 3\"" },
      { "name": "Elbow PVC - 4\"" },
      { "name": "Reducer PVC - 1*3/4\"" },
      { "name": "Reducer PVC - 1-1/4*1" },
      { "name": "Tee PVC - 1/2\"" },
      { "name": "Tee PVC - 3/4\"" },
      { "name": "Tee PVC - 1\"" },
      { "name": "Tee PVC - 1-1/4\"" },
      { "name": "Tee PVC - 1-1/2\"" },
      { "name": "Tee PVC - 2\"" },
      { "name": "Tee PVC - 2-1/2\"" },
      { "name": "Tee PVC - 3\"" },
      { "name": "Tee PVC - 4\"" },
      { "name": "End Cup PVC - 1/2\"" },
      { "name": "End Cup PVC - 3/4\"" },
      { "name": "End Cup PVC - 1\"" },
      { "name": "End Cup PVC - 1-1/4\"" },
      { "name": "End Cup PVC - 1-1/2\"" },
      { "name": "End Cup PVC - 2\"" },
      { "name": "End Cup PVC - 2-1/2\"" },
      { "name": "End Cup PVC - 3\"" },
      { "name": "End Cup PVC - 4\"" },
      { "name": "Clip PVC - 1/2\"" },
      { "name": "Clip PVC - 3/4\"" },
      { "name": "Clip PVC - 1\"" },
      { "name": "Clip PVC - 1-1/4\"" },
      { "name": "Clip PVC - 1-1/2\"" },
      { "name": "Clip PVC - 2\"" },
      { "name": "Clip PVC - 2-1/2\"" },
      { "name": "Clip PVC - 3\"" },
      { "name": "Clip PVC - 4\"" },
      { "name": "ST Pipes PVC - 1/2\"" },
      { "name": "ST Pipes PVC - 3/4\"" },
      { "name": "ST Pipes PVC - 1\"" },
      { "name": "ST Pipes PVC - 1-1/4\"" },
      { "name": "ST Pipes PVC - 1-1/2\"" },
      { "name": "ST Pipes PVC - 2\"" },
      { "name": "ST Pipes PVC - 2-1/2\"" },
      { "name": "ST Pipes PVC - 3\"" },
      { "name": "ST Pipes PVC - 4\"" },
      { "name": "Bypass Bend PVC - 1\"" },
      { "name": "Bypass Bend PVC - 3/4\"" },
      { "name": "Coupler PVC - 1/2\"" },
      { "name": "Coupler PVC - 3/4\"" },
      { "name": "Coupler PVC - 1\"" },
      { "name": "Coupler PVC - 1-1/4\"" },
      { "name": "Coupler PVC - 1-1/2\"" },
      { "name": "Coupler PVC - 2\"" },
      { "name": "Coupler PVC - 2-1/2\"" },
      { "name": "Coupler PVC - 3\"" },
      { "name": "Coupler PVC - 4\"" },
      { "name": "Union PVC - 1/2\"" },
      { "name": "Union PVC - 3/4\"" },
      { "name": "Union PVC - 1\"" },
      { "name": "Union PVC - 1-1/4\"" },
      { "name": "Union PVC - 1-1/2\"" },
      { "name": "Door Elbow PVC - 1-1/2\"" },
      { "name": "Door Elbow PVC - 2\"" },
      { "name": "Door Elbow PVC - 2-1/2\"" },
      { "name": "Door Elbow PVC - 3\"" },
      { "name": "Door Elbow PVC - 4\"" },
      { "name": "Door Tee PVC - 1-1/2\"" },
      { "name": "Door Tee PVC - 2\"" },
      { "name": "Door Tee PVC - 2-1/2\"" },
      { "name": "Door Tee PVC - 3\"" },
      { "name": "Door Tee PVC - 4\"" },
      { "name": "Door Y PVC - 2\"" },
      { "name": "Door Y PVC - 2-1/2\"" },
      { "name": "Door Y PVC - 3\"" },
      { "name": "Door Y PVC - 4\"" },
      { "name": "Y PVC - 2\"" },
      { "name": "Y PVC - 2-1/2\"" },
      { "name": "Y PVC - 3\"" },
      { "name": "Y PVC - 4\"" },
      { "name": "Bend PVC - 1/2\"" },
      { "name": "Bend PVC - 3/4\"" },
      { "name": "Bend PVC - 1\"" },
      { "name": "Bend PVC - 1-1/4\"" },
      { "name": "Bend PVC - 1-1/2\"" },
      { "name": "Bend PVC - 2\"" },
      { "name": "Bend PVC - 2-1/2\"" },
      { "name": "Bend PVC - 3\"" },
      { "name": "Bend PVC - 4\"" },
      { "name": "Step Clamp - 1-1/2\"" },
      { "name": "Step Clamp - 2\"" },
      { "name": "Step Clamp - 2-1/2\"" },
      { "name": "Step Clamp - 3\"" },
      { "name": "Step Clamp - 4\"" },
      { "name": "Thread" },
      { "name": "Teflon Tread Tape" },
      { "name": "SS (Nail)Aani - 1*1/2\"" },
      { "name": "SS (Nail)Aani - 2\"" },

      // -- Compressor Motor --
      { "name": "Hp Compressor Motor - 1-1/2" },
      { "name": "Hose Meter - 1/2\"" },
      { "name": "Hose Meter - 1\"" },
      { "name": "Clip - 1/2\"" },
      { "name": "Clip - 1\"" },
      { "name": "Bottom Unit" },
      { "name": "Hose Collar - 1/2\"" },
      { "name": "Hose Collar - 3/4\"" },
      { "name": "Hose Collar - 1\"" },
      { "name": "GI Pipe - 1/2\"" },
      { "name": "Gi Elbow - 1/2\"" },
      { "name": "Gi Elbow - 1-3/4\"" },
      { "name": "Gi Coupling - 1/2\"" },
      { "name": "Gi Coupling - 1\"" },
      { "name": "MS Union - 1/2\"" },
      { "name": "Pipe Nipple - (1/2 x 24)" },
      { "name": "Pipe Nipple - (1/2 x 18)" },
      { "name": "Pipe Nipple - (1/2 x 12)" },
      { "name": "Pipe Nipple - (1/2 x 6)" },
      { "name": "Pipe Nipple - (1 x 9)" },
      { "name": "Nipple - 1/2\"" },
      { "name": "Clamp - (1-1/2)" },
      { "name": "Bore well Cap - (7\")" },
      { "name": "Oil - (1/2-Lt)" }
    ]
    listProducts.forEach(async (product: any) => {
      const uploadId = this.firestore.createId();
      // await this.firestore.set(`listProducts/${uploadId}`, {
      //   name: product?.name
      // })
      console.log("done")
    })
  }

  addCategory() {
    const categories = [
      { "categoryName": "switch" },
      { "categoryName": "wall fitting" },
      { "categoryName": "board" },
      { "categoryName": "board sheets" },
      { "categoryName": "pipes fitting" },
      { "categoryName": "trip" },
      { "categoryName": "lights" },
      { "categoryName": "wire" },
      { "categoryName": "sintex tank" },
      { "categoryName": "valve" },
      { "categoryName": "tap" },
      { "categoryName": "solvent" },
      { "categoryName": "upvc" },
      { "categoryName": "cpvc fitting" },
      { "categoryName": "pvc fittings" },
      { "categoryName": "hp compressor motor" }
    ];

    categories.forEach(async (c: any) => {
      await this.firestore.set(`categories/${c?.categoryName}`, {
        name: c?.categoryName
      })
    })
    console.log('done')
  }

  addProduct() {
    const product = [

      {
        "categoryName": "switch",
        "productList": [
          { "productName": "switch", "productSize": ["5a", "15a", "20a", "2way"] },
          { "productName": "switch dummy", "productSize": [] },
          { "productName": "switch bell", "productSize": [] },
          { "productName": "dp switch", "productSize": ["32a"] },
          { "productName": "indicator", "productSize": [] },
          { "productName": "usb socket", "productSize": [] },
          { "productName": "socket", "productSize": ["2pin", "16a", "5a"] },
          { "productName": "fan dimmer", "productSize": [] },
          { "productName": "fuse carrier", "productSize": ["16/415a", "32/415a"] },
          { "productName": "tape roll", "productSize": [] }
        ]
      },
      {
        "categoryName": "wall fitting",
        "productList": [
          { "productName": "ceiling rose", "productSize": [] },
          { "productName": "angle holder", "productSize": [] },
          { "productName": "batten holder", "productSize": [] },
          { "productName": "pendent holder", "productSize": [] },
          { "productName": "2 pin top", "productSize": [] },
          { "productName": "3 pin top", "productSize": [] },
          { "productName": "round sheet", "productSize": [] },
          { "productName": "round sheet dummy", "productSize": [] },
          { "productName": "fan round sheet", "productSize": [] },
          { "productName": "calling bell", "productSize": [] }
        ]
      },
      {
        "categoryName": "board",
        "productList": [
          { "productName": "wood board", "productSize": ["15*4", "12*4", "10*4", "8*4", "6*4", "12*6", "10*6", "8*6", "4*4"] },
          { "productName": "metal box", "productSize": ["2m", "3m", "4m", "6m", "8m", "10m", "12m", "16m"] },
          { "productName": "meter board", "productSize": ["12*9", "15*12", "24*18"] },
          { "productName": "t bolt", "productSize": [] },
          { "productName": "earth link", "productSize": ["c"] },
          { "productName": "stay clamp", "productSize": ["3/4\"", "1\""] },
          { "productName": "service pipe", "productSize": ["3/4\"", "1\""] }
        ]
      },
      {
        "categoryName": "board sheets",
        "productList": [
          { "productName": "wood model sheet", "productSize": ["12*4", "10*6", "10*4", "8*4", "6*4", "4*4"] },
          { "productName": "metal box sheet", "productSize": ["2m", "3m", "4m", "6m", "8m", "12m", "16m"] }
        ]
      },

      {
        "categoryName": "pipes fitting",
        "productList": [
          { "productName": "junction box", "productSize": ["1w", "2w", "3w", "4w"] },
          { "productName": "depth box", "productSize": ["3/4\"", "1\""] },
          { "productName": "bend", "productSize": ["3/4\"", "1\""] },
          { "productName": "pipe 3/4", "productSize": ["2mm", "1.5mm"] },
          { "productName": "pipe 1\"", "productSize": ["2mm", "1.5mm"] },
          { "productName": "fan box", "productSize": ["metal", "pvc"] },
          { "productName": "spot light box", "productSize": [] }
        ]
      },
      {
        "categoryName": "trip",
        "productList": [
          { "productName": "mcb", "productSize": ["10a", "16a", "20a"] },
          { "productName": "mcb two pol", "productSize": ["32a", "40a"] },
          { "productName": "mcb box", "productSize": ["2pol", "3pol", "4pol"] },
          { "productName": "elcb", "productSize": ["10a", "16a", "20a"] },
          { "productName": "elcb two pol", "productSize": ["32a", "40a"] },
          { "productName": "isolator two pol", "productSize": ["32a", "40a"] },
          { "productName": "isolator four pol", "productSize": ["32a", "40a"] },
          { "productName": "rccb two pol", "productSize": ["32a", "40a"] },
          { "productName": "panel box", "productSize": ["6m", "8m", "12m"] },
          { "productName": "3 phase panel board", "productSize": ["16m", "18m"] },
          { "productName": "rotary switch", "productSize": ["63a"] }
        ]
      },
      {
        "categoryName": "lights",
        "productList": [
          { "productName": "tube light led", "productSize": [] },
          { "productName": "led bulb", "productSize": ["9w", "12w", "23w"] },
          { "productName": "led bulkhead", "productSize": ["12w", "18w", "20w", "23w"] },
          { "productName": "spot light", "productSize": ["w", "ww", "b", "g", "p"] },
          { "productName": "stair light", "productSize": [] },
          { "productName": "slip light", "productSize": ["w", "ww", "mc", "b", "g", "p"] },
          { "productName": "foot lamb light", "productSize": ["4 model", "3model"] },
          { "productName": "gate light", "productSize": [] },
          { "productName": "depth box light", "productSize": ["w", "w-w", "b", "g", "p"] }
        ]
      },
      {
        "categoryName": "wire",
        "productList": [
          { "productName": "wire", "productSize": ["1 qmm", "1.5 qmm", "2.5 qmm", "4 qmm"] },
          { "productName": "cts wire", "productSize": ["3/20", "7/20"] },
          { "productName": "reel", "productSize": ["2p", "4p"] },
          { "productName": "green wire", "productSize": ["1/2kg", "1kg", "2kg"] },
          { "productName": "speaker wire", "productSize": [] }
        ]
      },
      {
        "categoryName": "sintex tank",
        "productList": [
          { "productName": "tank 500l", "productSize": ["3l", "4l"] },
          { "productName": "tank 750l", "productSize": ["3l", "4l"] },
          { "productName": "tank 1000l", "productSize": ["3l", "4l"] }
        ]
      },
      {
        "categoryName": "valve",
        "productList": [
          { "productName": "ball valve brass", "productSize": ["1/2\"", "3/4\"", "1\"", "1/4\"", "1/2\""] },
          { "productName": "angle valve", "productSize": [] },
          { "productName": "nrv valve", "productSize": ["3/4\"", "1\"", "1/4\"", "1/2\"", "2\""] }
        ]
      },
      {
        "categoryName": "tap",
        "productList": [
          { "productName": "cp tap", "productSize": [] },
          { "productName": "pvc tap", "productSize": [] },
          { "productName": "kitchen tap", "productSize": [] },
          { "productName": "wash basin tap", "productSize": [] },
          { "productName": "washing machine tap", "productSize": [] }
        ]
      },
      {
        "categoryName": "solvent",
        "productList": [
          { "productName": "solvent", "productSize": ["50ml", "100ml"] },
          { "productName": "solvent cpvc", "productSize": ["50ml", "100ml"] },
          { "productName": "pull tag", "productSize": [] }
        ]
      },
      {
        "categoryName": "upvc",
        "productList": [
          { "productName": "tank connector upvc", "productSize": ["3/4\"", "1\"", "1-1/4\""] },
          { "productName": "tee upvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "coupler upvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "elbow upvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "mta upvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "fta upvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "union upvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "brass reducer upvc", "productSize": ["3/4*1/2"] },
          { "productName": "brass elbow upvc", "productSize": ["3/4*1/2"] },
          { "productName": "brass tee upvc", "productSize": ["3/4*1/2"] },
          { "productName": "reducing tee upvc", "productSize": ["1*3/4"] }
        ]
      },
      {
        "categoryName": "cpvc fitting",
        "productList": [
          { "productName": "tank connector cpvc", "productSize": ["3/4\"", "1\"", "1-1/4\""] },
          { "productName": "tee cpvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "coupler cpvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "elbow cpvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "mta cpvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "fta cpvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "union cpvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "brass reducer cpvc", "productSize": ["3/4*1/2"] },
          { "productName": "brass elbow cpvc", "productSize": ["3/4*1/2"] },
          { "productName": "brass tee cpvc", "productSize": ["3/4*1/2"] },
          { "productName": "reducing tee cpvc", "productSize": ["1*3/4"] }
        ]
      },
      {
        "categoryName": "pvc fittings",
        "productList": [
          { "productName": "fta pvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "mta pvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "elbow pvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\"", "2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "reducer pvc", "productSize": ["1*3/4", "1-1/4*1"] },
          { "productName": "tee pvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\"", "2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "end cup pvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\"", "2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "clip", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\"", "2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "st pipes pvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\"", "2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "bypass bend pvc", "productSize": ["1\"", "3/4\""] },
          { "productName": "coupler pvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\"", "2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "union pvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\""] },
          { "productName": "door elbow pvc", "productSize": ["1-1/2\"", "2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "door tee pvc", "productSize": ["1-1/2\"", "2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "door y pvc", "productSize": ["2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "y pvc", "productSize": ["2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "bend pvc", "productSize": ["1/2\"", "3/4\"", "1\"", "1-1/4\"", "1-1/2\"", "2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "step clamp", "productSize": ["1-1/2\"", "2\"", "2-1/2\"", "3\"", "4\""] },
          { "productName": "thread", "productSize": [] },
          { "productName": "teflon tread tape", "productSize": [] },
          { "productName": "ss aani", "productSize": ["1*1/2\"", "2\""] }
        ]
      },
      {
        "categoryName": "hp compressor motor",
        "productList": [
          { "productName": "hose meter", "productSize": ["1/2\"", "1\""] },
          { "productName": "clip", "productSize": ["1/2", "1inch"] },
          { "productName": "bottom unit", "productSize": [] },
          { "productName": "hose collar", "productSize": ["1/2", "3/4", "1inch"] },
          { "productName": "gi pipe", "productSize": ["1/2"] },
          { "productName": "gi elbow", "productSize": ["1/2", "1-3/4"] },
          { "productName": "gi coupling", "productSize": ["1/2", "1inch"] },
          { "productName": "ms union", "productSize": ["1/2"] },
          { "productName": "pipe nipple", "productSize": ["1/2 x 24", "1/2 x 18", "1/2 x 12", "1/2 x 6", "1 x 9"] },
          { "productName": "nipple", "productSize": ["1/2"] },
          { "productName": "clamp", "productSize": ["1-1/2"] },
          { "productName": "borewell cap", "productSize": ["7inch"] },
          { "productName": "oil", "productSize": ["1/2-lt"] }
        ]
      }
    ]

    product.forEach(async (product: any) => {
      product?.productList.forEach(async (p: any) => {
        const uploadId = this.firestore.createId();
        await this.firestore.set(`products/${uploadId}`, {
          category: this.firestore.getDocRef(`categories/${product?.categoryName}`),
          productName: p?.productName,
          fileSize: p?.productSize || []
        })
        console.log('done')
      })
    })


  }
}
