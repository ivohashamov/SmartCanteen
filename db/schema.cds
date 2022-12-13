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
    canteen : Association to Canteens;
}

entity Tables {
    key ID : Integer;
    numberOfSeats : Integer;
    tableHorizontal : Boolean; // maybe not ideal - any ideas? -> was my idea to allocate the seats at the tables (see also entity Seats)
    tableVertical : Boolean; // maybe not ideal - any ideas? -> was my idea to allocate the seats at the tables (see also entity Seats)
    canteen : Association to Canteens;
}

entity Seats {
    key ID : Integer;
    tablePosition : array of {
        row : Integer;
        column : Integer;
    };
    table : Association to Tables;
}

entity Users : cuid {
    name : String;
    mail : String;
    password : String; //we need to think about that -- hash etc.
    isManager : Boolean;
}

entity Occupancies : cuid {
    date : Timestamp;
    count : Integer;
    canteen : Association to Canteens;
}

entity QueueCounts : cuid {
    date : Timestamp;
    count : Integer;
}

entity OccupanciesTable : cuid {
    seatOccupancies : many {
        seat : Association to Seats;
        isOccupied : Boolean;
    };
    seatOccupanciesCount : Integer;
}