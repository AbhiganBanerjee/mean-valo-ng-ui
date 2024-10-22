import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistersuccesssnackbarComponent } from '../registersuccesssnackbar/registersuccesssnackbar.component';
import { RegerrorsnackbarComponent } from '../regerrorsnackbar/regerrorsnackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  //Inject the breakpoint observer service & Inject the ApiService and FormBuilder & Snackbar & Router
  constructor(private brkPnt : BreakpointObserver, private fb : FormBuilder, 
    private api:ApiserviceService, private snackBar:MatSnackBar, private router:Router){}

  //Boolean to track screen size
  public isScreenSize:boolean = false;

  //To Store the countries
  public Countries:any[] = [{}];

  ngOnInit(): void {
    //define screen breakpoint
    this.brkPnt.observe([Breakpoints.XSmall]).subscribe(result=>{
      this.isScreenSize = result.matches;
    })

    //Load the list of countries for the drop-down of form
    this.api.GetAllCountries('https://mean-valorant-api.vercel.app/getAllCountries').subscribe((data)=>{
      this.Countries = data[0].data;
    });

    //Load all the registers users on page startup
    this.api.GetAllUsers('https://mean-valorant-api.vercel.app/getAllUsers').subscribe((data)=>{
      this.Users = data;
    });    
  }

  //Perform the Change Theme Color operation of the form via a boolen
  public isTheme:boolean = false;
  public handleTheme = ():void =>{
    this.isTheme = (this.isTheme==true)?false:true;
  }

  //Perform the show password and hide password
  public isHide:boolean = false;
  public isHide2:boolean = false;
  public handleEye = ():void =>{
    //on eye click we toggle the boolean
    this.isHide = (this.isHide==false)?true:false;
  }
  public handleEye2 = ():void =>{
    //on eye click we toggle the boolean
    this.isHide2 = (this.isHide2==false)?true:false;
  }

  /*Design the reactive form*/
  public frmRegister = this.fb.group({
    Username : this.fb.control('',[Validators.required, Validators.minLength(4)]),
    Password : this.fb.control('',[Validators.required, Validators.minLength(4)]),
    RePassword : this.fb.control('',[Validators.minLength(4),Validators.required]),
    Age : this.fb.control(15,[Validators.required]),
    Country : this.fb.control('',[Validators.required])
  })
  //Create accessors to get FormControls
  get Username(){
    return this.frmRegister.get('Username') as FormControl;
  }
  get Password(){
    return this.frmRegister.get('Password') as FormControl;
  }
  get RePassword(){
    return this.frmRegister.get('RePassword') as FormControl;
  }
  get Age(){
    return this.frmRegister.get('Age') as FormControl;
  }
  get Country(){
    return this.frmRegister.get('Country') as FormControl;
  }

  //Perform matching of password operation
  public isPwdMisMatch:boolean = false;
  public isPwdMatched:boolean = false;
  public matchPassword = ()=>{
    if(this.RePassword.value != this.Password.value){
      this.isPwdMisMatch = true;
      this.isPwdMatched = false;
    }
    else{
      this.isPwdMisMatch = false;  
      this.isPwdMatched = true;
    }
  }

  //Check if the Username exists already or not based on that give msg
  public isUsernameExists:boolean = false;
  public isUsernameNotExists:boolean = false;
  public Users:any[] = [];
  public userNameErrMsg:string = '';
  //On keyup check if the username taken or available
  public checkUsernameExistance = ():void =>{
    //Iterate through the Users array and check for Matching username
    for(let user of this.Users){
      //Check if username matching with the entered value or not
      if(user.Username == this.Username.value){
        //Change the Booleans
        this.isUsernameExists = true;
        this.isUsernameNotExists = false;
        this.userNameErrMsg = this.Username.value +' already taken!'
        break;
      }else{
        this.isUsernameExists = false;
        this.isUsernameNotExists = true;
      }
    }
  }

  //Handle Validation on the Age field
  public isAgeErr:boolean = false;
  public isAgeOk:boolean = false;
  public verifyAge():void{
    if(Number(this.Age.value)<=0 || Number(this.Age.value)<15 || Number(this.Age.value)>120){
      this.isAgeErr = true;
      this.isAgeOk = false;
    }
    else if(isNaN(this.Age.value)){
      this.isAgeErr = true;
      this.isAgeOk = false;
    }   
    else{
      this.isAgeErr = false;
      this.isAgeOk = true;
    }
  }

  /*Handle onsubmit of the registration form*/
  public handleRegSubmit = (obj:any)=>{
    console.log(obj);

    //Onsubmit we make the POST mode API call to insert the User in DB
    this.api.RegUser('https://mean-valorant-api.vercel.app/registerUsers/',obj).subscribe((data)=>{
      //Get the code coming from the response
      console.log(data.code);

      //Based on the code perform actions
      if(data.code == 201){
        //Open the RegisterSuccessSnackbar Component
        this.openSnackBar(RegistersuccesssnackbarComponent);

        //And Navigate to the Login page Dynamically with in 1sec
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },1000);
      }else{
        //Open the RegisterErrorSnackbar Component
        this.openSnackBar(RegerrorsnackbarComponent);

        //And then navigate to the Register page itself
        setTimeout(()=>{
          this.router.navigate(['/register']);
        },1000);
      }
    });
  }

  //Create a method to open Snackbar
  public openSnackBar(SnackbarComponent:any):void{
    this.snackBar.openFromComponent(SnackbarComponent,{
      duration:3*1000,
      horizontalPosition:'center',
      verticalPosition:'top'
    })
  }
}


