import { Injectable } from '@angular/core';
import { Istd } from '../models/student.interface';
import { Subject } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {


  stdadd$ : Subject<Istd> =  new Subject()
  stdeditandupdate$ : Subject<Istd> =  new Subject()

  stdArr : Array<Istd> = [
    {
      fname : "Raj",
      lname : "Sharma",
      email : "raj@gmail.com",
      contact : "8785968547",
      stdId : "1"
    },
    {
      fname : "Rohit",
      lname : "Sharma",
      email : "rohit@gmail.com",
      contact : "988592547",
      stdId : "2"
    },
  ]

  constructor(
    private _matsnack : SnackbarService
  ) { 
    this.stdadd$
    .subscribe(res => {
      this.stdArr.push(res)
    })
  }

 
  fetchAllstudents() : Array<Istd>{
  return this.stdArr

  }

  update( updateObj : Istd){
    let getIndex = this.stdArr.findIndex(std => std.stdId === updateObj.stdId)

    this.stdArr[getIndex] = updateObj
  }

  delete(sname : Istd){
    let getIndex = this.stdArr.findIndex(todo => todo.stdId === todo.stdId)
    this.stdArr.splice(getIndex,1)
  }
}
