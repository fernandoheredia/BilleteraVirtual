import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from "../../services/transacciones.service";

@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent implements OnInit {
  userID:number = 1
  arsVsBtc: number = 0
  constructor(
    private _transaccionService:TransaccionesService
  ) {}
   

  ngOnInit(): void {
    this.getPrecioBTCvsARS();
    
  }
  getPrecioBTCvsARS(){
    this._transaccionService.precioBTCvsUSD().subscribe(resp=>{
      this.arsVsBtc = resp.market_data.current_price.ars
      console.log("Precio del Bitcoin en Pesos = ", this.arsVsBtc)
    },error=>console.log(error))
  }
  nuevoDeposito( monto:number){
    this._transaccionService.depositoTransaccion( this.userID, monto, this.arsVsBtc ).subscribe(resp =>{
      console.log(resp)
    },error=>{
      console.log(error)
    })
  }
  retiroTransacc(montoRetirar:number){
    this._transaccionService.retiroTransaccion(this.userID, montoRetirar, this.arsVsBtc).subscribe(resp => console.log(resp)
    ,err=>console.log(err)
    )
  }
  intercambioTransacc(cuentaDebitar:string,montoDebitar:number)
  {
    let cuentaDestino:string = ""
    let montoDestino:number
    let precioBTC: number = this.arsVsBtc
    switch (cuentaDebitar) {
      case "ARS":
        cuentaDestino = "BTC";
        break;
      case "BTC":
        cuentaDestino = "ARS";
        break;

      default:
        
        break;
    }
    montoDestino = montoDebitar/precioBTC

    this._transaccionService.cambioTransaccionDebitar(this.userID, cuentaDebitar, montoDebitar, precioBTC).subscribe(resp => console.log(resp),error=>console.log(error));
    this._transaccionService.cambioTransaccionDestino(this.userID,cuentaDestino,montoDestino,precioBTC).subscribe(resp => console.log(resp),error=>console.log(error));
  }


}
