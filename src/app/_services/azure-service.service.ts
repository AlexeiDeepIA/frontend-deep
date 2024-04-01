import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AzureServiceService {

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.apiUrl + '/upload', formData).pipe(
      tap(response => {
        console.log('Backend response:', response);
      }),
      catchError((error: any) => {
        console.error('Error uploading file:', error);
        throw error;
      })
    );
  }

    // getContainerData(): Observable<any> {
    //   return this.http.get('http://52.224.197.225:8080');
    // }

    checkServerStatus(): void {
      this.http.get('http://172.171.48.156:8080/').pipe(
        catchError((error: any) => {
          console.error('Error checking server status:', error);
          throw error;
        })
      ).subscribe(() => {
        console.log('Server activated successfully');        
      });
    }
}
