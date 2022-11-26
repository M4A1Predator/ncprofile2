import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-checker',
  templateUrl: './page-checker.component.html',
  styleUrls: ['./page-checker.component.css']
})
export class PageCheckerComponent implements OnInit {

  isReady = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isReady = true
  }

  validateToken() {
    this.authService.verifyToken()
  }

}
