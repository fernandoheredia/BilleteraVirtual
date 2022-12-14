import { ParseSourceSpan } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TransaccionesService } from '../../services/transacciones.service';


@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent implements OnInit {

  nombreUsuario:string = this.usuarioService.usuarioAutenticado.nombre;
  cbuUsuario: number = 0;
  montoIngresado: number = 0;
  userId: number = 0
  arsVsBtc: number = 0;
  cvuPesos: string = '';
  showAlertMonto:boolean=false;
  cuentas: Array<any> = [];
  form: FormGroup = new FormGroup({
    monto: new FormControl(this.montoIngresado)
  });

  constructor(
    private formbuilder:FormBuilder,
    private transaccionService:TransaccionesService,
    private usuarioService:UsuarioService
    ){
      this.form= this.formbuilder.group({
        monto:['', [Validators.required]]
    })
    }
  
  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId')!)
    this.infoUsuarioById(this.usuarioService.usuarioAutenticado.idUsuario);
  }
  infoUsuarioById(userId:number){
    this.usuarioService.getCuentasUsuarioId(userId).subscribe({
    next: (resp) =>{
      this.cuentas = resp;
      for (let i = 0; i <= this.cuentas.length; i++){
        if(this.cuentas[i].idMoneda == 2){
          this.cvuPesos = this.cuentas[i].cvu;
        }
      }
      console.log('cuentas', this.cuentas)
    },
    error: (err)=> console.log(err)
  })
  }
  

  // this.mercadoService.obtenerPrecios().subscribe({
  //   next: (v) => this.precios = v,
  //   error: (e) => console.log(e)
  // })
  copyInputMessage(inputElement: any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  generarDeposito(haber:number){
    let precioBTC: number = this.arsVsBtc;
    haber = this.montoIngresado;

    if (haber <= 0) {
      this.showAlertMonto = true;
      return;
    }

    if (haber > 0) {
      this.transaccionService.depositoTransaccion(this.userId, haber/* precioBTC*/).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.log(e)
      });
      this.showAlertMonto = false;
      setTimeout(() => {
        location.reload()
      }, 500);  
    }
    else{
      this.showAlertMonto = true;
    }
  }

  reset(){
    this.showAlertMonto = false;
  }
}
