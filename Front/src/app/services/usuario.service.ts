import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url:string='https://localhost:7206/api/usuario/login';


  currentUserSubject:BehaviorSubject<Usuario>;
  loggedUser$ = new EventEmitter<boolean>(false)


  constructor(private http: HttpClient, private router:Router
    ) {
      this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'));

     }

  getUsuario(email: string):Observable<any>
  {  
  let params = new HttpParams().set('email', email);
    return this.http.get("http://localhost:3000/usuario/", {params: params} );  
  }

  setUsuario(email:string, password:string,enteredNombre:string, enteredApellido:string):Observable<any>
   {

      return this.http.post("http://localhost:3000/usuario/",{
      
      email:email,
      password:password,
      Nombre:enteredNombre,
      Apellido:enteredApellido,
      cbu: Math.round(Math.random()*10000000000 )
      },{ responseType: "json" , withCredentials: false  });


  }

  getUsuarioId(id: number):Observable<any>
  {  
  let params = new HttpParams().set('id', id);
    return this.http.get("http://localhost:3000/usuario/", {params: params} );  

  }

  get usuarioAutenticado():Usuario{
    return this.currentUserSubject.value}



  iniciarSesion(login:Login):Observable<any>
  {
      return this.http.post<any>(this.url,login).pipe(map(data=>{
        let userId = data.idUsuario
        localStorage.setItem('userId', userId )
        sessionStorage.setItem('currentUser',JSON.stringify(data));
        this.currentUserSubject.next(data);
       
        return data;
      }));
  }

  logout():void
  {
    localStorage.removeItem('userId')
    sessionStorage.removeItem('currentUser');
  }



  
}
