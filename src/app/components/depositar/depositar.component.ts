import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransaccionesService } from '../../services/transacciones.service';


@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent implements OnInit {

  cbu: string = '20200307611000021352553';
  alias: string = 'ANGULAR.PIL.DEV';
  montoIngresado: number = 0;
  userId: number = 1;
  arsVsBtc: number = 0;

  form: FormGroup = new FormGroup({
    monto: new FormControl(this.montoIngresado)
  });

  constructor(
    private formbuilder:FormBuilder,
    private transaccionService:TransaccionesService)
    {
      this.form=this.formbuilder.group({
        monto:['', [Validators.required]]
    })
    }
  
  ngOnInit(): void {
  }

  copyInputMessage(inputElement: any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  generarDeposito(haber:number){
    let precioBTC: number = this.arsVsBtc;
    haber = this.montoIngresado;

    this.transaccionService.depositoTransaccion(this.userId, haber, precioBTC).subscribe(
      (resp) => console.log(resp),
      (error) => console.log(error)
    );
  }
}
