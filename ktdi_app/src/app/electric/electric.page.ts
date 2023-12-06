import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-electric',
  templateUrl: './electric.page.html',
  styleUrls: ['./electric.page.scss'],
})
export class ElectricPage {

  constructor(private navCtrl: NavController) {}

  selectAppliance(appliance: string) {
    // Handle the selection of appliance, you can add logic to register or navigate to a detailed registration page
    console.log('Selected Appliance:', appliance);
    // Example: Navigating to a detailed registration page with selected appliance
    this.navCtrl.navigateForward(`/appliance-registration/${appliance}`);
  }
}
