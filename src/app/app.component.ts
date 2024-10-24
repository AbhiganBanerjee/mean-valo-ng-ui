import { Component, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mean-stack-first-app';

  //Inject the breakpoint observer service
  constructor(private brkPnt : BreakpointObserver){}

  //Boolean to track screen size
  public isScreenSize:boolean = false;

  ngOnInit(): void {
    this.brkPnt.observe([Breakpoints.XSmall]).subscribe(result=>{
      this.isScreenSize = result.matches;
    })
  }
}
