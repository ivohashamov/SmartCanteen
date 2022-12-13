entity Canteens {
    key ID : Integer;
    name : String; //e.g. msg global canteen
    openingTime : Time default '11:00:00'; //important for analyzing e.g. average occupancy
    closingTime : Time default '15:00:00';
    street : String;
    streetNumber : String; //int?
    postalCode: String; //int?
    occupancies : many OccupancyCanteen;
    // currentOccupancy : Integer; // or just Association to Occupancies? or nothing and service just provides it?
    // averageOccupancy : many AverageCalc; //see types below -- or just Association?
} //entity Canteens for covering the case that the solution is used with several canteens

entity Queues {
    key ID : Integer;
    queueCounts : many QueueCount; // or just Association? or nothing and service just provides it?
    // currentWaitingTime : Time; //int? -- service writes
    // averageWaitingTime : many AverageCalc;
    canteen : Association to Canteens;
}

entity Tables {
    key ID : Integer;
    numberOfSeats : Integer;
    // seatsOccupied : Integer; //number of occupied seats -- service writes
    tableHorizontal : Boolean; // not ideal - any ideas? -> was my idea to allocate the seats at the tables (see also entity Seats)
    tableVertical : Boolean; // not ideal - any ideas? -> was my idea to allocate the seats at the tables (see also entity Seats)
    // seats : Association to many Seats;
    canteen : Association to Canteens;
}

entity Seats {
    key ID : Integer;
    tablePosition : {
        row : Integer;
        column : Integer;
    };
    seatOccupied : Boolean;
    table : Association to Tables;
}

entity Users {
    key ID : Integer;
    name : String;
    mail : String;
    password : String; //we need to think about that -- hash etc.
    isManager : Boolean;
}

// Waiting times for queues missing

//types

type OccupancyCanteen {
    date : Timestamp;
    count : Integer;
}

type QueueCount {
    date : Timestamp;
    count : Integer;
}

type AverageCalc {
    rangeStart : Time;
    rangeEnd : Time;
    weekday : Weekday;
    count: Integer;
}

type SeatOccupancy {
    occupied : Boolean;
}

type Weekday : String enum {
  Monday; Tuesday; Wednesday; Thursday; Friday; Saturday; Sunday;
}