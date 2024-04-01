import { Component, Input } from '@angular/core';
import { CampaignsService } from '../_services/campaigns.service';

@Component({
  selector: 'app-found-columns',
  templateUrl: './found-columns.component.html',
  styleUrls: ['./found-columns.component.css']
})
export class FoundColumnsComponent {
  
  selectedOption: string = ''; // Opción seleccionada
  selectedData: any[] = [];
  

  constructor(private campaignService: CampaignsService){}

  selectData(data: any){
    const index = this.selectedData.findIndex(item => item == data);
    if(index !== -1){
      this.selectedData.splice(index, 1)
    } else {
      this.selectedData.push(data);
    }
  }

  selectOption(option: string) {
    this.selectedOption = option;
    console.log(this.selectedOption);
    
  }

  saveSelectedData(){
    console.log('Datos seleccionados', this.selectedData);
    
  }

}
