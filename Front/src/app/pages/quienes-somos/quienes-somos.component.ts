import { Component, OnInit } from '@angular/core';

import { IntegranteEquipo } from "../../interfaces/interfaces";
@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

  team:Array<IntegranteEquipo> = [
    {
      name: "Juan Rodriguez",
      perfil: "Web Developer NodeJS + Angular",
      imagen: "../../../assets/img/team/imagen1.jpg"
    },
    {
      name: "Natalia Murat",
      perfil: "Desarrolladora web",
      imagen: "../../../assets/img/team/imagen2.jpg"
    },
    {
      name: "Pilar Montenegro",
      perfil: "Desarrolladora web",
      imagen: "../../../assets/img/team/imagen3.jpg"
    },
    {
      name: "Mateo Ferrero",
      perfil: "Backend Developer C# .NET",
      imagen: "../../../assets/img/team/imagen4.jpg"
    },
    {
      name: "Agustín López",
      perfil: "Desarrollador web .Net",
      imagen: "../../../assets/img/team/imagen5.jpg"
    },
    {
      name: "Ana Julia Ferreyra",
      perfil: "PHP Developer",
      imagen: "../../../assets/img/team/imagen7.jpg"
    },
    {
      name: "Fernando Heredia",
      perfil: "Desarrollador Web",
      imagen: "../../../assets/img/team/imagen8.jpg"
    },
    {
      name: "Mateo Taricco",
      perfil: "Desarrollador Web",
      imagen: "../../../assets/img/team/imagen9.jpg"
    },
    {
      name: "Pablo Adrián Vera",
      perfil: "Desarrollador Web",
      imagen: "../../../assets/img/team/imagen10.jpg"
    }
  ];
  
  constructor() { }

  ngOnInit(): void {

  }

}
