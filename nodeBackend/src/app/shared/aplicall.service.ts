import { HttpClient, HttpErrorResponse, HttpHeaders ,HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AplicallService {
  constructor(public http: HttpClient) { }
  handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('an error occurred', error.error.message);
    }else{
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError("Something went wrong; please try again");
  }

  login(userData: any) {
    return this.http.post("http://127.0.0.1:3000/auth/login", userData).pipe(catchError(this.handleError));
  }

  registerUser(userData: any) {
    return this.http.post("http://127.0.0.1:3000/auth/register", userData).pipe(catchError(this.handleError));
  }

  gotoDashboard(token: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token  // Add a space after 'Bearer'
    });

    return this.http.post("http://127.0.0.1:3000/auth/dashboard", {}, { headers: headers }).pipe(catchError(this.handleError));
  }
}
 