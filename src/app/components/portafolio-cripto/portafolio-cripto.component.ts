import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/services/portafolio.service';

@Component({
  selector: 'app-portafolio-cripto',
  templateUrl: './portafolio-cripto.component.html',
  styleUrls: ['./portafolio-cripto.component.css']
})
export class PortafolioCriptoComponent implements OnInit {

  userId:number=1; //harcodeo user id
  billetera:any; //property publica para el binding con vista

  constructor(private miServicio:PortafolioService) { }

  ngOnInit(): void {
    this.miPortafolio(this.userId);
  }

  miPortafolio(userId:number)
  {
    this.miServicio.getPortafolio(userId).subscribe(data => {
      console.log(data);
      this.billetera = data;
    }, error=>{
      console.warn(error.message);
    }
    )
  }

}
