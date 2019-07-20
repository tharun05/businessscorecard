import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Props} from '../common/props';
import {Util} from './utils/util';
import {ApexService} from './apex.service';

@Injectable()
export class HttpService {
  private host = Props.API_END_POINT;

  constructor(private http: HttpClient, private apexService: ApexService) {
  }

  get(url: string, data: any) {
    const paramString = Util.GetParamString(data ? data.data : {});
    url = this.host + url + paramString;
    return this.http.get(url);
  }

  getById(url: string) {
    url = this.host + url;
    return this.http.get(url);
  }

  post(url: string, data: any) {
    url = this.host + url;
    return this.http.post(url, data);
  }

  put(url: string, data: any) {
    url = this.host + url;
    console.log(data);
    return this.http.put(url, data);
  }

  delete(url: string, data: any) {
    const paramString = Util.GetParamString(data ? data : {});
    url = this.host + url + paramString;
    return this.http.delete(url);
  }

  formData(url: string, _formData: FormData) {
    url = this.host + url;
    return this.http.post(url, _formData);
  }
}
