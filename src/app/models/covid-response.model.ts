export interface CovidResponse {
  statewise: StateWise[];
}

export interface StateWise {
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







