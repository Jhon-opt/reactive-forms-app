import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {
//en el app.config tienes que proveer providehttpclient primero
//injectar ahora el httpclient
private baseurl = 'https://restcountries.com/v3.1'
private http = inject(HttpClient);

private regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

get regionsList(): string[] {
  return [...this.regions];
}


getcountriesByRegion(region : string) :Observable<Country[]> {
  if(!region) return of ([])

    console.log({region});

    const url = `${this.baseurl}/region/${region}?fields=name,cca3,borders`;
    return this.http.get<Country[]>(url);

}

getCountryByAplhaCode(alphaCode: string): Observable<Country > {


  const url = `${this.baseurl}/alpha/${alphaCode}?fields=name,cca3,borders`;
    return this.http.get<Country>(url);
}

getCountriesNameByCodeArray(alphaCodes: string[]): Observable<Country[]> {
  if (!alphaCodes || alphaCodes.length === 0) return of([]);

  const countriesRequests: Observable<Country>[] = [];

  alphaCodes.forEach((code) => {
    const request = this.getCountryByAplhaCode(code);
    countriesRequests.push(request);
  });

  return combineLatest(countriesRequests);
}
}
