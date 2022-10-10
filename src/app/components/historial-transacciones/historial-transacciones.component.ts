import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from "../../services/transacciones.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.component.html',
  styleUrls: ['./historial-transacciones.component.css']
})
export class HistorialTransaccionesComponent implements OnInit {
  //variables globales
  dataTransacciones: Array<any> = [];
  date:any
  userId:number = 1


  constructor(
    private _servicioTransaccion:TransaccionesService
  ) {

   }

  ngOnInit(): void {
    this.ultimasTransacciones(this.userId);
    this.date = new Date();
  }
  ultimasTransacciones(userId:number){
    this.dataTransacciones= []
    this._servicioTransaccion.getTodasTransacciones(userId).subscribe(resp => {
      console.log('La respuesta es', resp);
      let i:number;
      if (resp.length > 4) {
        i = 4;
      }else{
        i = 0 ;
      }
      for (let index = (resp.length -1); index >= i; index--) {
        const element = resp[index];
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
      console.log('La respuesta es',resp);
      for (let index = (resp.length -1); index >= 0 ; index--) {
        const element = resp[index];
        //console.log(element)
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
