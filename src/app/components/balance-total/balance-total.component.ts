import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from "../../services/transacciones.service";


@Component({
  selector: 'app-balance-total',
  templateUrl: './balance-total.component.html',
  styleUrls: ['./balance-total.component.css']
})
export class BalanceTotalComponent implements OnInit {
  userId:number = 1
  balanceTotal: any = 0
  arsVsBtc: number = 0


  constructor(
    private _transaccionService:TransaccionesService
  ) {
    this.getPrecioBTCvsARS();
   }

  ngOnInit(): void {
  
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
          console.log(element)
          if (element.cuenta == 'ARS') {
            haberes += element.haber;
            deberes += element.debe;
          }
          if(element.cuenta == 'BTC'){
            haberes += (element.haber * this.arsVsBtc);
            deberes += (element.debe * this.arsVsBtc);
          }
        }
        const disponible = haberes - deberes;

        this.balanceTotal = disponible.toFixed(2);
        console.log('Balance Total', this.balanceTotal);
      },
      (error) => console.log(error)
    );
  }

}
