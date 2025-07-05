import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/contry.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {


  fb = inject(FormBuilder);

  countryService = inject(CountryService);
  regions = signal(this.countryService.regionsList);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);
  myForm = this.fb.group({
    region: ['',Validators.required],
    country: ['',Validators.required],
    border: ['',Validators.required],

  });
// estudiar bien esto
  onFormChanged = effect((onCleanup) => {
    const regionSubcristionChanged = this.onReginChange();
    const countrySub = this.onCountryChange();
     onCleanup(() => {
    regionSubcristionChanged.unsubscribe();
    countrySub.unsubscribe();
    console.log('Unsubscribed from region changes');
  })
  });


  onReginChange() {
    return this.myForm.get('region')!.valueChanges.pipe(

      tap(
      ()=>  this.myForm.get('country')!.setValue('')),
        tap(
      ()=>  this.myForm.get('border')!.setValue('')),
      tap(
      ()=> {
        this.borders.set([]),
    this.countriesByRegion.set([])
      }
    ),
    switchMap((region) => this.countryService.getcountriesByRegion(region ?? '') ),

   ).subscribe(countries => {
    console.log({countries});
    this.countriesByRegion.set(countries);
    } );

  }

  onCountryChange() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((alphaCode) =>
          this.countryService.getCountryByAplhaCode(alphaCode ?? '')
        ),
        switchMap((country) =>
          this.countryService.getCountriesNameByCodeArray(country.borders)
        )
      )
      .subscribe((borders) => {
        console.log({ borders });
        this.borders.set(borders);
      });
  }



}
