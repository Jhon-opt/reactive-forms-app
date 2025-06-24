import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'sign-up',
  imports: [JsonPipe],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent { }
