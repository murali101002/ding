import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { constants } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class DingService {

  countries = ['BA', 'LO', 'MN', 'SD', 'WE'];

  constructor(private http: Http) {
  }

  headers = new Headers({ 'api_key': constants.API_KEY, 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' });

  baseUrl = 'https://api.dingconnect.com/api/V1/';

  getProviderByIso(countryIso): Observable<any> {
    return this.http.get(`${this.baseUrl}GetProviders?countryIsos=${countryIso}`, { headers: this.headers })
      .pipe(
        map(response => response.json()),
        map(results => results['Items'])
      );
  }


}
