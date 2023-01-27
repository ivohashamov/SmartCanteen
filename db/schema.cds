namespace smartcanteen.db;
using { cuid } from '@sap/cds/common';

entity Canteens {
    key ID : Integer;
    name : String; //e.g. msg global canteen
    openingTime : Time default '11:00:00'; //important for analyzing e.g. average occupancy
    closingTime : Time default '15:00:00';
    street : String;
    streetNumber : String; //int?
    postalCode: String; //int?
    capacity : Integer default 20;
} //entity Canteens for covering the case that the solution is used with several canteens

entity Queues {
    key ID : Integer;
    description : String;
    canteen : Association to Canteens;
}

/** 
 * entity Tables {
    key ID : Integer;
    description : String;
    numberOfSeats : Integer;
    tableHorizontal : Boolean; // maybe not ideal - any ideas? -> was my idea to allocate the seats at the tables (see also entity Seats)
    tableVertical : Boolean; // maybe not ideal - any ideas? -> was my idea to allocate the seats at the tables (see also entity Seats)
    canteen : Association to Canteens;
}

entity Seats {
    key ID : Integer;
    tablePositionRow : Integer;
    tablePositionColumn : Integer;
    table : Association to Tables;
}
 * */

entity Users : cuid {
    name : String;
    mail : String;
    password : String; //we need to think about that -- hash etc. TO-DO
    isManager : Boolean;
}

/** Occupancy data */

entity CANTEENOCCUPANCIES : cuid {
    date : Timestamp;
    count : Integer;
    entity : Association to Canteens;
    coordinates : many {
        x : String;
        y : String;
        w : String;
        h : String;
        };
}

entity QUEUELENGTHS : cuid {
    date : Timestamp;
    count : Integer;
    entity : Association to Queues;
    coordinates : many {
        x : String;
        y : String;
        w : String;
        h : String;
        };
}

/** Analytics data */
/** maybe better solution in the future */

entity CanteenAnalytics : cuid {
    date : Timestamp;
    ID : Association to Canteens;
}

entity QueueAnalytics : cuid {
    date : Timestamp;
    ID : Association to Queues;
}