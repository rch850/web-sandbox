import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webrtc-pinp';
  apiBase = 'https://192.168.11.2:8080'

  @ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement>

  constructor (
    private http: HttpClient
  ) {}

  onSetupHostClick (): void {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment'
      },
      audio: true
    }).then(mediaStreams => {
      this.localVideo.nativeElement.srcObject = mediaStreams
      let processing = false

      // polling offers forever
      setInterval(async () => {
        if (processing) {
          return
        }
        processing = true
        try {
          const offers = await this.getOffers().toPromise()
          const offer = offers[0]
          if (!offer || offer.desc.sdp === '') {
            return
          }

          let conn = new RTCPeerConnection()

          // Have to set ontrack before setRemoteDescription to play remote video
          conn.ontrack = (event) => {
            if (this.remoteVideo.nativeElement.srcObject) {
              return
            }
            this.remoteVideo.nativeElement.srcObject = event.streams[0]
          }

          // Have to call setRemoteDescription before addIceCandidate
          await conn.setRemoteDescription(offer.desc)

          for (let i = 0; i < offer.iceCandidates.length; i++) {
            await conn.addIceCandidate(offer.iceCandidates[i])
            console.log('added ', offer.iceCandidates[i])
          }
          mediaStreams.getTracks().forEach(track => {
            conn.addTrack(track, mediaStreams)
          })
          const answer = await conn.createAnswer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
          })
          await conn.setLocalDescription(answer)
          this.postAnswer(answer)
        } finally {
          processing = false
        }
      }, 3000)
    })
  }

  onSetupGuestClick (): void {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment'
      },
      audio: true
    }).then(mediaStreams => {
      this.localVideo.nativeElement.srcObject = mediaStreams

      let conn = new RTCPeerConnection()
      mediaStreams.getTracks().forEach(track => {
        conn.addTrack(track, mediaStreams)
      })

      let iceCandidates: RTCIceCandidate[] = []
      let sdp: RTCSessionDescriptionInit
      conn.onicecandidate = ({ candidate }) => {
        console.log('ice candidate', candidate)
        if (!candidate || candidate.candidate === '') {
          // Finished to enumerate ice candidates.
          // Post offer sdp and ice candidates.
          this.postOffer({ sdp, iceCandidates }).subscribe(() => {
            let myTimer = setInterval(async () => {
              const answer = await this.getAnswer().toPromise()
              if (answer.desc.sdp === '') {
                return
              }
              conn.setRemoteDescription(answer.desc)
              clearInterval(myTimer)
            }, 1000)
          })
        } else {
          iceCandidates.push(candidate)
        }
      }
      conn.ontrack = (event) => {
        if (this.remoteVideo.nativeElement.srcObject) {
          return
        }
        this.remoteVideo.nativeElement.srcObject = event.streams[0]
      }
      ;(async () => {
        sdp = await conn.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        })
        console.log('offer', sdp)
        conn.setLocalDescription(sdp)
      })()
    })
  }

  private postOffer ({
    sdp, iceCandidates
  }: {
    sdp: RTCSessionDescriptionInit,
    iceCandidates: RTCIceCandidate[]
  }) {
    const offerUrl = `${this.apiBase}/offers`
    return this.http.post(offerUrl, { desc: sdp, sdp, iceCandidates })
  }

  private getOffers () {
    const signalingUrl = `${this.apiBase}/offers`
    return this.http.get<{ desc: RTCSessionDescriptionInit, iceCandidates: RTCIceCandidate[] }[]>(
      signalingUrl
    )
  }

  private postAnswer (sdp: RTCSessionDescriptionInit) {
    const url = `${this.apiBase}/offers/1/answer`
    return this.http.post(url, { desc: sdp }).subscribe(resp => {
      console.log(resp)
    })
  }

  private getAnswer () {
    const url = `${this.apiBase}/offers/1/answer`
    return this.http.get<{ desc: RTCSessionDescriptionInit }>(
      url
    )
  }
}
