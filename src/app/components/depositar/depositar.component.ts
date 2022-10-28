import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from "../../services/transacciones.service";

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent implements OnInit {
  userID:number = 1
  arsVsBtc: number = 0
  montoIngresado: number =0;
  alertShow: boolean =false
  formDepositar = new FormGroup({
    monto : new FormControl(this.montoIngresado)
  })

  constructor(
    private _transaccionService:TransaccionesService
  ) {}
   

  ngOnInit(): void {
    this.getPrecioBTCvsARS();
    
  }
  getPrecioBTCvsARS() {
    this._transaccionService.precioBTCvsUSD().subscribe(
      (resp) => {
        this.arsVsBtc = resp.market_data.current_price.ars;
        
      },
      (error) => console.log(error)
    );
  }

  nuevoDeposito( monto:number){
    this._transaccionService.depositoTransaccion( this.userID, monto, this.arsVsBtc ).subscribe(resp =>{
      console.log(resp)
    },error=>{
      console.log(error)
    })
  }

  reset(){
    this.montoIngresado = 0;
    this.alertShow =false

  }
  onSubmit(){
    let monto = this.formDepositar.value
    this.montoIngresado = monto.monto
    console.log('monto a depositar', this.montoIngresado);
    this.nuevoDeposito( this.montoIngresado);
    this.alertShow =true
    setTimeout(() => {
      location.reload()
    }, 500);
  
    }
  

}
