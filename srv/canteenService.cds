using { smartcanteen.db as data } from '../db/schema';

/** 
 * Add mockdata at ../db/data -> corresponding .csv file
 * */

service canteenService @(path:'/API_front') {
  /** @readonly */
  @readonly entity canteenOccupancies as projection on data.CANTEENOCCUPANCIES excluding { coordinates }; // at least for now coordinates excluded
  @readonly entity queueLengths as projection on data.QUEUELENGTHS  excluding { coordinates }; // at least for now coordinates excluded
  @readonly entity analyticsHours as projection on data.analyticsHours; // at least for now coordinates excluded
  @readonly entity analyticsDays as projection on data.analyticsDays;



  @readonly entity users as projection on data.Users; // currently not used afaik
  @readonly entity queue as projection on data.Queues; // currently not used
  @readonly entity canteen as projection on data.Canteens; // currently not used
  
}