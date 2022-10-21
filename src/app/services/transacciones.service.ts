import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {formatDate} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {
  date: string
  constructor(
    private http: HttpClient
  ) {
    console.log("El servicio TransaccionesService está funcionando")
    this.date = formatDate(new Date(), 'dd/MM/yyyy h:MM:ss', 'en');
    console.log('La fecha es ',this.date)
   }


  getTodasTransacciones(idUsuario: number):Observable<any>
  {  
  let params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.get("http://localhost:3000/transaccionFinal/", {params: params} );
  }
  
  depositoTransaccion(idUsuario:number, haber:number, cotizacionBTC:number ):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",{
    
    idUsuario: idUsuario,
    codigoMovimiento: "D",
    cuenta: "ARS",
    fecha: this.date,
    debe : 0, 
    haber: haber,
    cotARSvsBTC: cotizacionBTC
    },{ responseType: "json" , withCredentials: false  })
  }
  cambioTransaccionDebitar(idUsuario:number,cuentaDebitar:string, montoDebitar:number, cotizacionBTC:number ):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",{
    
      idUsuario: idUsuario,
      codigoMovimiento: "CI",
      cuenta: cuentaDebitar,
      fecha: this.date,
      debe : montoDebitar, 
      haber: 0,
      cotARSvsBTC:cotizacionBTC
    },{ responseType: "json" , withCredentials: false  })
  }
  cambioTransaccionDestino(idUsuario:number,cuentaDestino:string,montoDestino:number,cotizacionBTC:number ):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",{
    idUsuario: idUsuario,
    codigoMovimiento: "CF",
    cuenta: cuentaDestino,
    fecha: this.date,
    debe : 0, 
    haber: montoDestino,
    cotARSvsBTC: cotizacionBTC
    },{ responseType: "json" , withCredentials: false  })
  }


  retiroTransaccion(idUsuario:number, debe:number, cotizacionBTC:number):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",{
    
    idUsuario: idUsuario,
    codigoMovimiento: "R",
    cuenta: "ARS",
    fecha: this.date,
    debe : debe, 
    haber: 0,
    cotARSvsBTC: cotizacionBTC
    },{ responseType: "json" , withCredentials: false  })
  }
  precioBTCvsUSD():Observable<any>
  {
    return this.http.get("https://api.coingecko.com/api/v3/coins/bitcoin")
  }


}
