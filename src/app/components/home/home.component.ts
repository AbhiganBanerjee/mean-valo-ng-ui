import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  //Inject the breakpoint observer service
  constructor(private brkPnt : BreakpointObserver){}

  //Boolean to track screen size
  public isScreenSize:boolean = false;

  ngOnInit(): void {
    this.brkPnt.observe([Breakpoints.XSmall]).subscribe(result=>{
      this.isScreenSize = result.matches;
    })
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

  //Boolean to track button hover and change the boolean state on hover
  public isHover:boolean = false;
  public changeBtnColor():void{
    this.isHover = (this.isHover==true)?false:true;
  }
}
