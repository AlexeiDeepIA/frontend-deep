import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Csv } from '../_models/csv';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  private apiUrl = "http://4.156.89.8:3000/api/api/campaigns/read-csv";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

    private columnsSubject = new BehaviorSubject<string[]>([]);
    columns$ = this.columnsSubject.asObservable();

    updateColumns(columns: string[]) {
      this.columnsSubject.next(columns);
    }

    uploadFile(file: File): Observable<any>{
        const formData= new FormData();
        formData.append('csvFile', file, file.name);

        return this.http.post(this.apiUrl, formData);
    }    

    saveSelectedData(csv: any){
        return this.http.post<any>('http://localhost:3000/api/campaigns/save-data', csv);
    }
}