import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {



  static isValidField(form:FormGroup, fieldName: string): boolean {
  const field = form.get(fieldName);
  return !!field && field.invalid && (field.touched || field.dirty);
}


static getTextError(errors: ValidationErrors){
  for(const keys of Object.keys(errors)){
      switch (keys) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `El minimo de caracteres es ${errors['minlength'].requiredLength}`;
        case 'min':
          return `El valor minimo es ${errors['min'].min}`;


      }
    }

    return null;
}



static getFieldError(form:FormGroup, fieldName: string): string | null{
    if(!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};



    return FormUtils.getTextError(errors);
  }




 static isValidFormField(form: FormArray, index : number): boolean {
    const field = form.controls[index];
  return !!field && !!field.errors && field.touched;
  }





  static getFormFieldErrorArray(form: FormArray, index: number): string | null{
    if(form.controls.length === 0) return null;

    const errors = form.controls[index].errors ?? {};



    return this.getTextError(errors);
  }


}
