import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisionsService {
  private permissionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public permissions$: Observable<string[]> = this.permissionsSubject.asObservable();

  constructor() { }

  setPermissions(permissions: string[]): void {
    this.permissionsSubject.next(permissions);
  }

  getPermissions(): string[] {
    return this.permissionsSubject.value;
  }

  clearPermissions(): void {
    this.permissionsSubject.next([]);
  }
}
