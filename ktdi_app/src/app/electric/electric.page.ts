import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Appliance {
  name: string;
  price: number;
  category: string;
  image: string; // Image URL property added
  selected: boolean;
}

@Component({
  selector: 'app-electric',
  templateUrl: './electric.page.html',
  styleUrls: ['./electric.page.scss'],
})
export class ElectricPage {
  appliances: Appliance[] = [
    // Kitchen Appliances with image URLs
    { name: 'Electric Kettle', price: 20, category: 'Kitchen', image: 'assets/image/kettle.png', selected: false },
    { name: 'Microwave', price: 20, category: 'Kitchen', image: 'assets/image/microwave.png', selected: false },
    { name: 'Toaster', price: 20, category: 'Kitchen', image: 'assets/image/toaster.png', selected: false },

    // Personal Grooming Appliances with image URLs
    { name: 'Hair Dryer', price: 20, category: 'Personal', image: 'assets/image/hair dryer.png', selected: false },
    { name: 'Table Fan', price: 20, category: 'Personal', image: 'assets/image/tablefan.png', selected: false },
    { name: 'Iron', price: 20, category: 'Personal', image: 'assets/image/iron.png', selected: false },

    // Study Appliances with image URLs
    { name: 'Pc/Laptop/Printer', price: 0, category: 'Study', image: 'assets/image/laptop.png', selected: false },
    { name: 'Phone Charger', price: 0, category: 'Study', image: 'assets/image/charger.png', selected: false },

    // Other Appliances with image URLs
    { name: 'Extension', price: 20, category: 'Other', image: 'assets/image/extension.png', selected: false },
    { name: 'Table Lamp', price: 20, category: 'Other', image: 'assets/image/desk lamp.png', selected: false }
  ];

  totalPrice = 0;

  getAppliancesByCategory(category: string): Appliance[] {
    return this.appliances.filter(appliance => appliance.category === category);
  }
  
  constructor(private navCtrl: NavController) {}

  selectAppliance(appliance: Appliance) {
    console.log('Selected Appliance:', appliance.name);
    console.log('Price:', appliance.price);

    // Toggle selection status
    appliance.selected = !appliance.selected;

    // Adjust total price based on selection
    if (appliance.selected) {
      this.totalPrice += appliance.price;
    } else {
      this.totalPrice -= appliance.price;
    }
  }

  proceed() {
    console.log('Proceed clicked!');
    // Implement further actions as needed
  }
}
