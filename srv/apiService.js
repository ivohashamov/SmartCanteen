const cds = require ('@sap/cds');
const dateTransform = require ('date-and-time');

const { analyticsHours, analyticsDays } = cds.entities ('smartcanteen.db')

let currentCanteen;

module.exports = function(){


    this.before ('CREATE','canteen', (req)=>{
        currentCanteen = req.data.entity_ID
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
        let newHourAnalytics = await SELECT .columns `hour, avg(COUNT) as value` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen}` .groupBy `hour`;

        await INSERT.into (analyticsHours, 
            [
                {date: currentDate, canteen_ID: currentCanteen, data : newHourAnalytics}
            ])

        let newDayAnalytics = await SELECT .columns `weekday, hour, avg(COUNT) as value` .from `SMARTCANTEEN_DB_CANTEENOCCUPANCIES` .where `ENTITY_ID = ${currentCanteen}` .groupBy `weekday, hour`;

        await INSERT.into (analyticsDays, 
            [
                {date: currentDate, canteen_ID: currentCanteen, data: newDayAnalytics}
            ])
        
    })
  }