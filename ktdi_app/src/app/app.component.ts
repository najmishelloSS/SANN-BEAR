import { Component } from '@angular/core';
 import { Stripe } from '@capacitor-community/stripe';
 import { register } from 'swiper/element/bundle';

 register();

 @Component({
   selector: 'app-root',
   templateUrl: 'app.component.html',
   styleUrls: ['app.component.scss'],
 })
 export class AppComponent {
   constructor() {
     Stripe.initialize({
       publishableKey: 'pk_test_51ORPauC1wAehoBy5RVL9j1UnBmtilUN38wT4vUwteBMBgp3GEHbY4UYdpwXabAjG3FvIbMQ9y2YhQ0bxB8g7vCM600E1D7REkI',
     });
   }
 }