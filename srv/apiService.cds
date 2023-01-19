using { smartcanteen.db as data } from '../db/schema';

/** 
 * currently usable for all CRUD operations
 * currently no authorization needed - all CRUD operations available to everyone
 * 
 * OData Query for current/latest occupancy of canteen (ID=1): http://localhost:4004/APIv1/Occupancies?$orderby=date desc&$filter=canteen_ID eq 1&$top=1
 * 
 * */


service APIService @(path:'/APIv1') {
  @insertonly entity canteen as projection on data.CanteenOccupancies;
  @insertonly entity queue as projection on data.QueueLengths;
}