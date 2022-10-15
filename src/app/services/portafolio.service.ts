import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  constructor(private http:HttpClient) {
    console.log("El servicio portafolio está corriendo");
   }

   getPortafolio(userId:number):Observable<any>
   {
    let params = new HttpParams().set('userId',userId);
    return this.http.get('http://localhost:3000/portafolio',{params:params});
   }
}
