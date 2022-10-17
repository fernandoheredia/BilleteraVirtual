import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from "../../services/transacciones.service";




@Component({
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.component.html',
  styleUrls: ['./historial-transacciones.component.css']
})
export class HistorialTransaccionesComponent implements OnInit {
  //variables globales
  dataTransacciones: Array<any> = [];
  userId:number = 1


  constructor(
    private _servicioTransaccion:TransaccionesService
  ) {

   }

  ngOnInit(): void {
    this.ultimasTransacciones(this.userId);
  }
  ultimasTransacciones(userId:number){
    this.dataTransacciones= []
    this._servicioTransaccion.getTodasTransacciones(userId).subscribe(resp => {
      let i:number;
      if (resp.length > 5) {
        i = 3;
      }else{
        i = 0 ;
      }
      for (let index = (resp.length -1); index >= i; index--) {
        const element = resp[index];
        switch (element.codigoMovimiento) {
          case "R":
            //retiro
            element.codigoMovimiento = "Retiro de "
            
            break;          
          case "CI":
            //Cambio Inicial
            element.codigoMovimiento = "Intercambio de "
            
            break;
          case "CF":
            //Cambio Final
            element.codigoMovimiento = "Intercambio de "
            
            break;
          case "D":
            //Deposito
            element.codigoMovimiento = "Deposito de "
            
            break;
        
          default:
            break;
        }
        switch (element.cuenta) {
          case "ARS":
            element.imgCuenta = "../../../assets/img/ARS.png"
            break;
          case "BTC":
            element.imgCuenta = "../../../assets/img/BTC.png"
            break;
          default:
            break;
        }
        if(element.debe == 0){
          //Ingreso de dinero a la cuenta element.cuenta
          element.monto = "+"+element.haber;
        }
        if (element.haber == 0) {
          //Egreso de dinero de la cuenta element.cuenta
          element.monto = "-"+element.debe;
        }
        this.dataTransacciones.push(element);
      }
      console.log('Objeto a trabajar: ',this.dataTransacciones)

    },error=>{
      console.warn(error.message);
    })
  }
  todasTransacciones(userId:number){
    this.dataTransacciones= []
    this._servicioTransaccion.getTodasTransacciones(userId).subscribe(resp => {
      for (let index = (resp.length -1); index >= 0 ; index--) {
        const element = resp[index];
        switch (element.codigoMovimiento) {
          case "R":
            //retiro
            element.codigoMovimiento = "Retiro de "
            
            break;          
          case "CI":
            //Cambio Inicial
            element.codigoMovimiento = "Intercambio de "
            
            break;
          case "CF":
            //Cambio Final
            element.codigoMovimiento = "Intercambio de "
            
            break;
          case "D":
            //Deposito
            element.codigoMovimiento = "Deposito de "
            
            break;
        
          default:
            break;
        }
        switch (element.cuenta) {
          case "ARS":
            element.imgCuenta = "../../../assets/img/ARS.png"
            break;
          case "BTC":
            element.imgCuenta = "../../../assets/img/BTC.png"
            break;
          default:
            break;
        }
        if(element.debe == 0){
          //Ingreso de dinero a la cuenta element.cuenta
          element.monto = "+"+element.haber;
        }
        if (element.haber == 0) {
          //Egreso de dinero de la cuenta element.cuenta
          element.monto = "-"+element.debe;
        }
        
        this.dataTransacciones.push(element)
        
      }
      console.log('Objeto a trabajar: ',this.dataTransacciones)
      
    },error=>{
      console.warn(error.message);
    })

  }

  nuevaTransaccion(id:number, userId:number, monedaInicial:string, monedaFinal:string, monto:number, fecha:string){
    this._servicioTransaccion.createTransaccion(id, userId, monedaInicial, monedaFinal, monto, fecha).subscribe(resp =>
      console.log(resp))

  }

}
