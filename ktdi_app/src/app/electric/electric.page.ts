import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  constructor(private http: HttpClient) {}

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
    appliance.selected = !appliance.selected;
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.selectedAppliances.reduce((acc, curr) => acc + curr.price, 0);
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
