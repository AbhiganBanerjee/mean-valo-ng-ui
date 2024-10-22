import { Component, HostListener, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogoutsnackbarComponent } from '../logoutsnackbar/logoutsnackbar.component';

@Component({
  selector: 'app-arsenal',
  templateUrl: './arsenal.component.html',
  styleUrls: ['./arsenal.component.css']
})
export class ArsenalComponent implements OnInit{
  //Inject the APIService and Breakpoint & CookieService & Router & Snackbar
  constructor(private api:ApiserviceService,private brkPnt : BreakpointObserver, private cookie:CookieService,
    private router:Router, private snackBar:MatSnackBar
  ){}

  //Create a Guns array to get the guns array of JSON response and store it
  public Guns:any[] = [];

  //Breakpoint boolean
  public isScreenSize:boolean = false;

  //get the Username from cookie
  public userName:string = '';

  ngOnInit(): void {
    //Define breapoints
    this.brkPnt.observe([Breakpoints.XSmall]).subscribe(result=>{
      this.isScreenSize = result.matches;
    });

    //Get the cookie name
    this.userName = this.cookie.get('Username');
    
    //OnInit load all the Arsenal from API
    this.api.GetAllArsenal('https://mean-valorant-api.vercel.app/getAllArsenal/all').subscribe((data)=>{
      this.Guns = data;
    });
  }

  //Create an Array for type of arsenal
  public types:any[] = ['all','Sidearms', 'SMGS', 'Shotguns', 'Rifles', 'Snipers', 'Heavies', 'Melee'];

  //OnGun Type change make API call by passing the type as Path Param
  public onTypeChange(gunType:any):void{
    this.api.GetAllArsenal(`https://mean-valorant-api.vercel.app/${gunType}`).subscribe((data)=>{
      this.Guns = data;
    });
  }

  //On logout click remove the cookie, and show a pop up Snackbar for Logout ACK
  public logOutClick():void{
    //remove the existing cookie
    this.cookie.delete('Username');

    //Open the Snackbar for Log out
    this.openSnackBar();

    //redirect to the login page via Router
    this.router.navigate(['/login']);
  }

  //Create a method to open the Snackbar from external Component
  public openSnackBar():void{
    this.snackBar.openFromComponent(LogoutsnackbarComponent,{
      duration: 3*1000,
      verticalPosition : 'top',
      horizontalPosition : 'center'
    });
  }

  //Making the logic for Back to Top button
  //Make a boolean, based on which the Float back to top button will be visible
  showBackToTop: boolean = false;

  // Listen to window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show button when page is scrolled down 300px or more
    this.showBackToTop = window.pageYOffset > 300;
  }

  //Scroll to top of the page
  backToTopClick() {
    window.scrollTo(
      {
        top : 0,
        behavior : 'smooth'
      }
    );
  }
}
