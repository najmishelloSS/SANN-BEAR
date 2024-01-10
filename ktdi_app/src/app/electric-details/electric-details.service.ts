import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElectricDetailsService {
  private electricDetails: any[] = [
    { id: 1, user_id: 101, price: 50, category: 'Category A', name: 'Detail 1' },
    { id: 2, user_id: 102, price: 75, category: 'Category B', name: 'Detail 2' },
    // Add more electric details as needed
  ];

  getElectricDetails(): any[] {
    // You can add logic here to fetch data from a backend or perform any other operations
    return this.electricDetails;
  }
}