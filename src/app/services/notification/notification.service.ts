import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  createNotification(
    type: 'success' | 'error' | 'info' | 'warning',
    title: string,
    message: string,
    duration = 3000,
  ): void {
    this.notification.create(type, title, message, {
      nzDuration: duration,
      nzStyle: {borderRadius: '10px'},
    });
  }
}
