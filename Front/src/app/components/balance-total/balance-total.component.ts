import { Component, OnInit, OnChanges } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TransaccionesService } from "../../services/transacciones.service";
import { CodigoCuenta } from "../../enums/codigo-cuenta";



@Component({
  selector: 'app-balance-total',
  templateUrl: './balance-total.component.html',
  styleUrls: ['./balance-total.component.css']
})
export class BalanceTotalComponent implements OnInit{

  userId:number = 0 
  balanceTotal: any = 0
  arsVsBtc: number = 0


  constructor(
    private _transaccionService:TransaccionesService,
    private usuarioService:UsuarioService
  ) {
    
   }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId')!)

    this.getPrecioBTCvsARS();
    setTimeout(() => {
      this.getBalanceTotal(); 
    }, 500);

  }
  OnChanges(): void {
    this.getBalanceTotal();
  }

  getPrecioBTCvsARS() {
    this._transaccionService.precioBTCvsUSD().subscribe(
      (resp) => {
        this.arsVsBtc = resp.market_data.current_price.ars;
        
      },
      (error) => console.log(error)
    );
  }


  getBalanceTotal() {
    this._transaccionService.getTodasTransacciones(this.userId).subscribe(
      (resp) => {
      
        let haberes: number = 0;
        let deberes: number = 0;
        let respuesta = resp;

        for (let index = 0; index < respuesta.length; index++) {
          const element = respuesta[index];
          
          if (element.cuenta == CodigoCuenta.PesosArgentinos) {
            haberes += element.haber;
            deberes += element.debe;
          }
          if(element.cuenta == CodigoCuenta.Bitcoin){
            haberes += (element.haber * this.arsVsBtc);
            deberes += (element.debe * this.arsVsBtc);
          }
        }
        this.balanceTotal = haberes - deberes;
      },
      (error) => console.log(error)
    );
  }

}
