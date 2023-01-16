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
} //entity Canteens for covering the case that the solution is used with several canteens

entity Queues {
    key ID : Integer;
    description : String;
    canteen : Association to Canteens;
}

entity Tables {
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

entity Users : cuid {
    name : String;
    mail : String;
    password : String; //we need to think about that -- hash etc. TO-DO
    isManager : Boolean;
}

/** Occupancy data */

entity Occupancies : cuid {
    date : Timestamp;
    count : Integer;
    entity_id : Integer;
    mode : String;
}

entity QueueOccupancies : cuid {
    date : Timestamp;
    count : Integer;
    queue : Association to Queues;
}

entity OccupanciesTables : cuid {
    date : Timestamp;
    seatOccupancies : array of {
        seat : Association to Seats;
        isOccupied : Boolean;
    }
}