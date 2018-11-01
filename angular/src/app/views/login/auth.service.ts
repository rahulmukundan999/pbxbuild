import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  constructor(private myRoute: Router) { }
  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  sendId(token: string) {
    localStorage.setItem("UserId", token)
  }
  getId() {
    return localStorage.getItem("UserId")
  }
  sendTokenid(token: string) {
    localStorage.setItem("Token", token)
  }
  getTokenid() {
    return localStorage.getItem("Token")
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("UserId");
    this.myRoute.navigate(["login"]);
  }

}