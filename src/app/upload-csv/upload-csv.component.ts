import { Component, OnInit } from '@angular/core';
import { CampaignsService } from '../_services/campaigns.service';
import { AuthLoginService } from '../_services/auth-login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.css']
})
export class UploadCsvComponent implements OnInit {
  file!: File;
  content: any = null;
  userId: any;
  columnsSelection: { [key: string]: {selected: boolean; value: string} } = {};
  csvFields: any = {};
  selectedData: any[] = [];

  constructor(
    private campaignService: CampaignsService,
    private router: Router,
    private authLoginService: AuthLoginService) {}

  ngOnInit(): void {
    this.userId = this.authLoginService.getId();
    console.log(this.userId);
    console.log(this.content);        
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload(): void {    
    if (!this.file) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }
    this.campaignService.uploadFile(this.file)
      .subscribe(
        (response: any[]) => {
          console.log('Respuesta del backend:', response);
          // Verificar si hay datos en la respuesta
          if (response && response.length > 0) {
            // Tomar el primer objeto del array
            const firstObject = response[0];
            // Asignar el primer objeto a la propiedad content
            this.content = firstObject;
            console.log(this.content);
            
          } else {
            console.error('La respuesta del backend no contiene datos.');
          }
        },
        (error: any) => {
          console.error('Error al cargar el archivo:', error);
        }
      );
  }

  onSelect(columnsKey: string){
    if(!this.columnsSelection[columnsKey]){
      this.columnsSelection[columnsKey] = { selected: true, value: this.content[columnsKey]}
    } else {
      this.columnsSelection[columnsKey].selected = !this.columnsSelection[columnsKey].selected;
    }
    this.updateSelectedData();
  }

  updateSelectedData(){
    this.selectedData = [];
    for(const columnsKey of this.getObjectKeys(this.content)){
      if(this.columnsSelection[columnsKey] && this.columnsSelection[columnsKey].selected){
        this.selectedData.push({
          key: columnsKey,
          value: this.columnsSelection[columnsKey].value
        })
      }
    }
  }

  saveSelectedData(): void {
    this.csvFields = {};
    // Llenar csvFields con los datos seleccionados
    this.selectedData.forEach(data => {
      this.csvFields[data.key] = data.value;
    });
    const dataToSave = {
      userId: this.userId,
      csvFields: this.csvFields // Aquí están todos los campos CSV
    };
    console.log('Datos seleccionados', dataToSave);    
    this.campaignService.saveSelectedData(dataToSave).subscribe(
      (res) =>{
        if(res.success == true){
          Swal.fire({
            toast: true,
            icon: 'success',
            title: res.message,
            animation: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1200,
            timerProgressBar: true,
            didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
          }).then((res) =>{
              this.router.navigate(['/home', { data: JSON.stringify(this.selectedData) }])
          })
        } else {
          Swal.fire({
            toast: true,
            icon: 'error',
            title: res.message,
            animation: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1200,
            timerProgressBar: true,
            didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
          }).then((res) =>{
              window.location.reload();
          })
        }
        
      }
    )
  }

}
