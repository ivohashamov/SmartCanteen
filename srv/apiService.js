const cds = require ('@sap/cds'); // import cds
const dateTransform = require ('date-and-time'); // import npm package date-and-time to extract easily weekday and hour from timestamp

const { analyticsHours, analyticsDays } = cds.entities ('smartcanteen.db') // import entities that store analytical data

let currentCanteen; // stores the ID of the canteen new incoming data refers to

module.exports = function(){ // exports/implements the following functions


    this.before ('CREATE','canteen', (req)=>{ // function that takes place before creating a new CANTEENOCCUPANCIES entity through APIService
        currentCanteen = req.data.entity_ID // storing the ID of the canteen to currentCanteen
        let nowDate = new Date () // creates new timestamp that is stored to nowDate
        let weekday = dateTransform.format(nowDate, 'dddd') // extracts weekday frome timestamp and stores it to new variable weekday
        let timeSlotHour = dateTransform.format(nowDate, 'H')  // extracts hour frome timestamp and stores it to new variable timeSlotHour
        let timeSlotMinute = dateTransform.format(nowDate, 'm') // extracts minute frome timestamp and stores it to new variable timeSlotMinute
        let timeSlot = String // creates new variable timeSlot type String

        if (timeSlotMinute > 30) timeSlot=timeSlotHour+".5" // stores a string to timeSlot according to the amount of minutes
        else timeSlot=timeSlotHour+".0" 

        req.data.hour = timeSlot // stores timeslot string to the request
        req.data.weekday = weekday // stores the weekday string to the request
    })

    this.before ('CREATE','queue', (req)=>{  // function that takes place before creating a new QUEUELENGTHS entity through APIService
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
        let newHourAnalytics = await SELECT .columns `hour, avg(COUNT) as value` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen}` .groupBy `hour`;

        await INSERT.into (analyticsHours, 
            [
                {date: currentDate, canteen_ID: currentCanteen, data : newHourAnalytics}
            ])

        let newDayAnalytics = await SELECT .columns `weekday as day, hour, avg(COUNT) as value` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen}` .groupBy `weekday, hour`;

        await INSERT.into (analyticsDays, 
            [
                {date: currentDate, canteen_ID: currentCanteen, data: newDayAnalytics}
            ])
        
    })
  }