import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionesService } from "../../services/transacciones.service";

@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent implements OnInit {
  form: FormGroup;
  cbu: string = '20200307611000021352553';
  alias: string = 'ANGULAR.PIL.DEV';
  monto: number = 0;
  constructor(
    private formbuilder:FormBuilder)
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

  Continuar(){
    if(this.form.valid)
    {
    console.log("Datos ingresados correctamente.");
  }
  else
  {
    console.log("Datos ingresados de manera erronea.");
  }
}
}
