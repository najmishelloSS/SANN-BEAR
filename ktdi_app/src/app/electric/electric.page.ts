import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { Stripe, PaymentSheetEventsEnum } from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  showQRCodeSection: boolean = false;
  selectedPaymentMethod: string = '';
  submitted = false;
  paymentSuccessful = false;
  data: any = {};
  page: string = '';
  qrCodeImageUrl: any;
  paymentId: string | null = null; 

  constructor(
    private http: HttpClient,
    private decimalPipe: DecimalPipe,
    public route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.data['special']) {
      this.data = this.route.snapshot.data['special'];
    }
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

      console.log('paymentIntent: ' , paymentIntent);
  
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
      });
  
      const result = await Stripe.presentPaymentSheet();
      console.log('result: ', result);
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        const paymentId = paymentIntent.split('_').slice(0, 2).join('_');
        this.submitRegistration(paymentId);
      }
    } catch (e) {
      console.log(e);
    }

  }
  async presentPaymentSheet(): Promise<void> {
    try {
      const result = await Stripe.presentPaymentSheet();
      console.log('Payment sheet presented:', result);
  
      if (result) {
        if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
          console.log('Payment completed successfully');
          // Proceed with submitting the registration
          
        } else if (result.paymentResult === PaymentSheetEventsEnum.Canceled) {
          console.log('Payment canceled by user');
          // Handle cancellation, e.g., show a message to the user
        } else {
          console.log('Payment failed or encountered an error');
          // Handle other payment result scenarios
        }
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
  
    if (appliance.selected && !this.selectedAppliances.some(selected => selected.id === appliance.id)) {
      this.selectedAppliances.push(appliance);
    } else if (!appliance.selected && this.selectedAppliances.some(selected => selected.id === appliance.id)) {
      this.selectedAppliances = this.selectedAppliances.filter(selected => selected.id !== appliance.id);
    }
  
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.selectedAppliances.reduce((acc, curr) => {
      return acc + parseFloat(curr.price.toString());
    }, 0);
    this.formatTotalPrice();
  }

  formatTotalPrice(): string {
    return this.decimalPipe.transform(this.totalPrice, '1.2-2') || '0.00';
  }

  proceedToPayment(): void {
    if (this.selectedAppliances.length > 0) {
      this.navigateToPage('page3');
    } else {
      alert('Please select at least one appliance to proceed to payment.');
    }
  }
  
  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
    if (method === 'Credit Card' || method === 'Debit Card') {
      this.showPaymentSection = true;
    } else {
      this.showPaymentSection = false;
    }
  }

  paymentMethods = ['Credit Card', 'Debit Card', 'PayPal'];

  showQRCode(): void {
    this.selectedPaymentMethod = 'QR Code';
    this.showPaymentSection = false;
    this.showQRCodeSection = true;
  }

  navigateToPaymentSuccessful(): void {
    this.paymentSuccessful = true;
  }

  submitRegistration(paymentId: string): void {
    console.log('user data:', this.data); // Log the data to check its contents
    
    if (!this.data || !this.data.login || !this.data.login.user_id) {
      console.error('User is not logged in or user ID is missing.', this.data);
      return;
    }
  
    const formData = new FormData();
formData.append('user_id', this.data.login.user_id);
formData.append('name', this.selectedAppliances.map(appliance => appliance.name).join(', '));
formData.append('totalPrice', this.totalPrice.toString());
formData.append('date', new Date().toISOString());
formData.append('payment_status', 'Pending');
formData.append('paymentId', paymentId);

this.http.post('http://ktdiapp.mooo.com/api/electrical_registration.php', formData,).subscribe(
  (response) => {
    console.log(response);
    this.submitted = true;
    localStorage.setItem('userRegistered', 'registered');
    this.page = 'registeredPage';
  },
  (error: HttpErrorResponse) => {
    console.error('Registration API Error:', error);
  }
);
  }
}
