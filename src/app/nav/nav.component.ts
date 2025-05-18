import { Component, signal, effect, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit, OnDestroy {
  // Create a signal to store the current time string
  ans = signal(this.getCurrentTime());

  private timer: any;

  ngOnInit(): void {
    // Update the signal every second
    this.timer = setInterval(() => {
      this.ans.set(this.getCurrentTime());
    }, 1000);
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    clearInterval(this.timer);
  }

  private getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}
