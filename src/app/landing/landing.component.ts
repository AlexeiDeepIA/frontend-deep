import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { AuthLoginService } from '../_services/auth-login.service';
import { Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AzureServiceService } from '../_services/azure-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor(
    private authLoginService: AuthLoginService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private azureService: AzureServiceService
  ){}

  showLoader = false;

  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() videoUrl: string;
  hasContinue = false;
  hasClicked = false;  
  maxVideoDuration: number = 60; // Duración máxima del video en segundos
  selectedFile: File | null = null;

  selectedVideo(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.handleFile(file);
  }

  uploadFile() {
    if (this.selectedFile) {
      this.showLoader = true;
      const newFileName = '1.mp4';
      const renamedFile = new File([this.selectedFile], newFileName, { type: this.selectedFile.type })
      this.azureService.uploadFile(renamedFile ).subscribe(
        response => {
          console.log(response);
          this.showLoader = false;
          this.router.navigate(['/success-page']);
        },
        error => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }


  continue(){
    this.hasContinue = true;
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  // Manejar el archivo y la duracion del video
  async handleFile(file: File) {
    if (!file) {
      return;
    }
    if (file.type.startsWith('video/')) {      
      const videoDuration = await this.getVideoDuration(file);
      if (videoDuration <= this.maxVideoDuration) {
        this.videoUrl = URL.createObjectURL(file);
      } else {
        alert(`El video debe tener una duración de ${this.maxVideoDuration} segundos o menos.`);
      }
    }
  }

  async getVideoDuration(file: File): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const video = document.createElement('video');
      video.onloadedmetadata = () => {
        resolve(video.duration);
      };
      video.onerror = (error) => {
        reject(error);
      };
      video.src = URL.createObjectURL(file);
    });
  }

  stepOne(){
    this.hasClicked = true;
  }

  cancel(){
    this.hasClicked = false;
  }

  logout(){
    this.authLoginService.logout();
  }
  
  convertDataUrlToBlob(dataUrl: string): Blob {
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([arrayBuffer], { type: mimeString });
  }

  
  

}
