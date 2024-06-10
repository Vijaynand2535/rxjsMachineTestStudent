import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _MatSnack : MatSnackBar
  ) { }
  opensnackBar(msg : string){
      this._MatSnack.open(msg, "close" , {
        verticalPosition : 'top',
        horizontalPosition : 'center',
        duration : 1500
      })
  }
}
