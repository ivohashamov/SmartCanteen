using { smartcanteen.db as data } from '../db/schema';

/** 
 * Add mockdata at ../db/data -> corresponding .csv file
 * */

service canteenService @(path:'/API_front') {
  /** @readonly */
  entity users as projection on data.Users;
  entity queue as projection on data.Queues;
  entity canteen as projection on data.Canteens;
  entity canteenOccupancies as projection on data.CANTEENOCCUPANCIES;
  entity queueLengths as projection on data.QUEUELENGTHS;
}