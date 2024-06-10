import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Istd } from 'src/app/models/student.interface';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-std-table',
  templateUrl: './std-table.component.html',
  styleUrls: ['./std-table.component.scss']
})
export class StdTableComponent implements OnInit {

  stdInfo : Array<Istd> = []

  constructor(
   private _studentsServices : StudentsService,
   private _matsnack :SnackbarService
  ) { }

  ngOnInit(): void {
    this.stdInfo = this._studentsServices.fetchAllstudents()
  }
  onEdit(sname : Istd ){
    this._studentsServices.stdeditandupdate$.next(sname)
  }
  ondelete(std : Istd){
    this._studentsServices.delete(std)
    this._matsnack.opensnackBar(`${std.fname}  ${std.lname} is deleted `)

  }
}
