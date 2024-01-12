import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { Stripe, PaymentSheetEventsEnum } from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

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
  selectedAppliances: Appliance[] = [];
  showPaymentSection = false;
  selectedPaymentMethod: string = '';
  submitted = false;
  paymentSuccessful = false;
  data: any = {};
  page: string = '';

  constructor(
    private http: HttpClient,
    private decimalPipe: DecimalPipe
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAppliances();
    this.checkUserRegistrationStatus();
  }
  checkUserRegistrationStatus(): void {
    const userRegisteredFlag = localStorage.getItem('userRegistered');
    this.page = userRegisteredFlag ? 'registeredPage' : 'page1';
  }

  httpPost(url: string, body: HttpParams) {
    return this.http.post<any>(url, body);
  }

  async initiateStripePayment(): Promise<void> {
    try {
      const requestData = { email: 'shah@gmail.com', name: 'Shah', amount: this.totalPrice }; 
      
      let params = new HttpParams();
      Object.keys(requestData).forEach(key => {
        params = params.append(key, requestData[key]);
      });
  
      const data$ = this.httpPost(environment.api + 'payment-sheet', params);
  
      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);
  
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
      });
  
      const result = await Stripe.presentPaymentSheet();
      console.log('result: ', result);
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Handle successful payment
        return paymentIntent.split('_').slice(0, 2).join('_');
      }
    } catch (e) {
      console.log(e);
    }
  }

  async paymentSheet(): Promise<void> {
    try {
      const requestData = { email: 'shah@gmail.com', name: 'Shah', amount: this.totalPrice }; 
      
      let params = new HttpParams();
      Object.keys(requestData).forEach(key => {
        params = params.append(key, requestData[key]);
      });
  
      const data$ = this.httpPost(environment.api + 'payment-sheet', params);
  
      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);
  
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
      });
  
      const result = await Stripe.presentPaymentSheet();
      console.log('result: ', result);
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Handle successful payment
        return paymentIntent.split('_').slice(0, 2).join('_');
      }
    } catch (e) {
      console.log(e);
    }
  }

  async presentPaymentSheet(): Promise<void> {
    try {
      const result = await Stripe.presentPaymentSheet();
      console.log('Payment sheet presented:', result);
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Handle successful payment
        console.log('Payment completed successfully');
      } else if (result && result.paymentResult === PaymentSheetEventsEnum.Canceled) {
        // Handle payment cancellation
        console.log('Payment canceled by user');
      } else {
        // Handle other payment outcomes
        console.log('Payment failed or encountered an error');
      }
    } catch (error) {
      console.error('Error presenting payment sheet:', error);
    }
  }
  
  async navigateToPage(targetPage: string): Promise<void> {
    this.page = targetPage;
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
  
    // Check if the appliance should be added or removed from selectedAppliances
    if (appliance.selected && !this.selectedAppliances.some(selected => selected.id === appliance.id)) {
      // Add the appliance to selectedAppliances if it's selected and not already present
      this.selectedAppliances.push(appliance);
    } else if (!appliance.selected && this.selectedAppliances.some(selected => selected.id === appliance.id)) {
      // Remove the appliance from selectedAppliances if it's deselected and present
      this.selectedAppliances = this.selectedAppliances.filter(selected => selected.id !== appliance.id);
    }
  
    // Update the total price after updating selected appliances
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.selectedAppliances.reduce((acc, curr) => {
      return acc + parseFloat(curr.price.toString()); // Ensure curr.price is parsed as a number
    }, 0);
    this.formatTotalPrice(); // Call the method to format the total price

  }

  formatTotalPrice(): string {
    return this.decimalPipe.transform(this.totalPrice, '1.2-2') || '0.00';
  }

  proceedToPayment(): void {
    if (this.selectedAppliances.length > 0) {
      this.navigateToPage('page3'); // Navigates to 'page3'
    } else {
      console.error('Please select at least one appliance to proceed to payment.');
    }
  }  
 selectPaymentMethod(method: string): void {
  this.selectedPaymentMethod = method;
  if (method === 'Credit Card' || method === 'Debit Card') {
    // Show the payment section when Credit Card or Debit Card is selected
    this.showPaymentSection = true;
  } else {
    // For other payment methods (like PayPal, QR Code, etc.), hide the payment section
    this.showPaymentSection = false;
  }
}

  paymentMethods = ['Credit Card', 'Debit Card', 'PayPal'];

  submitRegistration(): void {
    // Logic for submitting registration goes here

    this.submitted = true;
  }
}
