import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Retirar } from 'src/app/models/retirar';
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
  cbuBeneficiario:number=0;
  montoIngresado: number = 0;
  montoRetirar: number = 0;
  arsVsBtc:number = 0;
  disponible_ARS:number=0;
  showAlert:boolean=false;
  User:any;

  form!: FormGroup;
  formRetirar!: FormGroup

  usuario: any;
  constructor(
    private miServicio:TransaccionesService,
    private userService:UsuarioService,
    private formbuilder:FormBuilder) {
      this.form=this.formbuilder.group({
        nombre:['', [Validators.required]],
        cbu:['',[Validators.required,]],
        monto:['', [Validators.required]]
    }),
    this.formRetirar = this.formbuilder.group({
      retiro:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.mostrarBeneficiario(this.userId);
    this.getPrecioBTCvsARS();
    this.getTotalARS();
  }

  get nombre(){
    return this.form.get("nombre");
  }

  get cbu(){
    return this.form.get("cbu");
  }

  get monto(){
    return this.form.get("retiro");
  }

 /* getPrecioBTCvsARS(){
    this.miServicio.precioBTCvsUSD().subscribe(
      (data)=>{
        this.arsVsBtc = data.market_data.current_price.ars;
      },
      (error)=>console.log(error)
    );
  }

  /*mostrarBeneficiario(userId:number){
    this.userService.getUsuarioId(userId).subscribe((data)=>{
      this.User = data[0];
      this.beneficiario = this.User.Nombre;
      this.cbuBeneficiario = this.User.cbu;
      console.log("cbu: ", this.cbu);
    }
    )
  }

  /*getTotalARS(){
    this.miServicio.getTodasTransacciones(this.userId).subscribe(
      (data)=> {
        let haber_ARS:number=0;
        let debe_ARS:number=0;
        let datos = data;

        for(let index=0;index<datos.length;index++){
          const element = datos[index];
          if(element.cuenta=='ARS'){
            haber_ARS += element.haber;
            debe_ARS += element.debe;
          }
        }
        const disponible = haber_ARS-debe_ARS;
        this.disponible_ARS = disponible;
        console.log('Pesos disponibles: ', this.disponible_ARS);
      },
      (error)=>console.log(error)
    );
  }*/

  /*retirar(){
    //this.getTotalARS();
    let precioBTC:number=this.arsVsBtc;
    console.log('Pesos disponibles: ', this.disponible_ARS);
    let tipo: boolean = (typeof this.montoIngresado === 'string');
    console.log("El monto ingresado es string: ", tipo);
    //let montoRetiro:number=this.formRetirar.get('retiro')?.value;

    if(this.disponible_ARS<this.montoIngresado||this.montoIngresado<=0){
      console.log('Error: no se puede realizar retiro con el monto ingresado',this.montoIngresado);
      this.showAlert = true;
      return;
    }

    this.miServicio.retiroTransaccion(this.userId,this.montoIngresado,precioBTC).subscribe(
      (data)=>console.log(data),
      (error) => console.log(error)
    );
  }*/

  reset(){
    this.showAlert=false;
    this.montoIngresado = 0;
    this.disponible_ARS =0;
    this.disponible_ARS = 0;
    location.reload();
  }

  Continuar(){
    this.montoIngresado = this.form.get('monto')?.value;
    if(this.form.valid)
    {
    console.log("datos ingresados correctamente")
  }
  else
  {
    console.log("datos ingresados de manera erronea")
  }*/

}
retiro()
{
  if(this.form.valid){
  let nombre:string = this.form.get("nombre")?.value;
  let cbu:number = this.form.get("nombre")?.value;
  let monto:number = this.form.get("nombre")?.value;
  let retirar:Retirar = new Retirar(nombre,cbu,monto);
  this.miServicio.retiroTransaccion(retirar).subscribe(respueta=>{})
}
}}
