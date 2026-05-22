import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type SnackbarType = 'info' | 'success' | 'warning' | 'error';

export interface SnackbarMessage {
  text: string;
  type: SnackbarType;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private trigger = new Subject<SnackbarMessage>();
  readonly message$ = this.trigger.asObservable();

  show(text: string, type: SnackbarType = 'info', duration = 4500): void {
    this.trigger.next({ text, type, duration });
  }
}
