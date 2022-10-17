import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from "../../services/transacciones.service";

@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent implements OnInit {
  userID:number = 0
  
  constructor(
    private _transaccionService:TransaccionesService
  ) {}
   

  ngOnInit(): void {
  }
  nuevoDeposito( monto:number){
    this._transaccionService.depositoTransaccion( this.userID, monto ).subscribe(resp =>{
      console.log(resp)
    },error=>{
      console.log(error)
    })
  }
  retiroTransacc(montoRetirar:number){
    this._transaccionService.retiroTransaccion(this.userID, montoRetirar).subscribe(resp => console.log(resp)
    ,err=>console.log(err)
    )
  }
  intercambioTransacc(cuentaDebitar:string,cuentaDestino:string,montoDebitar:number,montoDestino:number,cotARSvsBTC:number)
  {
    this._transaccionService.cambioTransaccionDebitar(this.userID, cuentaDebitar, montoDebitar, cotARSvsBTC).subscribe(resp => console.log(resp),error=>console.log(error));

    this._transaccionService.cambioTransaccionDestino(this.userID,cuentaDestino,montoDestino,cotARSvsBTC).subscribe(resp => console.log(resp),error=>console.log(error));
  }

}
