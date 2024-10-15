import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-materialdemo1',
  templateUrl: './materialdemo1.component.html',
  styleUrls: ['./materialdemo1.component.css']
})
export class Materialdemo1Component implements OnInit{

  //Inject the breakpoint observer service
  constructor(private brkPnt : BreakpointObserver){}

  //Boolean to tract screen size
  public isScreenSize:boolean = false;

  ngOnInit(): void {
    this.brkPnt.observe([Breakpoints.Handset]).subscribe(result=>{
      this.isScreenSize = result.matches;
    })
  }
}
