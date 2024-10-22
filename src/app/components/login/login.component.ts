import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogindialogComponent } from '../logindialog/logindialog.component';
import {MatSnackBar,MatSnackBarRef} from '@angular/material/snack-bar';
import { LoginsnackbarComponent } from '../loginsnackbar/loginsnackbar.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  //Inject the breakpoint observer service & Inject the ApiService and FormBuilder & CookieService & Snackbar
  constructor(private brkPnt : BreakpointObserver, private api:ApiserviceService, 
    private fb : FormBuilder, private cookie:CookieService, private router:Router,
    public dialog: MatDialog, private snackBar: MatSnackBar
  ){}

  //Boolean to track screen size
  public isScreenSize:boolean = false;

  ngOnInit(): void {
    this.brkPnt.observe([Breakpoints.XSmall]).subscribe(result=>{
      this.isScreenSize = result.matches;
    })

    //Get all the users from api 
    this.api.GetAllUsers('https://mean-valorant-api.vercel.app/getAllUsers').subscribe((data)=>{
      this.Users = data;
    }) 
  }

  //Boolean to show the "eye" logo for password field
  public hide:boolean = true;
  public showEye = ():void => {
    this.hide = !this.hide;
  }

  //Change form Theme
  public isTheme:boolean = false;
  public changeFormTheme = ():void =>{
    this.isTheme = (this.isTheme==false)?true:false;
  }

  //Create the reactive form
  public frmLogin = this.fb.group({
    Username : this.fb.control('', [Validators.required,Validators.minLength(4)]),
    Password : this.fb.control('', [Validators.required,Validators.minLength(4)])
  })
  //Create 2 getters to get controls as FormControl to access all control options
  get Username(){
    return this.frmLogin.get('Username') as FormControl;
  }
  get Password(){
    return this.frmLogin.get('Password') as FormControl;
  }

  //On handleSubmit, check for the username and pwd then create cookie
  public Users:any[] = [{}];
  public handleSubmit = (obj:any):void => {
    //Create a boolean to track login success or failed
    let flag:boolean = false;

    //For user check if the username and pwd matching or not
    for(var user of this.Users){
      if((user.Username == obj.Username) && (user.Password == obj.Password)){
        //If matches then set Cookie 
        this.cookie.set("Username",obj.Username);

        //Open up a pop up message or Snackbar of success login
        this.openSnackBar();

        //& navigate to the redirectUrl page the User requested for which
        this.router.navigate([`/${localStorage.getItem('redirectUrl')}`]);

        //Clear the URL from localstorage
        localStorage.removeItem('redirectUrl');
        
        //Toogle the boolean and mark as Success Login
        flag = true;
        break;
      }
    }
    //Now check if the flag is false that means Login error
    if(!flag){
      //Take some time and then show the Login Error msg in a Dialog
      setTimeout(()=>{
        this.dialog.open(LogindialogComponent);
      },500);

      //And auto-close the dialog after 3.5 sec
      setTimeout(()=>{
        this.dialog.closeAll();
      },3500);
    }
  }

  //Create a method to handle the Snackbar opening
  openSnackBar() {
    //open the Login Snackbar component
    this.snackBar.openFromComponent(LoginsnackbarComponent,{
      duration: 3*1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
