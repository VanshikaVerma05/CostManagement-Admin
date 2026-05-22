import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackbarService, SnackbarType } from './snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {
  visible = false;
  dismissing = false;
  message = '';
  type: SnackbarType = 'info';

  private timer: ReturnType<typeof setTimeout> | null = null;
  private sub!: Subscription;

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.sub = this.snackbarService.message$.subscribe(msg => {
      this.show(msg.text, msg.type, msg.duration);
    });
  }

  private show(text: string, type: SnackbarType, duration: number): void {
    if (this.timer) clearTimeout(this.timer);
    this.message = text;
    this.type = type;
    this.dismissing = false;
    this.visible = true;
    this.timer = setTimeout(() => this.dismiss(), duration);
  }

  dismiss(): void {
    this.dismissing = true;
    setTimeout(() => { this.visible = false; this.dismissing = false; }, 300);
    if (this.timer) { clearTimeout(this.timer); this.timer = null; }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this.timer) clearTimeout(this.timer);
  }
}
