import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HallBookingService {
  private apiUrl = 'your-api-endpoint'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  getHallBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hall_bookings`);
  }

  // Add other necessary methods, e.g., approveBooking, etc.
}