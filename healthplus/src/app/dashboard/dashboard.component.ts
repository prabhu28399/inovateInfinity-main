import { Component } from '@angular/core';
import { AplicallService } from '../shared/aplicall.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public apicallService:AplicallService){
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
  
    if (token) {
      this.apicallService.gotoDashboard(token).subscribe(
        (res: any) => {
          if (res && res['status'] === 'ok') {
            console.log('We are in the dashboard');
          } else {
            console.log('Something went wrong while navigating to the dashboard');
          }
        },
        (error: any) => {
          console.error('Error while navigating to the dashboard:', error);
          // Handle the error accordingly
        }
      );
    }
  }
  
}
