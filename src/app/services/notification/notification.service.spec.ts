import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

describe('NotificationService', () => {
  let service: NotificationService;
  let nzNotificationSpy: jasmine.SpyObj<NzNotificationService>;

  beforeEach(() => {
    const notificationMock = jasmine.createSpyObj('NzNotificationService', ['create']);

    TestBed.configureTestingModule({
      providers: [{ provide: NzNotificationService, useValue: notificationMock }],
    });

    service = TestBed.inject(NotificationService);
    nzNotificationSpy = TestBed.inject(NzNotificationService) as jasmine.SpyObj<NzNotificationService>;
  });

  it('SHOULD be created WHEN ever', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD create a success notification with default duration WHEN called', () => {
    // Arrange

    // Act
    service.createNotification('success', 'Success Title', 'Success Message');

    // Assert
    expect(nzNotificationSpy.create).toHaveBeenCalledWith('success', 'Success Title', 'Success Message', {
      nzDuration: 3000,
      nzStyle: { borderRadius: '10px' },
    });
  });

  it('SHOULD create an error notification with custom duration WHEN called', () => {
    // Arrange

    // Act
    service.createNotification('error', 'Error Title', 'Error Message', 5000);

    // Assert
    expect(nzNotificationSpy.create).toHaveBeenCalledWith('error', 'Error Title', 'Error Message', {
      nzDuration: 5000,
      nzStyle: { borderRadius: '10px' },
    });
  });

  it('SHOULD create an info notification with default duration WHEN called', () => {
    // Arrange

    // Act
    service.createNotification('info', 'Info Title', 'Info Message');

    // Assert
    expect(nzNotificationSpy.create).toHaveBeenCalledWith('info', 'Info Title', 'Info Message', {
      nzDuration: 3000,
      nzStyle: { borderRadius: '10px' },
    });
  });

  it('SHOULD create a warning notification with custom duration WHEN called', () => {
    // Arrange

    // Act
    service.createNotification('warning', 'Warning Title', 'Warning Message', 10000);

    // Assert
    expect(nzNotificationSpy.create).toHaveBeenCalledWith('warning', 'Warning Title', 'Warning Message', {
      nzDuration: 10000,
      nzStyle: { borderRadius: '10px' },
    });
  });
});
