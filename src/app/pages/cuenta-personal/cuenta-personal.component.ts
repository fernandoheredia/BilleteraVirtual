import { Component, OnInit } from '@angular/core';
import { HistorialTransaccionesComponent } from '../../components/historial-transacciones/historial-transacciones.component';
import { UsuarioLogueadoService } from 'src/app/services/usuario-logueado.service';

@Component({
  selector: 'app-cuenta-personal',
  templateUrl: './cuenta-personal.component.html',
  styleUrls: ['./cuenta-personal.component.css']
})
export class CuentaPersonalComponent implements OnInit {
  usuarioLogueado:number = this.usuarioLogueadoService.getUsuarioLogueado()
  constructor(private usuarioLogueadoService: UsuarioLogueadoService) { }
  
  
  mostrarUsuarioLogueado(){
    if(this.usuarioLogueado !=-1){
    alert(this.usuarioLogueado)
    }

  }

  ngOnInit(): void {
    this.mostrarUsuarioLogueado()
  }

}
