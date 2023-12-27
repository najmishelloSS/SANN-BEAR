import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common'; // Import DecimalPipe

interface Appliance {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  selected: boolean;
}

@Component({
  selector: 'app-electric',
  templateUrl: './electric.page.html',
  styleUrls: ['./electric.page.scss'],
})
export class ElectricPage implements OnInit {
  apiUrl = 'http://ktdiapp.mooo.com/api/electric.php';

  appliances: Appliance[] = [];
  totalPrice = 0;
  selectedAppliances: Appliance[] = []; // Newly added to store selected appliances
  showPaymentSection = false;
  selectedPaymentMethod: string = '';
  submitted = false;

  constructor(
    private http: HttpClient,
    private decimalPipe: DecimalPipe // Inject DecimalPipe
  ) {}

  ngOnInit(): void {
    this.getAppliances();
  }

  getAppliances(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      (data: any) => {
        if (data && data.Appliances && Array.isArray(data.Appliances)) {
          this.appliances = this.removeDuplicates(data.Appliances, 'name');
        } else {
          console.error('Empty or invalid data received from the API.');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('API Error:', error);
        console.error('Error fetching appliances:', error.message);
      }
    );
  }

  sortedCategories: string[] = ['Kitchen', 'Study', 'Personal', 'Other'];

  getAppliancesByCategory(category: string): Appliance[] {
    return this.appliances.filter((appliance) => appliance.category === category);
  }

  removeDuplicates(array: Appliance[], key: string): Appliance[] {
    return array.filter(
      (obj, index, self) => index === self.findIndex((el) => el[key] === obj[key])
    );
  }

  toggleSelection(appliance: Appliance): void {
    console.log('Before Toggle - Appliance:', appliance);
    appliance.selected = !appliance.selected;
    console.log('After Toggle - Appliance:', appliance);
  
    // Check if the appliance should be added or removed from selectedAppliances
    if (appliance.selected && !this.selectedAppliances.includes(appliance)) {
      // Add the appliance to selectedAppliances
      this.selectedAppliances.push(appliance);
    } else if (!appliance.selected && this.selectedAppliances.includes(appliance)) {
      // Remove the appliance from selectedAppliances
      this.selectedAppliances = this.selectedAppliances.filter(a => a.id !== appliance.id);
    }
  
    this.updateTotalPrice(); // Call the method to update the total price
  
    console.log('After Update - Selected Appliances:', this.selectedAppliances);
  }
  
  updateTotalPrice(): void {
    console.log('Updating total price...');
    this.totalPrice = this.selectedAppliances.reduce((acc, curr) => {
      console.log('Current Appliance Price:', curr.price);
      return acc + parseFloat(curr.price.toString()); // Ensure curr.price is parsed as a number
    }, 0);
    console.log('Total Price:', this.totalPrice);
    this.formatTotalPrice(); // Call the method to format the total price
  }

  formatTotalPrice(): string {
    return this.decimalPipe.transform(this.totalPrice, '1.2-2') || '0.00';
  }
  
  proceedToPayment(): void {
    if (this.selectedAppliances.length > 0) {
      this.showPaymentSection = true;
    } else {
      console.error('Please select at least one appliance to proceed to payment.');
    }
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }

  paymentMethods = ['Credit Card', 'Debit Card', 'PayPal'];

  submitRegistration(): void {
    // Logic for submitting registration goes here
    // You can access this.selectedAppliances to get the selected items
    this.submitted = true;
  }
}
