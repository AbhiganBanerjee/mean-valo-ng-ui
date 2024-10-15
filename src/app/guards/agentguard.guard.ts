import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GuarddialogComponent } from '../components/guarddialog/guarddialog.component';

@Injectable({
  providedIn: 'root'
})
export class AgentguardGuard  {
  //Inject the cookieService to check cookies
  //Inject the Router module to navigate dynamically among pages
  constructor(private cookie:CookieService, private router:Router, private dialog:MatDialog){}

  //Create a method to open the Dialog 
  openDialog() {
    this.dialog.open(GuarddialogComponent);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.cookie.check("Username")){
      //return true so that Agent page comes
      return true;
    }else{
      //Store the attempted url as a localstorage to later redirect to it
      localStorage.setItem('redirectUrl',state.url); //store current URL

      //Give an alert for login
      this.openDialog();

      //navigate to /login page as cookie is not present with some delay
      setTimeout(()=>{
        this.router.navigate(['/login']);
      },1000);

      //Close the Dialog also
      setTimeout(()=>{
        this.dialog.closeAll();
      },3000)

      //Restrict the agent route access
      return false;
    }
  }
}
