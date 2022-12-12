import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-checker',
  templateUrl: './page-checker.component.html',
  styleUrls: ['./page-checker.component.css']
})
export class PageCheckerComponent implements OnInit {

  isReady = false

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.isReady = true
    // this.validateToken()
  }

  validateToken() {
    this.authService.verifyToken().subscribe({
      next: (res) => {
        this.isReady = true
      },
      error: (err: any) => {
        console.error(err)
        this.isReady = false
        this.router.navigate(['/login'])
      }
    })
  }

}
