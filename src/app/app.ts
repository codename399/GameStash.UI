import { Component, signal } from '@angular/core';
import { GameDetailComponent } from '../components/game-detail/game-detail.component';

@Component({
  selector: 'app-root',
  imports: [GameDetailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GameStash');
}
