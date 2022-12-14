
import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnChanges {

  estaAutenticado:boolean = false;

  constructor(private usuarioService:UsuarioService, private router:Router){ }

  ngOnInit(): void {
    if ( localStorage.getItem('userId')) {
      this.estaAutenticado = true
    }else{
      this.estaAutenticado = false
    }

 }
 ngOnChanges(changes: SimpleChanges): void {
  console.log('Usuario en el localS',localStorage.getItem("userId"))
  if (localStorage.getItem("userId") === null) {
    console.log('entro en el if')
  }
  console.log('se modifico el navbar')
 }


  onCerrarSesion(){
    this.usuarioService.logout();
    this.estaAutenticado=false;
    this.router.navigate(['/home']);
  }

}
