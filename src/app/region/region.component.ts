import { IRegion } from './../../models/region';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClientService } from 'src/services/http-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit{

  title: string = 'Régions';
  url: string = 'https://geo.api.gouv.fr/regions';
  regions: IRegion[] = [];

  constructor(
    private httpClientService: HttpClientService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.httpClientService.getObject<IRegion[]>(this.url)
    .subscribe((response) => {
        this.regions = response;
    });
  }
}

