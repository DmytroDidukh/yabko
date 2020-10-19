import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    public auth: AuthService,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe(res => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      }, () => {
        this.submitted = false;
      }
    );
  }
}
