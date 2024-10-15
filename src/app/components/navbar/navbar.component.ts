import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  //Inject the breakpoint observer service
  constructor(private brkPnt : BreakpointObserver){}

  //Boolean to track screen size
  public isScreenSize:boolean = false;
  public isSmall:boolean = false;
  ngOnInit(): void {
    this.brkPnt.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Tablet]).subscribe(result=>{
      this.isScreenSize = result.breakpoints[Breakpoints.XSmall];
      this.isSmall = result.breakpoints[Breakpoints.Small];
    })

    //set the normal image src while component loading
    this.imgSrc = '/assets/valorant_white.png';
    this.textSrc = 'https://fontmeme.com/permalink/240820/628714c5e37ed20c1cbb3dec5f3b1067.png';
  }

  events: string[] = [];
  opened: boolean = false;

  //Handle Hovering of Image also hoverout
  public imgSrc:string = '';
  public textSrc:string = ''
  public HoverImage(){
    this.imgSrc = '/assets/val_logo.png';
    this.textSrc = 'https://fontmeme.com/permalink/240820/44b89dac3c03197de7b606bf8cc85f88.png';
  }
  public OutImage(){
    this.imgSrc = '/assets/valorant_white.png';
    this.textSrc = 'https://fontmeme.com/permalink/240820/628714c5e37ed20c1cbb3dec5f3b1067.png';
  }

  //Create a array of object that will represent the nav options
  public Navs:any[]=[
    {"path":"home", "icon":"home"},
    {"path":"agents","icon":"people"},
    {"path":"maps","icon":"map"},
    {"path":"arsenal","icon":"shield"}
  ]
}
