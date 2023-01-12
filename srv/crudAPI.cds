using { smartcanteen.db as data } from '../db/schema';

/** 
 * currently usable for all CRUD operations
 * currently no authorization needed - all CRUD operations available to everyone
 * */


service APIService @(path:'/API') {
  entity Users as projection on data.Users;
  entity Occupancies as projection on data.Occupancies;
  entity QueueOccupancies as projection on data.QueueOccupancies;
  entity OccupanciesTables as projection on data.OccupanciesTables;
}