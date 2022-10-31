import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient
    ) {
      console.log("El servicio UsuarioService está funcionando")
     }

  getUsuario(email: string):Observable<any>
  {  
  let params = new HttpParams().set('email', email);
    return this.http.get("http://localhost:3000/usuario/", {params: params} );  
  }

  setUsuario(email:string, password:string,enteredNombre:string, enteredApellido:string):Observable<any>
   {
  //   let params = new HttpParams().set('email', email);
  //   return this.http.post("http://localhost:3000/usuario/",{params: params})
      return this.http.post("http://localhost:3000/usuario/",{
      
      email:email,
      password:password,
      Nombre:enteredNombre,
      Apellido:enteredApellido,
      cbu: Math.round(Math.random()*10000000000 )
      },{ responseType: "json" , withCredentials: false  });


  }

  //JGJ
  getUsuarioId(id: number):Observable<any>
  {  
  let params = new HttpParams().set('userId', id);
    return this.http.get("http://localhost:3000/usuario/", {params: params} );  

    

  }
  //JGJ
  
}
