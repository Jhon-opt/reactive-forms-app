import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;


  myForm = this.fb.group({
    name: ['', [Validators.required,Validators.minLength(3)]],
    myFavoriteGame: this.fb.array([
      ['Metal  Gear Solid V : The Phantom Pain',Validators.required],
      ['The Witcher 3: Wild Hunt',Validators.required],

    ], Validators.minLength(3) /** minimo de 3 juegos */),

  })

  newFavoriteGame = new FormControl('', Validators.required);
  //newFavoriteGame = this.fb.control('', Validators.required);

  get myFavoriteGame() {
    return this.myForm.get('myFavoriteGame') as FormArray;
  }


  addFavoriteGame() {
    if (this.newFavoriteGame.invalid) return
    const newGame = this.newFavoriteGame.value;
    this.myFavoriteGame.push(this.fb.control(newGame, Validators.required));

    this.newFavoriteGame.reset();

 }


  removeFavoriteGame(index: number) {
    if (index < 0 || index >= this.myFavoriteGame.length) return;
    this.myFavoriteGame.removeAt(index);
  }



  onsubmit() {
    this.myForm.markAllAsTouched();
  }
}
