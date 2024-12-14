import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { getLocalStorage, setLocalStorage } from './shared/common/function';
import { EVENT } from './shared/constant/keys.constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'calendar-events';

  ngOnInit(): void {
    if (!getLocalStorage(EVENT)) setLocalStorage(EVENT, []);
  }
}
