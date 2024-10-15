import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-registersuccesssnackbar',
  templateUrl: './registersuccesssnackbar.component.html',
  styleUrls: ['./registersuccesssnackbar.component.css']
})
export class RegistersuccesssnackbarComponent implements OnInit{
  constructor(private brkPnt : BreakpointObserver){}

  public isScreenSize:boolean = false;
  ngOnInit(): void {
    //define screen breakpoint
    this.brkPnt.observe([Breakpoints.XSmall]).subscribe(result=>{
      this.isScreenSize = result.matches;
    });
  }

  //Inject the ref
  public snackBarRef = inject(MatSnackBarRef);
}
