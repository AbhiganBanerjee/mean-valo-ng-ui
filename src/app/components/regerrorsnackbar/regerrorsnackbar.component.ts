import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-regerrorsnackbar',
  templateUrl: './regerrorsnackbar.component.html',
  styleUrls: ['./regerrorsnackbar.component.css']
})
export class RegerrorsnackbarComponent {
  //Inject the snackBarRef to close the snackbar
  snackBarRef = inject(MatSnackBarRef);
}
