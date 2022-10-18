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


}
