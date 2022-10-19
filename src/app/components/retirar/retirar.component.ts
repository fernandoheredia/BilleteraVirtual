import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: ['./retirar.component.css']
})
export class RetirarComponent implements OnInit {
  form: FormGroup;
  usuario: any;
  constructor(
    private miServicio:TransaccionesService,
    private formbuilder:FormBuilder) {
      this.form=this.formbuilder.group({
        nombre:['', [Validators.required]],
        cbu:['',[Validators.required,]],
        monto:['', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  Continuar(){
    if(this.form.valid)
    {
    console.log("datos ingresados correctamente")
  }
  else
  {
    console.log("datos ingresados de manera erronea")
  }
}
}
