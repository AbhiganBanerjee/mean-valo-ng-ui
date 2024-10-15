import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { LogoutsnackbarComponent } from '../logoutsnackbar/logoutsnackbar.component';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit{
  //Inject the breakpoint observer service & Inject the ApiService & Cookie to get cookie name
  constructor(private brkPnt : BreakpointObserver, private api:ApiserviceService, 
    private cookie:CookieService, private router:Router, private snackBar: MatSnackBar){}

  //Boolean to track screen size
  public isScreenSize:boolean = false;

  //To store all the Agents
  public Agents:any[] = [{}];

  //Creating a reference to store all the AgentRoles or types.
  public AgentTypes:any[] = [{}];

  //Create a msg to show the Username Cookie while logged in
  public cookieName:string = '';

  ngOnInit(): void {
    this.brkPnt.observe([Breakpoints.XSmall]).subscribe(result=>{
      this.isScreenSize = result.matches;
    });

    //Load all the agents 
    this.api.GetAgents('https://mean-valorant-api.onrender.com/getAllAgents/all').subscribe((data)=>{
      this.Agents = data;
    })

    //Fetch all the Agent types (sentinel, initiator,...etc) from Node-Express REST-Service
    this.api.GetAgentsTypes('https://mean-valorant-api.onrender.com/getAllTypes').subscribe((data)=>{
      this.AgentTypes = data;
    })

    //Oninit get the cookie name
    this.cookieName = this.cookie.get('Username');
  }

  //Selecting only Particular Type of Agents
  public NavClick(value:string){
    //Fetch only the particular type agents based on the path param
    this.api.GetAgents(`https://mean-valorant-api.onrender.com/${value}`).subscribe((data)=>{
      this.Agents = data;
    })
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

  //On logout click remove the cookie, and show a pop up Snackbar for Logout ACK
  public logOutClick():void{
    //remove the existing cookie
    this.cookie.delete('Username');

    //Open the Snackbar for Log out --> Work to do?
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
