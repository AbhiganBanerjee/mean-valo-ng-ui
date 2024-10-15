import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GuarddialogComponent } from '../components/guarddialog/guarddialog.component';

@Injectable({
  providedIn: 'root'
})
export class MapguardGuard implements CanActivate {
  //Inject the CookieService, Dialog, Router Services
  constructor(private cookie:CookieService, private dialog:MatDialog, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Check for cookie with Username, 
    if(this.cookie.check('Username')){
      //if exists then allow the route to access
      return true;
    }  
    else{
      //Store the attempted url as a localstorage to later redirect to it
      localStorage.setItem('redirectUrl',state.url); //store current URL
      
      //If cookie does not exist show an error dialog box
      this.dialog.open(GuarddialogComponent);

      //Navigate to login page after 1sec
      setTimeout(()=>{
        this.router.navigate(['/login']);
      },1000);

      //close the dialog box after 3sec
      setTimeout(()=>{
        this.dialog.closeAll();
      },3000)

      //And then return false to restrict the route access
      return false;
    }
  }  
}
