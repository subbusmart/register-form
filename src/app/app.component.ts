import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public matchPwd:boolean=false;
  title = 'app';
  registerForm:FormGroup;

  constructor(private fb:FormBuilder){
    this.matchPwd=false;
   }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      // email: ['',Validators.compose([Validators.required,Validators.pattern("^[a-z0-9](\.?[a-z0-9]){2,}@g(oogle)?mail\.com$")])],
      email: ['',Validators.compose([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      password:['',Validators.compose([Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")])],
      confirmPassword:['',Validators.compose([Validators.required])],
      isTCAccepted:['',[Validators.requiredTrue]],
      phone: this.fb.array([
        this.addPhoneFormGroup()
      ])
    })
 }

  addPhone(){
    (<FormArray>this.registerForm.get('phone')).push(this.addPhoneFormGroup());
  }

  addPhoneFormGroup():FormGroup{
   return this.fb.group({
    phoneNo: ['', [Validators.required]]
  })
  }

  deletePhone(phoneIndex:number){
    (<FormArray>this.registerForm.get('phone')).removeAt(phoneIndex);
    console.log(phoneIndex)
  }

  MatchPasswords(){
    let pwd = this.registerForm.get('password').value;
    let confirmPwd = this.registerForm.get('confirmPassword').value;
    if(confirmPwd.length!==0 && pwd!==confirmPwd){
        console.log("password incorrect");
        this.matchPwd=true;
    }
    else{
      this.matchPwd=false;
    }
  }
  
  registrationForm(data){
   console.log("Registration form data is",data)
  }

  }
