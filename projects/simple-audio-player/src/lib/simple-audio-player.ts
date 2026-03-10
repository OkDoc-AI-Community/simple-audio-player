import { ChangeDetectionStrategy, Component, Input, ViewChild, ElementRef } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleAudioPlayer {

  // Sample Audio:
  // https://s3.amazonaws.com/citizen-dj-assets.labs.loc.gov/audio/items/loc-fma/fma-164281.mp3
  // Sample audio repo:
  // https://citizen-dj.labs.loc.gov/loc-fma/use/

  @Input() url = '';

  @ViewChild('audioRef') private audioRef!: ElementRef<HTMLAudioElement>;

  isPlaying = false;

  constructor() {
    addIcons({ playCircleOutline, pauseCircleOutline });
  }

  play() {
    this.audioRef?.nativeElement.play().catch(console.error);
  }

  pause() {
    this.audioRef?.nativeElement.pause();
  }

  toggle() {
    this.isPlaying ? this.pause() : this.play();
  }
}
