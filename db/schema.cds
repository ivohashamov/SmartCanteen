entity Canteens {
    key ID : Integer;
    name : String; //e.g. msg global canteen
    openingTime : Time default '11:00:00'; //important for analyzing e.g. average occupancy
    closingTime : Time default '15:00:00';
    street : String;
    streetNumber : String; //int?
    postalCode: String; //int?
    currentOccupancy : Integer; // or just Association to Occupancies? or nothing and service just provides it?
    averageOccupancy : many AverageCalc; //see types below -- or just Association?
} //entity Canteens for covering the case that the solution is used with several canteens

entity Queues {
    key ID : Integer;
    currentPersonCount : Integer; // or just Association? or nothing and service just provides it?
    currentWaitingTime : Time; //int? -- service writes
    averageWaitingTime : many AverageCalc;
    canteen : Association to Canteens on canteen.ID = canteen_ID;
    canteen_ID : Integer;  // foreign key -- choosed the unmanaged association to provide a better overview
}

entity Tables {
    key ID : Integer;
    numberOfSeats : Integer;
    seatsOccupied : Integer; //number of occupied seats -- service writes
    tableHorizontal : Boolean; // not ideal - any ideas? -> was my idea to allocate the seats at the tables (see also entity Seats)
    tableVertical : Boolean; // not ideal - any ideas? -> was my idea to allocate the seats at the tables (see also entity Seats)
    Seats : Composition of many Tables.Seats on Seats.table = $self; //needed? -> could be helpful to gather info about the seats "starting" from the table
    canteen : Association to Canteens on canteen.ID = canteen_ID;
    canteen_ID : Integer;  // foreign key -- choosed the unmanaged association to provide a better overview
}

entity Tables.Seats {
    key ID : Integer;
    tablePosition : {
        row : Integer;
        column : Integer;
    };
    occupied : Boolean;
    table : Association to Tables on table.ID = table_ID;
    table_ID : Integer;  // foreign key -- choosed to the unmanaged association to provide a better overview
}

entity Users {
    key ID : Integer;
    name : String;
    mail : String;
    password : String; //we need to think about that -- hash etc.
    isManager : Boolean;
}

// logs from the raspberry are finally stored as these entities -> do we need to automatically delete older ones?

entity Occupancies { //total persons in the canteen
    timeStamp : DateTime;
    count : Integer;
    canteen : Association to Canteens on canteen.ID = canteen_ID; 
    canteen_ID : Integer;  // foreign key -- choosed the unmanaged association to provide a better overview
}

entity QueueLengths { //length of the queue in the canteen
    timeStamp : DateTime;
    count : Integer;
    queue : Association to Queues on queue.ID = queue_ID; 
    queue_ID : Integer;  // foreign key -- choosed the unmanaged association to provide a better overview
}

entity TableOccupancies { //total persons in the canteen
    timeStamp : DateTime;
    seatOccupancies : many SeatOccupancy;
    table : Association to Tables on table.ID = table_ID; 
    table_ID : Integer;  // foreign key -- choosed the unmanaged association to provide a better overview
}

// WaitingTimes

//types

type AverageCalc {
    rangeStart : Time;
    rangeEnd : Time;
    weekday : String;
    count: Integer;
}

type SeatOccupancy {
    seat_ID : Integer;
    occupied : Boolean;
}