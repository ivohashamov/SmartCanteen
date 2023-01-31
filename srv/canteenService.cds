using { smartcanteen.db as data } from '../db/schema';

/** 
 * Add mockdata at ../db/data -> corresponding .csv file
 * */

service canteenService @(path:'/API_front') {
  /** @readonly */
  @readonly entity users as projection on data.Users;
  @readonly entity queue as projection on data.Queues;
  @readonly entity canteen as projection on data.Canteens;
  @readonly entity canteenOccupancies as projection on data.CANTEENOCCUPANCIES;
  @readonly entity queueLengths as projection on data.QUEUELENGTHS;
}