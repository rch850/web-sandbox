import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webrtc-pinp';

  @ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>

  onSetupCameraClick (): void {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(mediaStreams => {
      this.localVideo.nativeElement.srcObject = mediaStreams
    })
  }
}
