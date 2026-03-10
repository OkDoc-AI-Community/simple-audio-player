import { Component, Input, ViewChild, ElementRef, signal, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonButton, 
  IonIcon, 
  IonCard, 
  IonCardContent 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { playCircleOutline, pauseCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'okdoc-simple-audio-player',
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon, IonCard, IonCardContent],
  templateUrl: './simple-audio-player.html',
  styleUrls: ['./simple-audio-player.scss'],
})
export class SimpleAudioPlayer implements AfterViewInit {
  
  // Input URL (reactive)
  @Input() set url(value: string) {
    this._url.set(value || '');
  }
  private _url = signal('');
  get url () {
    return this._url();
  }

  @ViewChild('audioRef') private audioRef!: ElementRef<HTMLAudioElement>;

  readonly isPlaying = signal(false);

  constructor() {
    // Fix for IonIcon (this was probably causing your earlier errors)
    addIcons({ playCircleOutline, pauseCircleOutline });
  }

  ngAfterViewInit() {
    // Ready for programmatic control
  }

  play() {
    this.audioRef?.nativeElement.play().catch(console.error);
  }

  pause() {
    this.audioRef?.nativeElement.pause();
  }

  toggle() {
    this.isPlaying() ? this.pause() : this.play();
  }
}
