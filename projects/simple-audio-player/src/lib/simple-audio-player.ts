import { ChangeDetectionStrategy, Component, model, signal, viewChild, ElementRef, inject } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { playCircleOutline, pauseCircleOutline } from 'ionicons/icons';
import { OkDocPlugin, McpTool, McpToolResult } from '@okdoc-ai/plugin-sdk';
import { OkDocNotifier } from '@okdoc-ai/plugin-sdk/angular';

@OkDocPlugin({
  id: 'odc-okdoc-simple-audio-player',
  name: 'Simple Audio Player',
  description: 'A basic audio player that can play, pause, and load audio files via URL.',
  version: '0.0.8',
  icon: 'musical-notes-outline',
  namespace: 'odc-okdoc-simple-audio-player',
})
@Component({
  selector: 'odc-simple-audio-player',
  imports: [IonButton, IonIcon, IonCard, IonCardContent],
  templateUrl: './simple-audio-player.html',
  styleUrls: ['./simple-audio-player.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OdcSimpleAudioPlayer {

  // Sample Audio:
  // https://s3.amazonaws.com/citizen-dj-assets.labs.loc.gov/audio/items/loc-fma/fma-164281.mp3
  // Sample audio repo:
  // https://citizen-dj.labs.loc.gov/loc-fma/use/

  url = model('');

  isPlaying = signal(false);

  private audioRef = viewChild.required<ElementRef<HTMLAudioElement>>('audioRef');

  private notifier = inject(OkDocNotifier);

  constructor() {
    addIcons({ playCircleOutline, pauseCircleOutline });
  }

  @McpTool({ name: 'play_audio', description: 'Start or resume audio playback' })
  async play(): Promise<McpToolResult> {
    this.audioRef().nativeElement.play().catch(console.error);
    return { content: [{ type: 'text', text: 'Playing audio' }] };
  }

  @McpTool({ name: 'pause_audio', description: 'Pause audio playback' })
  async pause(): Promise<McpToolResult> {
    this.audioRef().nativeElement.pause();
    return { content: [{ type: 'text', text: 'Paused audio' }] };
  }

  @McpTool({
    name: 'set_url',
    description: 'Set the audio URL and load a new track',
    inputSchema: {
      type: 'object',
      properties: { url: { type: 'string', description: 'The URL of the audio file to play' } },
      required: ['url'],
    },
  })
  async setUrl(args: Record<string, unknown>): Promise<McpToolResult> {
    this.url.set(args['url'] as string);
    this.notifier.notify('Audio URL loaded', 'audio_player');
    return { content: [{ type: 'text', text: `Audio URL set to ${this.url()}` }] };
  }

  toggle() {
    this.isPlaying() ? this.pause() : this.play();
  }
}
