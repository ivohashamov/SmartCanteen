using { smartcanteen.db as data } from '../db/schema';

/** 
 * Add mockdata at ../db/data -> corresponding .csv file
 * */

service browseService @(path:'/browse') {
  @readonly entity Canteens as projection on data.Canteens;
  @readonly entity Queues as projection on data.Queues;
  /**
  * @readonly entity Tables as projection on data.Tables;
  * @readonly entity Seats as projection on data.Seats;
  * */
  @readonly entity CanteenOccupancies as projection on data.CanteenOccupancies;
  @readonly entity QueueLengths as projection on data.QueueLengths;
}