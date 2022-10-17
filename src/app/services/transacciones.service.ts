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
    this.date = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    console.log('La fecha es ',this.date)
   }


  getTodasTransacciones(idUsuario: number):Observable<any>
  {  
  let params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.get("http://localhost:3000/transaccionFinal/", {params: params} );
  }
  
  depositoTransaccion(idUsuario:number, haber:number ):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",{
    
    idUsuario: idUsuario,
    codigoMovimiento: "D",
    cuenta: "ARS",
    fecha: this.date,
    debe : 0, 
    haber: haber,
    cotARSvsBTC: 290
    },{ responseType: "json" , withCredentials: false  })
  }
  cambioTransaccionDebitar(idUsuario:number,cuentaDebitar:string, montoDebitar:number, cotARSvsBTC:number ):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",{
    
      idUsuario: idUsuario,
      codigoMovimiento: "CI",
      cuenta: cuentaDebitar,
      fecha: this.date,
      debe : montoDebitar, 
      haber: 0,
      cotARSvsBTC:cotARSvsBTC
    },{ responseType: "json" , withCredentials: false  })
  }
  cambioTransaccionDestino(idUsuario:number,cuentaDestino:string,montoDestino:number,cotARSvsBTC:number ):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",{
    idUsuario: idUsuario,
    codigoMovimiento: "CF",
    cuenta: cuentaDestino,
    fecha: this.date,
    debe : 0, 
    haber: montoDestino,
    cotARSvsBTC: cotARSvsBTC
    },{ responseType: "json" , withCredentials: false  })
  }


  retiroTransaccion(idUsuario:number, debe:number):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",{
    
    idUsuario: idUsuario,
    codigoMovimiento: "R",
    cuenta: "ARS",
    fecha: this.date,
    debe : debe, 
    haber: 0,
    cotARSvsBTC: 290
    },{ responseType: "json" , withCredentials: false  })
  }
precioBTCvsUSD(){
  let params = new HttpParams();
  params = params.append('ids', 'bitcoin');
  params = params.append('vs_currencies', 'usd');
  return this.http.get("https://api.coingecko.com/api/v3/simple/price", {params: params})
}


}
