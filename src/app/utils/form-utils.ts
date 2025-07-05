import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";





async function sleep(){
  return new Promise(resolve => setTimeout(()=>resolve(true), 2500));
}




export class FormUtils {

  //Expresiones regulares para validar campos de formulario
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';


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
        case 'email':
        return 'Debe ingresar un correo electrónico válido';

        case 'emailExists':
          return 'El correo electrónico ya existe, por favor ingrese otro';
        //CASE para errores de expresiones regulares
        case 'pattern':
          if(errors['pattern'].requiredPattern === FormUtils.emailPattern){
            return 'Debe ingresar un correo electrónico válido';

          }
          return 'El formato del campo no es válido';


        case 'notStrider':
          return 'El nombre de usuario no puede ser "strider"';

        default:
          return `Campo no válido ${keys}`;
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


  static isFieldOneEqualToFieldTwo( fieldOne: string, fieldTwo: string): ValidationErrors | null {
    return (formGroup: AbstractControl) => {
    const fieldOneControl = formGroup.get(fieldOne)?.value;
    const fieldTwoControl = formGroup.get(fieldTwo)?.value;
    return fieldOneControl === fieldTwoControl ? null : { PasswordnotEqual: true };
  }
  }


  static async checkingServerResponse(control: AbstractControl):Promise<ValidationErrors | null> {
    console.log('Validando si el email existe en el servidor...');
    await sleep();
    const value = control.value;
    if(value === 'hola@mundo.com'){
      return { emailExists: true };
    }

    return null
  }



  static notStrider (control: AbstractControl): ValidationErrors | null {

    const value = control.value;
    if(value === 'strider'){
      return { notStrider: true };
    }

    return null;
  }

}
