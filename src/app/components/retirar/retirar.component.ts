import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: ['./retirar.component.css']
})
export class RetirarComponent implements OnInit {

  userId: number = 1;
  beneficiario = '';
  cbu:number=0;
  montoIngresado: number = 0;
  User:any;

  form: FormGroup = new FormGroup({
    monto: new FormControl(this.montoIngresado)
  });

  usuario: any;
  constructor(
    private miServicio:TransaccionesService,
    private userService:UsuarioService,
    private formbuilder:FormBuilder) {
      this.form=this.formbuilder.group({
        nombre:['', [Validators.required]],
        cbu:['',[Validators.required,]],
        monto:['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.mostrarBeneficiario(this.userId);
  }

  mostrarBeneficiario(userId:number){
    this.userService.getUsuarioId(userId).subscribe((data)=>{
      this.User = data[0];
      this.beneficiario = this.User.Nombre;
      this.cbu = this.User.cbu;
      console.log("cbu: ", this.cbu);
    }
    )
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
