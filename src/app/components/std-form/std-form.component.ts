import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Istd } from 'src/app/models/student.interface';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentsService } from 'src/app/services/students.service';
import { UuidService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit {
  stdForm !: FormGroup
  editMode : boolean = false
  idget !: Istd
  constructor(
    private _generateuuid : UuidService,
    private _stdservice : StudentsService,
    private _matsnack : SnackbarService

  ) { }

  ngOnInit(): void {
    this.createStdForm()
    this._stdservice.stdeditandupdate$
    .subscribe(res => {
      this.idget = res,
      this.editMode = true
      this.stdForm.patchValue(res)
    })
  }


  createStdForm(){
    this.stdForm = new FormGroup({
      fname : new FormControl(null,[Validators.required]),
      lname : new FormControl(null,[Validators.required]),
      email : new FormControl(null,[Validators.required]),
      contact : new FormControl(null,[Validators.required]),
      

    })
  }

  onAdd(){
    if(this.stdForm.valid){
      let obj : Istd = {...this.stdForm.value, stdId : this._generateuuid.generateUuid()}
      this._stdservice.stdadd$.next(obj)
      this.stdForm.reset()
      this._matsnack.opensnackBar(`${obj.fname}  ${obj.lname} is Added `)
    }
  }
  onupdate(){
      if(this.stdForm.valid){
        let obj : Istd = {...this.stdForm.value, stdId : this.idget.stdId}
        this._stdservice.update(obj)
        this.editMode = false
        this.stdForm.reset()
      this._matsnack.opensnackBar(`${obj.fname}  ${obj.lname} is upadted `)

      }
  }
}
