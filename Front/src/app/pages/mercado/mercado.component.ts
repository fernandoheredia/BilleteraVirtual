import { Component, OnInit } from '@angular/core';
import { MercadoService } from 'src/app/services/mercado.service';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.component.html',
  styleUrls: ['./mercado.component.css']
})
export class MercadoComponent implements OnInit {
  precios: Precios =  
  {
    tether:      { ars: 0},
    bitcoin:     { ars: 0},
    cardano:     { ars: 0},
    ethereum:    { ars: 0},
    binancecoin: { ars: 0}
  }

  constructor(private mercadoService:MercadoService) { }

  ngOnInit(): void {
    this.getPrecios();
  }
  getPrecios():any{
    this.mercadoService.obtenerPrecios().subscribe({
      next: (v) =>{
        this.precios = v
      },
      error: (e) => console.log(e)
    })

  }
  
}

export interface Precios {
  tether:      Binancecoin;
  bitcoin:     Binancecoin;
  cardano:     Binancecoin;
  ethereum:    Binancecoin;
  binancecoin: Binancecoin;
}

export interface Binancecoin {
  ars: number;
}
