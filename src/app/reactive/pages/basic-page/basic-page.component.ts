import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    name: ['',[Validators.required,Validators.minLength(3)] /** validadores sincronos*/,[]/** validadores asincronos*/],
    price: [0 , [Validators.required,Validators.min(10)]],
    inStock: [0,[Validators.required,Validators.min(0)]],
  })


  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStock: new FormControl(0),
  // });


//   isValidField(fieldName: string): boolean {
//   const field = this.myForm.get(fieldName);
//   return !!field && field.invalid && (field.touched || field.dirty);
// }




  // getFieldError(fieldName: string): string | null{
  //   if(!this.myForm.controls[fieldName]) return null;

  //   const errors = this.myForm.controls[fieldName].errors ?? {};

  //   for(const keys of Object.keys(errors)){
  //     switch (keys) {
  //       case 'required':
  //         return 'Este campo es requerido';
  //       case 'minlength':
  //         return `El minimo de caracteres es ${errors['minlength'].requiredLength}`;
  //       case 'min':
  //         return `El valor minimo es ${errors['min'].min}`;


  //     }
  //   }

  //   return null;
  // }








  onSubmit() {
    if (this.myForm.invalid) {
       this.myForm.markAllAsTouched();
             return;
    }


    console.log(this.myForm.value);

    this.myForm.reset({
      name: '',
      price: 0,
      inStock: 0
    });


    // this.myForm.reset(); // Resetea todo el formulario a sus valores iniciales
  }

}
