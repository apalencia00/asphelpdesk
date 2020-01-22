import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private routes : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(localStorage.getItem("token")!= null){
          console.log("el GUARIAN")
        return true;
          }
          else
          {
            Swal.fire(
                'Evento de Aplicacion',
                'Usted no tiene permisos para acceder a este recurso',
              'warning'
              )   

            this.routes.navigate(['/login']);
            return false;
          }
    
  }
}