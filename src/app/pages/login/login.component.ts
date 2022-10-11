import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  dataUsuario: Array<any> = [];
  enteredEmail: string = '';
  enteredPassword: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {}
  validarUsuario(email: string, password: string) {
    this.dataUsuario = [];
    this.usuarioService.getUsuario(email).subscribe(
      (resp) => {
        // console.log('La respuesta es',resp);
        for (let index = resp.length - 1; index >= 0; index--) {
          const element = resp[index];
          //console.log(element)
          this.dataUsuario.push(element);
        }
        // console.log('Objeto a trabajar: ',this.dataUsuario)

        if (this.dataUsuario.length == 0) {
          console.log('no se ha encontrado usuario');
        } else {
          if (this.dataUsuario[0].password === password) {
            console.log('usuario ingresado correctamente');
            this.router.navigate(['/cuenta-personal']);
          } else {
            console.log('el usuario o contraseña ingresado no es correcto');
          }
        }
      },
      (error) => {
        console.warn(error.message);
      }
    );
  }
  onSubmit(f: NgForm) {
    this.validarUsuario(this.enteredEmail, this.enteredPassword);
  }
}
