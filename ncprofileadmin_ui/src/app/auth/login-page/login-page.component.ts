import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCred } from 'src/app/models/login-cred';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const loginCred = new LoginCred(this.loginForm.get('username')?.value as string, this.loginForm.get('password')?.value as string)
    if (!loginCred.password || !loginCred.password) {
      return
    }
    this.authService.login(loginCred).subscribe(res => {
      this.router.navigate(['/'])
    })
  }
}
