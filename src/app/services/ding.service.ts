import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, from } from 'rxjs';
import { map, filter, tap, concatMap } from 'rxjs/operators';
import { constants } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class DingService {

  
  filteredCountries: any[];
  countriesData: Observable<any>;

  constructor(private http: Http) {
  }

  headers = new Headers({ 'api_key': constants.API_KEY, 'Content-Type': 'application/json', 'Accept': 'application/json' });

  baseUrl = 'https://api.dingconnect.com/api/V1/';

  getCountries(countryIsos): Observable<any> {
    return this.http.get(`${this.baseUrl}GetCountries`, {headers: this.headers}).pipe(
      map(response => response.json()),
      map(results => results['Items']),
      concatMap(arr => from(arr)),
      filter(country => countryIsos.includes(country['CountryIso'])),
    );
  }

  getProducts(countryIsos, providerCodes, regionCodes): Observable<any> {
    let queryFilter = '';
    // let pCodesFilter = '';
    // let rCodeFilter = '';
    countryIsos.forEach(country => {
      queryFilter = queryFilter + 'countryIsos=' + country + '&'
    });
    providerCodes.forEach(code => {
      queryFilter = queryFilter + 'providerCodes=' + code + '&'
    });
    regionCodes.forEach(code => {
      queryFilter = queryFilter + 'regionCodes=' + code + '&'
    });
    queryFilter = queryFilter.substring(0, queryFilter.length - 1);
    return this.http.get(`${this.baseUrl}GetProducts?${queryFilter}`, {headers: this.headers}).pipe(
      map(response => response.json()),
      map(results => results['Items'])
    );
  }

  getRegions(countryIsos): Observable<any> {
    let countriesFilter = '';
    countryIsos.forEach(country => {
      countriesFilter = countriesFilter + 'countryIsos=' + country + '&'
    });
    countriesFilter = countriesFilter.substring(0, countriesFilter.length - 1);
    return this.http.get(`${this.baseUrl}GetRegions?${countriesFilter}`, {headers: this.headers}).pipe(
      map(response => response.json()),
      map(results => results['Items'])
    );
  }

  getProviderByIso(): Observable<any> {

    let countriesFilter = '';
    constants.COUNTRY_ISO.forEach(country => {
      countriesFilter = countriesFilter + 'countryIsos=' + country + '&'
    });

    countriesFilter = countriesFilter.substring(0, countriesFilter.length - 1);
    return this.http.get(`${this.baseUrl}GetProviders?${countriesFilter}`, { headers: this.headers })
    .pipe(
      map(response => response.json()),
      map(results => results['Items'])
    );
  }

  sendTransfer(transferObj) {
    return this.http.post(`${this.baseUrl}SendTransfer`, transferObj , { headers: this.headers })
    .pipe(
      map(response => response.json())
    );
  }

}
