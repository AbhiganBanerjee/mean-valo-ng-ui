import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { LogoutsnackbarComponent } from '../logoutsnackbar/logoutsnackbar.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{
  //Inject the ApiService
  constructor(private api:ApiserviceService, private brkPnt : BreakpointObserver,
    private cookie:CookieService, private snackBar:MatSnackBar, private router:Router
  ){}

  //Create a ref to store maps array of JSONs
  public Maps:any[] = [{}];

  //Breakpoint boolean
  public isScreenSize:boolean = false;

  //userName from cookie
  public userName:string = '';

  ngOnInit(): void {
    //Define breapoints
    this.brkPnt.observe([Breakpoints.XSmall]).subscribe(result=>{
      this.isScreenSize = result.matches;
    });

    //fetch all the maps from the backend api
    this.api.LoadMaps('https://mean-valorant-api.vercel.app/getAllMaps/all').subscribe((data)=>{
      this.Maps = data;
    });

    //Get the cookie name
    this.userName = this.cookie.get('Username');
  }

  //Making the Back to Top button
  //Make a boolean, based on which the Float back to top button will be visible
  showBackToTop: boolean = false;

  // Listen to window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show button when page is scrolled down 300px or more
    this.showBackToTop = window.pageYOffset > 300;
  }

  // Scroll to top of the page
  backToTopClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  //Create a mapType by number of sites array
  public mapSites:string[] = ['all', '3-sites', '2-sites'];

  //Map type change make API call by passing the mapType as Path Param
  public onTypeChange(mapType:any):void{
    //fetch only the specific maps from the backend api
    this.api.LoadMaps(`https://mean-valorant-api.vercel.app/getAllMaps/${mapType}`).subscribe((data)=>{
      this.Maps = data;
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
}
