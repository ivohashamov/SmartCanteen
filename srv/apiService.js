const cds = require ('@sap/cds');
const dateTransform = require ('date-and-time');

const { analyticsHours, analyticsDays } = cds.entities ('smartcanteen.db')

module.exports = function(){


    this.before ('CREATE','canteen', (req)=>{
        let nowDate = new Date ()
        let weekday = dateTransform.format(nowDate, 'dddd')
        let timeSlotHour = dateTransform.format(nowDate, 'H')
        let timeSlotMinute = dateTransform.format(nowDate, 'm')
        let timeSlot = String

        if (timeSlotMinute > 30) timeSlot=timeSlotHour+".5"
        else timeSlot=timeSlotHour+".0" 

        req.data.hour = timeSlot
        req.data.weekday = weekday
    })

    this.before ('CREATE','queue', (req)=>{
        let nowDate = new Date ()
        let weekday = dateTransform.format(nowDate, 'ddd')
        let timeSlotHour = dateTransform.format(nowDate, 'H')
        let timeSlotMinute = dateTransform.format(nowDate, 'm')
        let timeSlot = String

        if (timeSlotMinute > 30) timeSlot=timeSlotHour+".5"
        else timeSlot=timeSlotHour+".0" 

        req.data.hour = timeSlot
        req.data.weekday = weekday
    })

    //** Analytics */

    this.after ('CREATE','canteen', async (req) =>{

        let currentDate = new Date ();
        let currentCanteen = 1; // In the future other solution

        let hour11 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11"}`;
        let hour115 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11.5"}`;
        let hour12 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12"}`;
        let hour125 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12.5"}`;
        let hour13 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13"}`;
        let hour135 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13.5"}`;
        let hour14 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14"}`;
        let hour145 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14.5"}`;


        await INSERT.into (analyticsHours, 
            [
                {date: currentDate, canteen_ID: currentCanteen, data: [{hour: "11.0", value: hour11}, {hour: "11.5", value: hour115}, {hour: "12.0", value: hour12}, {hour: "12.5", value: hour125}, {hour: "13.0", value: hour13}, {hour: "13.5", value: hour135}, {hour: "14.0", value: hour14}, {hour: "14.5", value: hour145}]}
            ])

        let mon11 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11"} and WEEKDAY = ${"Monday"}`;
        let mon115 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11.5"} and WEEKDAY = ${"Monday"}`;
        let mon12 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12"} and WEEKDAY = ${"Monday"}`;
        let mon125 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12.5"} and WEEKDAY = ${"Monday"}`;
        let mon13 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13"} and WEEKDAY = ${"Monday"}`;
        let mon135 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13.5"} and WEEKDAY = ${"Monday"}`;
        let mon14 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14"} and WEEKDAY = ${"Monday"}`;
        let mon145 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14.5"} and WEEKDAY = ${"Monday"}`;

        let tue11 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11"} and WEEKDAY = ${"Tuesday"}`;
        let tue115 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11.5"} and WEEKDAY = ${"Tuesday"}`;
        let tue12 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12"} and WEEKDAY = ${"Tuesday"}`;
        let tue125 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12.5"} and WEEKDAY = ${"Tuesday"}`;
        let tue13 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13"} and WEEKDAY = ${"Tuesday"}`;
        let tue135 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13.5"} and WEEKDAY = ${"Tuesday"}`;
        let tue14 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14"} and WEEKDAY = ${"Tuesday"}`;
        let tue145 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14.5"} and WEEKDAY = ${"Tuesday"}`;

        let wed11 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11"} and WEEKDAY = ${"Wednesday"}`;
        let wed115 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11.5"} and WEEKDAY = ${"Wednesday"}`;
        let wed12 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12"} and WEEKDAY = ${"Wednesday"}`;
        let wed125 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12.5"} and WEEKDAY = ${"Wednesday"}`;
        let wed13 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13"} and WEEKDAY = ${"Wednesday"}`;
        let wed135 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13.5"} and WEEKDAY = ${"Wednesday"}`;
        let wed14 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14"} and WEEKDAY = ${"Wednesday"}`;
        let wed145 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14.5"} and WEEKDAY = ${"Wednesday"}`;

        let thu11 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11"} and WEEKDAY = ${"Thursday"}`;
        let thu115 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11.5"} and WEEKDAY = ${"Thursday"}`;
        let thu12 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12"} and WEEKDAY = ${"Thursday"}`;
        let thu125 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12.5"} and WEEKDAY = ${"Thursday"}`;
        let thu13 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13"} and WEEKDAY = ${"Thursday"}`;
        let thu135 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13.5"} and WEEKDAY = ${"Thursday"}`;
        let thu14 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14"} and WEEKDAY = ${"Thursday"}`;
        let thu145 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14.5"} and WEEKDAY = ${"Thursday"}`;

        let fri11 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11"} and WEEKDAY = ${"Friday"}`;
        let fri115 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"11.5"} and WEEKDAY = ${"Friday"}`;
        let fri12 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12"} and WEEKDAY = ${"Friday"}`;
        let fri125 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"12.5"} and WEEKDAY = ${"Friday"}`;
        let fri13 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13"} and WEEKDAY = ${"Friday"}`;
        let fri135 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"13.5"} and WEEKDAY = ${"Friday"}`;
        let fri14 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14"} and WEEKDAY = ${"Friday"}`;
        let fri145 = await SELECT .columns `avg(COUNT)` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen} and HOUR = ${"14.5"} and WEEKDAY = ${"Friday"}`;

        await INSERT.into (analyticsDays, 
            [
                {date: currentDate, canteen_ID: currentCanteen, day: "Monday", data: [{hour: "11.0", value: mon11}, {hour: "11.5", value: mon115}, {hour: "12.0", value: mon12}, {hour: "12.5", value: mon125}, {hour: "13.0", value: mon13}, {hour: "13.5", value: mon135}, {hour: "14.0", value: mon14}, {hour: "14.5", value: mon145}]},
                {date: currentDate, canteen_ID: currentCanteen, day: "Tuesday", data: [{hour: "11.0", value: tue11}, {hour: "11.5", value: tue115}, {hour: "12.0", value: tue12}, {hour: "12.5", value: tue125}, {hour: "13.0", value: tue13}, {hour: "13.5", value: tue135}, {hour: "14.0", value: tue14}, {hour: "14.5", value: tue145}]},
                {date: currentDate, canteen_ID: currentCanteen, day: "Wednesday", data: [{hour: "11.0", value: wed11}, {hour: "11.5", value: wed115}, {hour: "12.0", value: wed12}, {hour: "12.5", value: wed125}, {hour: "13.0", value: wed13}, {hour: "13.5", value: wed135}, {hour: "14.0", value: wed14}, {hour: "14.5", value: wed145}]},
                {date: currentDate, canteen_ID: currentCanteen, day: "Thursday", data: [{hour: "11.0", value: thu11}, {hour: "11.5", value: thu115}, {hour: "12.0", value: thu12}, {hour: "12.5", value: thu125}, {hour: "13.0", value: thu13}, {hour: "13.5", value: thu135}, {hour: "14.0", value: thu14}, {hour: "14.5", value: thu145}]},
                {date: currentDate, canteen_ID: currentCanteen, day: "Friday", data: [{hour: "11.0", value: fri11}, {hour: "11.5", value: fri115}, {hour: "12.0", value: fri12}, {hour: "12.5", value: fri125}, {hour: "13.0", value: fri13}, {hour: "13.5", value: fri135}, {hour: "14.0", value: fri14}, {hour: "14.5", value: fri145}]}
            ])
        
    })
  }