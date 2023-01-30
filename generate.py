import csv
import datetime
import random

ENTITY_ID = 1
OPENING_TIME_IN_MINUTES = 240
CANTEEN_CAPACITY = 20
DATE_FORMAT = '%Y-%m-%dT%H:%M:%S.%fZ'
COORDINATES = ''

CANTEEN_CSV = 'db/data/smartcanteen.db-CANTEENOCCUPANCIES.csv'
QUEUE_CSV = 'db/data/smartcanteen.db-QUEUELENGTHS.csv'

canteenCsv = open(CANTEEN_CSV, 'w')
canteenWriter = csv.writer(canteenCsv, delimiter=';')

queueCsv = open(QUEUE_CSV, 'w')
queueWriter = csv.writer(queueCsv, delimiter=';')

header = ['ID', 'date', 'count', 'entity_ID', 'coordinates', 'weekday', 'hour']

canteenWriter.writerow(header)
queueWriter.writerow(header)

dates = [
    '2023-01-23T11:00:00.000000Z',
    '2023-01-24T11:00:00.000000Z',
    '2023-01-25T11:00:00.000000Z',
    '2023-01-26T11:00:00.000000Z',
    '2023-01-27T11:00:00.000000Z',
]

weekdays = dict([(0, 'Monday'), (1, 'Tuesday'), (2, 'Wednesday'), (3, 'Thursday'), (4, 'Friday'), (5, 'Saturday'), (6, 'Sunday')])

id = 1

for date in dates:
    for minutes in range(OPENING_TIME_IN_MINUTES + 1):
        canteenOccupancy = random.randrange(CANTEEN_CAPACITY + 1)
        queueOccupancy = random.randrange(CANTEEN_CAPACITY + 1)
        
        dateInDateTimeObject = datetime.datetime.strptime(date, DATE_FORMAT)

        weekday = weekdays[dateInDateTimeObject.weekday()]

        dateWithMinuteIncrement = dateInDateTimeObject + datetime.timedelta(minutes=minutes)
        hour = dateWithMinuteIncrement.hour
        
        calculatedDateString = datetime.datetime.strftime(dateWithMinuteIncrement, DATE_FORMAT)

        canteenRow = [id, calculatedDateString, canteenOccupancy, ENTITY_ID, COORDINATES, weekday, hour]
        queueRow = [id, calculatedDateString, queueOccupancy, ENTITY_ID, COORDINATES, weekday, hour]

        canteenWriter.writerow(canteenRow)
        queueWriter.writerow(queueRow)

        id += 1


canteenCsv.close()
queueCsv.close()