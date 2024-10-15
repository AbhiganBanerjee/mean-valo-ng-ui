import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guarddialog',
  templateUrl: './guarddialog.component.html',
  styleUrls: ['./guarddialog.component.css']
})
export class GuarddialogComponent implements OnInit{
  constructor(private brkPnt : BreakpointObserver){}

  //Boolean to track screen size
  public isScreenSize:boolean = false;

  ngOnInit(): void {
    this.brkPnt.observe([Breakpoints.XSmall]).subscribe(result=>{
      this.isScreenSize = result.matches;
    })
  }
}
