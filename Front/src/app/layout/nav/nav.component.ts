
import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { map, take } from "rxjs/operators";
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnChanges {

  estaAutenticado:boolean=false;

  constructor(private usuarioService:UsuarioService, private router:Router)
   { 
    this.usuarioService.loggedUser$.subscribe(
      boolean => {
      console.log('EVENT EMITTER',boolean)
      this.estaAutenticado= boolean  }
    )

   }

  ngOnInit(): void {
    console.log('eventooo', this.estaAutenticado)

 }
 ngOnChanges(changes: SimpleChanges): void {

 }


  onCerrarSesion(){
    this.usuarioService.logout();
    //this.estaAutenticado=false;
    this.router.navigate(['/home']);
  }

}
