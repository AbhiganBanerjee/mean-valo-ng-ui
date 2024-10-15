import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logoutsnackbar',
  templateUrl: './logoutsnackbar.component.html',
  styleUrls: ['./logoutsnackbar.component.css']
})
export class LogoutsnackbarComponent {
  public snackBarRef = inject(MatSnackBar);
}
