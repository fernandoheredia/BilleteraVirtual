import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { NgModel } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-intercambiar',
  templateUrl: './intercambiar.component.html',
  styleUrls: ['./intercambiar.component.css'],
})
export class IntercambiarComponent implements OnInit {
  userID: number = this.usuarioService.usuarioAutenticado.idUsuario;
  arsVsBtc: number = 0;
  montoDisponible: number = 0;
  cotizado: number = 0;
  monedaCotizado: string = '';
  monedasWallet:Array<string> = ['ARS', 'BTC' ] ;
  moneda: string = '';
  montoIngresado:number = 0
  fondosInsuficientes: boolean = false
  alertShow: boolean =false
  form = new FormGroup({
    cuentas: new FormControl(this.monedasWallet)
  })
  formIntercambiar = new FormGroup({
    monto : new FormControl(this.montoIngresado)
  })

  selectedValue:string = ''
  displayCuentaSeleccionada:boolean= false

  constructor(private _transaccionService: TransaccionesService, private usuarioService:UsuarioService) {}

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
    if (montoCambiar > this.montoDisponible) {
      this.fondosInsuficientes = true
      this.cotizado = 0

      return 
    }
    this.fondosInsuficientes = false
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
  reset(){
    this.selectedValue = ''
    this.displayCuentaSeleccionada = false
    this.montoIngresado= 0
    this.cotizado = 0
    this.monedaCotizado= ''
    this.fondosInsuficientes = false

  }

  intercambioTransacc(cuentaDebitar: string, montoDebitar: number) {
    let cuentaDestino: string = '';
    let montoDestino: number = 0;
    let precioBTC: number = this.arsVsBtc;
    if (montoDebitar == 0) {
      this.fondosInsuficientes = true
      return
    }
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
      this.alertShow = true
      setTimeout(() => {
        location.reload()
      }, 500);
      
  }

  changeSuit(event:any){
    let cuentaSeleccionada = this.selectedValue
    this.displayCuentaSeleccionada = true
    this.getMontoDisponible(cuentaSeleccionada);
  }
  onSubmit(){
  let monto = this.formIntercambiar.value
  console.log('monto a cotizar',monto.monto);
  console.log('cuenta seleccionada', this.selectedValue)
  this.cotizar(monto.monto, this.selectedValue)

  }




}
