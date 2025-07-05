import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'sign-up',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {


  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: ['', [Validators.pattern(FormUtils.emailPattern), Validators.required ] , [this.formUtils.checkingServerResponse]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern), FormUtils.notStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],

  },
    {
      validators: [
      this.formUtils.isFieldOneEqualToFieldTwo('password', 'confirmPassword')
      ]
    },



  )


/*isFieldOneEquealToFieldTwo(fieldOne: string, fieldTwo: string) {
  return (formGroup: AbstractControl) => {
    const fieldOneControl = formGroup.get(fieldOne)?.value;
    const fieldTwoControl = formGroup.get(fieldTwo)?.value;
    return fieldOneControl === fieldTwoControl ? null : { PasswordnotEqual: true };
  }
  }*/
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }

    console.log(this.myForm.value);
  }
}
