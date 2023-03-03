import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/services/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { IDepartement } from 'src/models/departement';
import { IRegion } from 'src/models/region';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit{

  title: string = 'Département';
  url: string = 'https://geo.api.gouv.fr/regions/';
  urlDerp: string = 'https://geo.api.gouv.fr/regions/';
  departements: IDepartement[] = [];
  region: IRegion | undefined;
  code: string = '';
  constructor(
    private httpClientService: HttpClientService,
    private activatedRoute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.code = params['code'];
    });
    this.url = this.url+this.code+"/departements";
    this.httpClientService.getObject<IDepartement[]>(this.url)
    .subscribe((response) => {
        this.departements = response;
        //Get region name from codeRegion, and should be same for all derp so only check the first entry
        const urlRegion: string = this.urlDerp+this.departements[0].codeRegion; 
              this.httpClientService.getObject<IRegion>(urlRegion)
              .subscribe((response) => {
                this.region = response;
        });
    });
  }
}