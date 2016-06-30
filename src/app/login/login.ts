import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup } from '@angular/common';
import { LoginService } from '../login.service';

@Component({
  selector: 'login',
  directives: [FORM_DIRECTIVES],
  template: require('./login.html'),
  styles: [require('./login.css')]
})

export class Login implements OnInit {
  myForm: ControlGroup;

  constructor(public loginService: LoginService, fb: FormBuilder, public appState: AppState) {
    this.myForm = fb.group({
      'email': [],
      'password': []
    })
  }
  

  ngOnInit() {


  }  

  onSubmit(form: any): void {
    console.log('success', form.email);
    // this.loginService.url = `http://127.0.0.1:3333/users?email=${form.email}`;
    console.log(this.loginService.email);
    this.loginService.login(form)
                           .subscribe(
                            result => {
                              localStorage.setItem('tkn', result[0].access_token);
                              localStorage.setItem('exp', result[0].expires_at);
                            },
                            error => console.log(error));
  }

  signupRoute() {
    this.appState.login = false;
    this.appState.signup = true;
  }



}