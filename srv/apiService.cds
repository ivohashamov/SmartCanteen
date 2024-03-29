using { smartcanteen.db as data } from '../db/schema';

/** 
 * OData Query for current/latest occupancy of canteen (ID=1): http://localhost:4004/APIv1/canteen?$orderby=date desc&$filter=entity_ID eq 1&$top=1
 * */


service APIService @(path:'/APIv1') {
  @insertonly entity canteen as projection on data.CANTEENOCCUPANCIES; // Endpoint is: <SERVER-URL>/APIv1/canteen
  @insertonly entity queue as projection on data.QUEUELENGTHS; // Endpoint is: <SERVER-URL>/APIv1/queue
}

