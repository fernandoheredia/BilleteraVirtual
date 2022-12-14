import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Transaccion } from 'src/app/models/transaccion';
//import { Retirar } from 'src/app/models/retirar';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { formatDate } from '@angular/common';
import { CodigoCuenta } from "../../enums/codigo-cuenta";
import { CodigoTransaccion} from '../../enums/codigo-transaccion';
import { ContactoBancario } from 'src/app/models/contactoBancario';

@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: ['./retirar.component.css'],
})
export class RetirarComponent implements OnInit {

  userId: number = 0
  beneficiario = '';
  cbuBeneficiario: string = '';
  montoIngresado: number = 0;
  arsVsBtc: number = 0;
  disponible_ARS: number = 0;
  showAlertMonto: boolean = false;
  showAlertDestino: boolean = false;
  User: any;
  amountState: boolean = false;
  disableButton: boolean = true;
  contactos:any;
  selectedValue: string = '';
  displayCuentaSeleccionada:boolean= false
  dataBeneficiarios:Array<ContactoBancario>=[];
  miContacto:ContactoBancario = new ContactoBancario(0,0,'','');
  idContacto:number = 0;
  form!: FormGroup;

  usuario: any;
  constructor(
    private miServicio: TransaccionesService,
    private userService: UsuarioService,
    private formbuilder: FormBuilder
  ) {
    this.form = this.formbuilder.group({
      //nombre: ['', [Validators.required]],
      //cbu: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      beneficiarios: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId')!)
    
    this.mostrarBeneficiario(this.userId);
    this.getPrecioBTCvsARS();
    this.getTotalARS();
  }

  get beneficiarios(){
    return this.form.get('beneficiarios')
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get cbu() {
    return this.form.get('cbu');
  }

  get monto() {
    return this.form.get('monto');
  }

  getPrecioBTCvsARS() {
    this.miServicio.precioBTCvsUSD().subscribe(
      (data) => {
        this.arsVsBtc = data.market_data.current_price.ars;
      },
      (error) => console.log(error)
    );
  }

  // mostrarBeneficiario(userId: number) {
  //   this.userService.getContactosBancarios(userId).subscribe(
  //     (data) => {
  //     this.contactos = data;
  //     this.beneficiario = this.form.get('beneficiarios')?.value;
  //     console.log("MOSTRANDO BENEFICIARIOS");
  //     console.log(this.selectedValue);
  //     console.log(this.contactos);
  //     this.User = data[0];
  //     //this.beneficiario = this.User.Nombre;
  //     //this.cbuBeneficiario = this.User.cbu;
  //     //console.log('cbu: ', this.cbu);
  //   });
  // }

  mostrarBeneficiario(userId: number) {
    this.userService.getContactosBancarios(userId).subscribe(
      (data)=>{
        this.dataBeneficiarios = data;
      }
    );
  }
  changeSuit(event:any){
    //let cuentaSeleccionada:number = this.selectedValue
    this.displayCuentaSeleccionada = true
    //this.getMontoDisponible(cuentaSeleccionada);
  }
  onSubmit(){
  //let monto = this.formIntercambiar.value
  //console.log('monto a cotizar',monto.monto);
  //console.log('cuenta seleccionada', this.selectedValue)
  //this.cotizar(monto.monto, this.selectedValue)
  
  }
  getTotalARS() {
    this.miServicio.getTodasTransacciones(this.userId).subscribe(
      (data) => {
        let haber_ARS: number = 0;
        let debe_ARS: number = 0;
        let datos = data;

        for (let index = 0; index < datos.length; index++) {
          const element = datos[index];
          if (element.cuenta == CodigoCuenta.PesosArgentinos) {
            haber_ARS += element.haber;
            debe_ARS += element.debe;
          }
        }
        const disponible = haber_ARS - debe_ARS;
        this.disponible_ARS = disponible;
      },
      (error) => console.log(error)
    );
  }

  retirar() {
    //this.getTotalARS();
    //cargamos el obj transacción para retiro de ARS
    let precioBTC: number = this.arsVsBtc;
    let date: number = Date.now();
    let fecha: string = formatDate(date, 'dd/MM/yyyy - HH:mm', 'en') + ' hrs';
    let debe: number = this.form.get('monto')?.value;
    console.log('Pesos disponibles: ', this.disponible_ARS);
    console.log('Monto ingresado atributo de clase: ', this.montoIngresado);
    let tipo: boolean = typeof this.montoIngresado === 'string';
    console.log('El monto ingresado es string: ', tipo);
    //let montoRetiro:number=this.formRetirar.get('retiro')?.value;
    //validación que haría en modal anterior

    //creacion de obj transacción de tipo 'R'

    let retiroT: Transaccion = new Transaccion(
      this.userId,
      CodigoTransaccion.Retiro,
      CodigoCuenta.PesosArgentinos,
      fecha,
      debe,
      0,
      precioBTC
    );

    // this.miServicio.retiroTransaccion2(retiroT).subscribe(
    //   (data) => console.log(data),
    //   (error) => console.log(error)
    // );

    this.miServicio.retiroTransaccion(this.userId, debe,  this.miContacto.idContacto).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => console.log(e)
      }
    )
  }

  reset() {
    this.showAlertMonto = false;
    this.showAlertDestino = false;
    this.montoIngresado = 0;
    this.disponible_ARS = 0;
    this.disponible_ARS = 0;
    this.amountState = false;
    location.reload();
  }

  /*onAmountInput(){
    if(this.amount>=this.disponible_ARS||this.amount<=0)
    {
      this.amountState=true;
    }
    else
    {
      this.amountState=false;
    }
    console.log("amount: ", this.amount);
  }*/

  //disable si faltan campos o monto no válido

  Continuar() {
    for (let index = 0; index<=this.dataBeneficiarios.length; index++)
    {
      if (this.dataBeneficiarios[index].beneficiario == this.selectedValue){
        this.miContacto = this.dataBeneficiarios[index];
        // this.miContacto.cbu = this.dataBeneficiarios[index].cbu;
        // this.beneficiario = this.dataBeneficiarios[index].beneficiario;
        // this.idContacto = this.dataBeneficiarios[index].idContacto;
      }
    }
  }

  checkForm(e: any) {
    const btn = document.getElementById('btn') as HTMLButtonElement | null;
    const chbx = document.getElementById('chbx') as HTMLInputElement | null;
    const nombreInput = document.getElementById(
      'nombreInput'
    ) as HTMLInputElement | null;
    const cbuInput = document.getElementById(
      'cbuInput'
    ) as HTMLInputElement | null;
    const montoInput = document.getElementById(
      'montoInput'
    ) as HTMLInputElement | null;
    if (e.target.checked) {
      if (this.form.valid) {
        this.montoIngresado = this.form.get('monto')?.value;
        if (
          this.disponible_ARS < this.montoIngresado ||
          this.montoIngresado <= 0
        ) {
          //alert('Error en ingreso de datos');
          console.log('Error: no se puede realizar retiro con el monto ingresado',this.montoIngresado);
          this.showAlertMonto = true;
          return;
        } 
        //else if (
        //   this.form.get('cbu')?.value != this.cbuBeneficiario ||
        //   this.form.get('nombre')?.value != this.beneficiario
        // ) {
        //   console.log('Error: cuenta de destino no registrada');
        //   this.showAlertDestino = true;
        //   return;
        // } 
         else {
          console.log('datos ingresados correctamente');
          btn?.removeAttribute('disabled');
          nombreInput?.setAttribute('disabled', '');
          cbuInput?.setAttribute('disabled', '');
          montoInput?.setAttribute('disabled', '');
        }
      } else {
        console.log('datos ingresados de manera errónea');
        alert('Error en ingreso de datos');
        if (chbx != null) chbx.checked = false;
        return;
      }
    } else {
      //alert("Todos los datos son requeridos");
      btn?.setAttribute('disabled', '');
      nombreInput?.removeAttribute('disabled');
      cbuInput?.removeAttribute('disabled');
      montoInput?.removeAttribute('disabled');
      return;
    }
  }


  /*retiro()
{
  if(this.form.valid){
  let nombre:string = this.form.get("nombre")?.value;
  let cbu:number = this.form.get("nombre")?.value;
  let monto:number = this.form.get("nombre")?.value;
  let retirar:Retirar = new Retirar(nombre,cbu,monto);
  this.miServicio.retiroTransaccion(retirar).subscribe(respueta=>{})
}}*/
}
