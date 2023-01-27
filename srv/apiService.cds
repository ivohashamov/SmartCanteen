using { smartcanteen.db as data } from '../db/schema';

/** 
 * currently usable for all CRUD operations
 * currently no authorization needed - all CRUD operations available to everyone
 * 
 * OData Query for current/latest occupancy of canteen (ID=1): http://localhost:4004/APIv1/canteen?$orderby=date desc&$filter=entity_ID eq 1&$top=1
 * 
 * */


service APIService @(path:'/APIv1') {
  entity canteen as projection on data.CANTEENOCCUPANCIES; //Endpoint is: <SERVER-URL>/APIv1/canteen
  entity queue as projection on data.QUEUELENGTHS; //Endpoint is: <SERVER-URL>/APIv1/queue
  entity user as projection on data.Users;
}