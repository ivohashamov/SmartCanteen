using { smartcanteen.db as data } from '../db/schema';

/** 
 * Add mockdata at ../db/data -> corresponding .csv file
 * 
 * ONLY FOR DEVELOPMENT PURPOSE
 * */

service browseService @(path:'/development') {
  entity canteen as projection on data.Canteens;
  entity queue as projection on data.Queues;
  entity canteenoccupancies as projection on data.CANTEENOCCUPANCIES;
  entity queuelengths as projection on data.QUEUELENGTHS;
  entity user as projection on data.Users;
  entity analyticsHours as projection on data.analyticsHours;
  entity analyticsDays as projection on data.analyticsDays;
}