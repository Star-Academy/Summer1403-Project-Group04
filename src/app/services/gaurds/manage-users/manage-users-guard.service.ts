import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PermisionsService } from '../../permisisons/permisions.service';

@Injectable({
  providedIn: 'root',
})
export class ManageUsersGuardService {
  constructor(
    private router: Router,
    private permissionService: PermisionsService
  ) {}

  canActivate(): boolean {
    if (this.permissionService.getPermissions().indexOf('/api/Admin/GetAllUser') !== -1) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
