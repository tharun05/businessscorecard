import {Injectable} from '@angular/core';
import {AppService} from '../shared/app.service';
import {HttpService} from '../shared/http.service';
import {Props} from '../common/props';

@Injectable()
export class StrategyService {
  props: Props = Props;
  private organization_url = '/organization';
  private organizationTree_url = '/organization/tree';
  private organizationByCode_url = '/organization/code';
  private organizationById_url = '/organization';


  constructor(private http: HttpService, private appService: AppService) {
  }

  saveOrganization(data: any) {
    return this.http.post(this.organization_url, data);
  }

  UpdateOrganization(data: any, id?: any) {
    return this.http.put(this.organization_url + '/' + id, data);
  }

  getOrganizationTree(data: any) {
    const reqData = {
      username: data.userid,
      name: data.name,
      password: data.password,
      provider: data.provider,
    };
    return this.http.get(this.organization_url, reqData);
  }

  getOrganizationByCode(data: any) {
    return this.http.get(this.organizationByCode_url, data);
  }

  getOrganizationById(id: any) {
    return this.http.getById(this.organizationById_url + '/' + id);
  }

}
