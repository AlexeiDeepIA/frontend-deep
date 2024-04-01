import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AzureServiceService } from '../_services/azure-service.service';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {

  constructor(private router: Router, private azureService: AzureServiceService) { }

  ngOnInit(): void {
    // Realizar la solicitud al servidor al cargar la página
    this.azureService.getContainerData().subscribe(() => {
      console.log('Solicitud GET enviada al servidor');
    });

    // Redirigir después de un tiempo de espera
    const tiempoEspera = 3000;
    setTimeout(() => {
      this.router.navigate(['/landing']);
    }, tiempoEspera);
  }

}
