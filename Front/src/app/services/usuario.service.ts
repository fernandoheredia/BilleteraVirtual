import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
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

  date: number

  url:string='https://localhost:7206/api/usuario/login';


  currentUserSubject:BehaviorSubject<Usuario>;



  constructor(private http: HttpClient, private router:Router
    ) {
      this.date = Date.now();
      this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'));

     }

  getUsuario(email: string):Observable<any>
  {
  let params = new HttpParams().set('email', email);
    return this.http.get("http://localhost:3000/usuario/", {params: params} );
  }

  setUsuario(email:string, password:string,enteredNombre:string, enteredApellido:string, enteredFechaNacimiento:string):Observable<any>
   {
  //   let params = new HttpParams().set('email', email);
  //   return this.http.post("http://localhost:3000/usuario/",{params: params})
      return this.http.post("https://localhost:7206/api/usuario/registro",{
        email:email,
        password:password,
        nombre:enteredNombre,
        apellido:enteredApellido ,
        fechaNacimiento:enteredFechaNacimiento,
      },{ responseType: "json" , withCredentials: false  });

  }

  getUsuarioId(id:number):Observable<any>{
    return this.http.get(`https://localhost:7206/api/usuario/cuentas/${id}`);
  }

  getCuentasUsuarioId(id: number):Observable<any>
  {
    return this.http.get(`https://localhost:7206/api/cuenta/${id}`);
  }

  getContactosBancarios(id:number):Observable<any>{
    return this.http.get(`https://localhost:7206/api/contacto/${id}`)
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
