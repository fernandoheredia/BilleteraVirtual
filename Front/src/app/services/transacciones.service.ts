import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {formatDate} from '@angular/common';
import { Transaccion } from '../models/transaccion'
import { CodigoCuenta } from "../enums/codigo-cuenta";
import { CodigoTransaccion } from "../enums/codigo-transaccion";

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  
  date: number
  constructor(
    private http: HttpClient
  ) {
    console.log("El servicio TransaccionesService está funcionando")
    this.date = Date.now();
    console.log('La fecha es ',formatDate(this.date, 'dd/MM/yyyy - HH:mm' , 'en'))
   }


  getTodasTransacciones(idUsuario: number):Observable<any>
  {  
  let params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.get(`https://localhost:7206/api/operacion/${idUsuario}`);
  }
  
  depositoTransaccion(idUsuario:number, haber:number):Observable<any>
  {
    return this.http.post(`https://localhost:7206/api/Operacion?idUsuario=${idUsuario}`,{
      idTipoOperacion: CodigoTransaccion.Deposito,
      debe : 0,
      haber: haber
    },{ responseType: "json" , withCredentials: false  })
  }

  cambioTransaccionDebitar(idUsuario:number,cuentaDebitar:number, montoDebitar:number, cotizacionBTC:number ):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",{
    
      idUsuario: idUsuario,
      codigoMovimiento: CodigoTransaccion.CambioInicial,
      cuenta: cuentaDebitar,
      fecha: formatDate(this.date, 'dd/MM/yyyy - HH:mm' , 'en')+' hrs',
      debe : montoDebitar, 
      haber: 0,
      cotARSvsBTC:cotizacionBTC
    },{ responseType: "json" , withCredentials: false  })
  }
  cambioTransaccionDestino(idUsuario:number,cuentaDestino:number,montoDestino:number,cotizacionBTC:number ):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",{
    idUsuario: idUsuario,
    codigoMovimiento: CodigoTransaccion.CambioFinal,
    cuenta: cuentaDestino,
    fecha: formatDate(this.date, 'dd/MM/yyyy - HH:mm' , 'en')+' hrs',
    debe : 0, 
    haber: montoDestino,
    cotARSvsBTC: cotizacionBTC
    },{ responseType: "json" , withCredentials: false  })
  }


  retiroTransaccion(idUsuario:number, debe:number):Observable<any>
  {
    return this.http.post(`https://localhost:7206/api/Operacion?idUsuario=${idUsuario}`,{
    idTipoOperacion: CodigoTransaccion.Retiro,
    debe : debe, 
    haber: 0,
    },{ responseType: "json" , withCredentials: false  })
  }

  
  retiroTransaccion2(transaccion:Transaccion):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",transaccion,
    { responseType: "json" , withCredentials: false  })
  }
  
  precioBTCvsUSD():Observable<any>
  {
    return this.http.get("https://api.coingecko.com/api/v3/coins/bitcoin")
  }


}
