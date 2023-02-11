namespace smartcanteen.db;
using { cuid } from '@sap/cds/common';

entity Canteens {
    key ID : Integer; // unique ID - primary key
    name : String; // e.g. msg global canteen
    openingTime : Time; // opening time of the canteen
    closingTime : Time; // closing time of the canteen
    street : String; // street (address) of the canteen
    streetNumber : String; // streetnumber (address) of the canteen
    postalCode: String; // postal code (address of the canteen)
    capacity : Integer; // max capacity of the canteen
}

entity Queues {
    key ID : Integer; // unique ID - primary key
    description : String; // e.g. queue at desk for salads
    canteen : Association to Canteens; // defines association (1:n) to entity Canteens
}

entity Users : cuid {
    name : String; // name of the user e.g. Christian
    mail : String; // mail address of the user e.g. christian@smartcanteen.com
    password : String; // password for login - currently not hashed or encrypted
    isManager : Boolean; // defines if a user is a so called manager - managers could have access to additional features
}

/** Occupancy data */

entity CANTEENOCCUPANCIES : cuid { // cuid assigns automaticalls a unique ID of type UUID to the entity when created
    date : Timestamp; // time and date of when the occupancy was registered 
    count : Integer; // number of persons detected
    entity : Association to Canteens; // defines association (1:n) to entity Canteens
    coordinates : many { // defines the coordinates of every person that was detected, number of objects therefore corresponds to the number of ppersons detected (count)
        x : String;
        y : String;
        w : String;
        h : String;
        };
    weekday : String; // filled in by business logic (analytics) - weekday (e.g. monday, tuesday, ...)
    hour : String; // filled in by business logic (analytics) - hour (e.g. 13 if date is 1 PM)
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
    weekday : String;
    hour : String;
}

/** Analytics data */

entity analyticsHours : cuid {
    date : Timestamp;
    canteen : Association to Canteens;
    data : array of { 
        hour: String;
        value: Integer;
        }
    };

entity analyticsDays : cuid {
    date : Timestamp;
    canteen : Association to Canteens;
    data : array of { 
        day : String;
        hour: String;
        value: Integer;
        }
    };


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
