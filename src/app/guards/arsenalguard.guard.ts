import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GuarddialogComponent } from '../components/guarddialog/guarddialog.component';

@Injectable({
  providedIn: 'root'
})
export class ArsenalguardGuard  {
  //Inject the CookieService & Router & matdialog to open dialog
  constructor(private cookie:CookieService, private router:Router, private dialog:MatDialog){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Check if cookie exists or not
    if(this.cookie.check('Username')){
      //Exists then access the route
      return true;
    }else{
      //Store the attempted url as a localstorage to later redirect to it
      localStorage.setItem('redirectUrl',state.url); //store current URL
        
      //Open the Login Required dialog 
      this.dialog.open(GuarddialogComponent);

      //Cookie does not exist so navigate to login page with in 1sec
      setTimeout(()=>{
        this.router.navigate(['/login'])
      },1000);

      //Close the login dialog after 3.5sec
      setTimeout(()=>{
        this.dialog.closeAll();
      },3500);

      //Return false to restrict access to the route
      return false;
    }
  }
}
