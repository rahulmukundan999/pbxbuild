import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { RegisterService } from './register.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
name: any;
password: any;
email: any;
phone : any;
plan: any;
dis = true;
exist = false;
  constructor(private router:Router, private registerservice: RegisterService,
  private auth: AuthService) { }

  ngOnInit() {
    //this.initConfig();
    if(this.auth.isLoggednIn()) {
      this.router.navigate(['extension']);
    }
  }
 
  save()
  {
    //this.router.navigate(['payment']);
    //this.initConfig();
    this.dis = false; 
  console.log(this.name,this.password); 
  const user = {
    name: this.name,
    password: this.password,
    email: this.email,
    phone:this.phone
  };
  //this.registerservice.payment(user).subscribe(data=>{
    //console.log(data);
    //if(data.status === 200) {
      //window.location.href = data.url;
      this.registerservice.addUser(user)
      .subscribe(reg=>{
        console.log(reg);
        this.dis = true;
       if(reg === 100) {
         console.log('Added');
         alert('Added Successfully');
        this.router.navigate(['/login']);
       }
       else if(reg === 500) {
         alert('User Exist')
       }
      });
       
  console.log(user);
  }
  nav() {
    this.router.navigate(['login']);
  }
}
