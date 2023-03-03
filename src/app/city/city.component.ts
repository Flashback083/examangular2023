import { ICity } from './../../models/city';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClientService } from 'src/services/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { IDepartement } from 'src/models/departement';
import { IRegion } from 'src/models/region';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  title: string = 'Villes';
  url: string = 'https://geo.api.gouv.fr/departements/';
  urlDep: string = 'https://geo.api.gouv.fr/departements/';
  urlReg: string = 'https://geo.api.gouv.fr/regions/';
  cities: ICity[] = [];
  depName: string[] = [];
  region: IRegion | undefined;
  departement: IDepartement|undefined;
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
    this.url = this.url+this.code+"/communes";
    this.httpClientService.getObject<ICity[]>(this.url)
    .subscribe((response) => {
        this.cities = response;
        this.cities.forEach(element => {
          const urlDep: string = this.urlDep+element.codeDepartement;
          //Get Departement from codeDepartement
          this.httpClientService.getObject<IDepartement>(urlDep)
          .subscribe((response) => {
              this.departement = response;
              //Get Region from departement code region
              const urlRegion: string = this.urlReg+this.departement.codeRegion; 
              this.httpClientService.getObject<IRegion>(urlRegion)
              .subscribe((response) => {
                this.region = response;
              });
              this.depName.push(response.nom);
          });
        });        
    });
  }

}