import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from "../../services/transacciones.service";

@Component({
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.component.html',
  styleUrls: ['./historial-transacciones.component.css']
})
export class HistorialTransaccionesComponent implements OnInit {
  logo : string = '';
  destino :string = '';
  cantidad: number= 0;
  dia: string= '';


  constructor(
    private _servicioTransaccion:TransaccionesService
  ) {

   }

  ngOnInit(): void {
    this._servicioTransaccion.getTodasTransacciones(1).subscribe(resp => {
      console.log(resp);
      console.log(typeof resp);

    },error=>{
      console.log(error);
    })
    this.logo  = 'ARS';
    this.destino = 'BNB';
    this.cantidad = 10000;
    this.dia = '2022/10/02';
  }

  nuevaTransaccion(id:number, userId:number, monedaInicial:string, monedaFinal:string, monto:number, fecha:string){
    this._servicioTransaccion.createTransaccion(id, userId, monedaInicial, monedaFinal, monto, fecha).subscribe(resp =>
      console.log(resp))

  }

}
