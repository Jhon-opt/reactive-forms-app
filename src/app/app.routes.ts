import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'reactive',
    loadChildren: () => import('./reactive/reactive.routes').then((m)=> m.reactiveroutes),

  },
  {path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),

  },
  {path: 'country',
    loadChildren: () => import('./country/country.routes').then((m)=>m.countryroutes),

  },

  {path: '**',
    redirectTo: 'reactive',
  },
];
