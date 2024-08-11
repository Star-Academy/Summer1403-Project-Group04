import { Routes } from '@angular/router';
import { AuthComponent } from './page/auth/auth.component';

export const routes: Routes = [{
    path: 'authentication/:action',
    component: AuthComponent
}];
