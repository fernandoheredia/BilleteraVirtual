import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-intercambiar',
  templateUrl: './intercambiar.component.html',
  styleUrls: ['./intercambiar.component.css'],
})
export class IntercambiarComponent implements OnInit {
  userID: number = 1;
  arsVsBtc: number = 0;
  montoDisponible: number = 0;
  cotizado: number = 0;
  monedaCotizado: string = '';

  constructor(private _transaccionService: TransaccionesService) {}

  ngOnInit(): void {
    this.getPrecioBTCvsARS();
    this.getMontoDisponible('BTC');
  }
  getPrecioBTCvsARS() {
    this._transaccionService.precioBTCvsUSD().subscribe(
      (resp) => {
        this.arsVsBtc = resp.market_data.current_price.ars;
        console.log('Precio del Bitcoin en Pesos = ', this.arsVsBtc);
      },
      (error) => console.log(error)
    );
  }

  getMontoDisponible(cuenta: string) {
    this._transaccionService.getTodasTransacciones(this.userID).subscribe(
      (resp) => {
        let haberes: number = 0;
        let deberes: number = 0;
        let respuesta = resp;

        for (let index = 0; index < respuesta.length; index++) {
          const element = respuesta[index];
          if (element.cuenta === cuenta) {
            haberes += element.haber;
            deberes += element.debe;
          }
        }
        const disponible = haberes - deberes;
        this.montoDisponible = disponible;
        console.log('Disponible', disponible);
      },
      (error) => console.log(error)
    );
  }

  cotizar(montoCambiar: number, cuentaOrigen: string) {
    let loCotizado: number ;

    switch (cuentaOrigen) {
      case 'ARS':
        loCotizado = montoCambiar / this.arsVsBtc;
        this.monedaCotizado = 'BTC';
        break;
      case 'BTC':
        loCotizado = montoCambiar * this.arsVsBtc;
        this.monedaCotizado = 'ARS';
        break;

      default:
        loCotizado = 0;
        this.monedaCotizado = 'Error';
        break;
    }
    this.cotizado = loCotizado;
  }

  intercambioTransacc(cuentaDebitar: string, montoDebitar: number) {
    let cuentaDestino: string = '';
    let montoDestino: number = 0;
    let precioBTC: number = this.arsVsBtc;
    switch (cuentaDebitar) {
      case 'ARS':
        cuentaDestino = 'BTC';
        montoDestino = montoDebitar / precioBTC;
        break;
      case 'BTC':
        cuentaDestino = 'ARS';
        montoDestino = montoDebitar * precioBTC;
        break;

      default:
        break;
    }

    this._transaccionService
      .cambioTransaccionDebitar(
        this.userID,
        cuentaDebitar,
        montoDebitar,
        precioBTC
      )
      .subscribe(
        (resp) => console.log(resp),
        (error) => console.log(error)
      );
    this._transaccionService
      .cambioTransaccionDestino(
        this.userID,
        cuentaDestino,
        montoDestino,
        precioBTC
      )
      .subscribe(
        (resp) => console.log(resp),
        (error) => console.log(error)
      );
  }
}
