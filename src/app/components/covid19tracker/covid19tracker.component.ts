import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CovidResponse, StateWise } from 'src/app/models/covid-response.model';
import { Covid19dataService } from 'src/app/services/covid19data.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

export interface StateWiseData {
  active: string
  confirmed: string
  deaths: string
  deltaconfirmed: string
  deltadeaths: string
  deltarecovered: string
  lastupdatedtime: string
  migratedother: string
  recovered: string
  state: string
  statecode: string
  statenotes: string
}

let STATE_DATA: StateWiseData[] = [];

export interface DistrictData {
  district: string;
  notes: string;
  active: number;
  confirmed: number;
  deceased: number;
  recovered: number;
}
export interface Delta {
  confirmed: number;
  deceased: number;
  recovered: number;
}

let DISTRICT_DATA: DistrictData[] = [];

@Component({
  selector: 'app-covid19tracker',
  templateUrl: './covid19tracker.component.html',
  styleUrls: ['./covid19tracker.component.scss']
})
export class Covid19trackerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['lastupdatedtime', 'state', 'active', 'confirmed', 'recovered', 'deaths'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private covidData: Covid19dataService, private router: Router) {
    this.getCovidData();
  }

  stateWise: CovidResponse;
  stateDistrictWise: any;

  error: string;

  /* drop-down select start */
  states = new FormControl();
  stateToDistMap = new Map();
  statesArray: any[] = [];
  /* drop-down select end */


  ngOnInit(): void {
    this.getCovidStateAndDistrictWise();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getCovidData() {
    return this.covidData.getCovid19Data().subscribe(data => {
      STATE_DATA = data.statewise;
      // Assign the data to the data source for the table to render
      this.dataSource.data = STATE_DATA;
    },
      error => {
        this.error = error;
      });
  }

  getCovidStateAndDistrictWise() {
    this.covidData.getCovid19DataStateDistrictWise().subscribe(data => {
      for (let k of Object.keys(data)) {
        this.stateToDistMap.set(k, data[k]);
        this.statesArray.push(k);
      }
    });
  }

  selectedState(state: any) {

    // const index = DISTRICT_DATA.indexOf(state);
    // console.log('index', index)
    // if (index !== -1) {
    //   DISTRICT_DATA.splice(index, 1);
    // }

    const distData = this.stateToDistMap.get(state).districtData;

    for (let dist of Object.keys(distData)) {
      let obj = {
        district: dist,
        notes: distData[dist].notes,
        active: distData[dist].active,
        confirmed: distData[dist].confirmed,
        deceased: distData[dist].deceased,
        recovered: distData[dist].recovered,
      };
      DISTRICT_DATA.push(obj)
    }
    console.log("DISTRICT_DATA", DISTRICT_DATA);

    /* changing table to district view for the selected State */
    this.displayedColumns = ['district', 'active', 'confirmed', 'recovered', 'deceased'];
    this.dataSource.data = DISTRICT_DATA;
    /* resetting DISTRICT_DATA to add new data corresponding to selected state  */
    DISTRICT_DATA = [];
  }

  reset() {
    this.displayedColumns = ['lastupdatedtime', 'state', 'active', 'confirmed', 'recovered', 'deaths'];
    this.getCovidData();
  }

}
