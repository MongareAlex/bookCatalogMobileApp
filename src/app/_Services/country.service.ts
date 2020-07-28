import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../_Data/Country';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
data: Country[];
baseUrl = environment.BooksCatalogApiUrl;
constructor(private httpclient: HttpClient) { }

GetCountries(): Observable<Country[]> {
  const countriesUrl = 'Countries';
  return this.httpclient.get<Country[]>(this.baseUrl + countriesUrl, {observe: 'response'}).pipe(
   map(response => {
    this.data = response.body;
    return this.data;
   }
 ));
}

createNewCountry(newCountry: Country) {
  const countriesUrl = 'Countries';
  return this.httpclient.post<Country[]>(this.baseUrl + countriesUrl, newCountry);
}

updateCountry(countryToEdit: Country) {
  const countriesUrl = 'Countries/';
  return this.httpclient.put(this.baseUrl + countriesUrl + countryToEdit.CountryId, countryToEdit);
}

searchCountry(searchTerm: string) {
  const countriesUrl = 'Countries/SearchCountries/';
  return this.httpclient.get<Country[]>(this.baseUrl + countriesUrl + searchTerm);
}
deleteCountry(countryToDelete: Country) {
  const countriesUrl = 'Countries/';
  return this.httpclient.delete(this.baseUrl + countriesUrl + countryToDelete.CountryId);
}
}
