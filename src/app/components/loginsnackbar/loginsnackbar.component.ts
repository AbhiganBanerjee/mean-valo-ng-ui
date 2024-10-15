import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-loginsnackbar',
  templateUrl: './loginsnackbar.component.html',
  styleUrls: ['./loginsnackbar.component.css']
})
export class LoginsnackbarComponent implements OnInit{
  //Inject the snackBarRef to handle the Snackbar closing
  public snackBarRef = inject(MatSnackBarRef);

  //Define boolean for break points
  public isScreenSize:boolean = false;

  //Inject the breakpoints
  constructor(private brkPnt : BreakpointObserver){}
  ngOnInit(): void {
    this.brkPnt.observe([Breakpoints.XSmall]).subscribe(result=>{
      this.isScreenSize = result.matches;
    })
  }
}
