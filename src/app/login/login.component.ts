import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly WRONG_CREDENTIALS: string = 'Invalid user name or password';
  private readonly destroy$ = new Subject();
  errorMessage: string;


  constructor(private formBuilder: FormBuilder,
              public userService: UserService,
              private router: Router) {
  }

  loginForm = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
    this.router.events.subscribe((value) => {
      this.errorMessage = undefined;
    });
  }

  onSubmit() {
    this.userService.getUserByName(this.loginForm.controls['name'].value).pipe(takeUntil(this.destroy$)).subscribe(items => {
      this.errorMessage = undefined;
      if (items.length === 0) {
        this.errorMessage = this.WRONG_CREDENTIALS;
        return;
      } else {
        const userToAuthenticate = items[0];
        if (!this.userService.authenticate(userToAuthenticate, this.loginForm.controls['password'].value)) {
          this.errorMessage = this.WRONG_CREDENTIALS;
        }
      }
    });
  }

  logout() {
    this.userService.resetAuthenticatedUser();
    this.loginForm.reset();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
