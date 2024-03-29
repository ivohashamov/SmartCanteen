sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter"
], function (Controller, JSONModel, formatter) {
    "use strict";
    //Variables
    var currentWeekday = 0
    const weekdays = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 7
    }

    //controller logic
    return Controller.extend("ns.uiprototype.controller.Cards", {
        formatter: formatter,

        //Initialization
        onInit: async function () {
            //Load default JSONModel for the cards
            await fetch('./model/defaultData.json').then(response => response.json()).then(data => $.sap.defaultData = new JSONModel(data))

            //Fetch data models and setup the analytical cards once
            this.updateFioriCardModels()
            this.setAnalyticsCards()

            //Set a time interval for updating the cards
            this._trigger = new sap.ui.core.IntervalTrigger(6 * 1000 /* refresh every x sec */)
            this._trigger.addListener(this.onRefreshTriggered, this);
        },

        //Intervall update method
        onRefreshTriggered: async function () {
            await this.updateFioriCardModels()
        },

        //initalize the analytics cards
        setAnalyticsCards: async function () {
            //Current Analytics
            var vizFrame = this.getView().byId("idVizFrame")
            vizFrame.setVizProperties({
                plotArea: {
                    primaryScale: {
                        fixedRange: true,
                        minValue: 0,
                        maxValue: 20
                    },
                    dataPointSize: {
                        max: 40
                    },
                    dataLabel: {
                        visible: true
                    },
                    colorPalette: ["#AF003F"]
                },
                legend: {
                    visible: false
                },
                categoryAxis: {
                    label: { visible: true }
                },
                title: {
                    visible: false
                }
            })

            //Past Analytics
            var currentDate = new Date()
            currentWeekday = currentDate.getDay()
            this.updatePastAnalyticsModel(Object.keys(weekdays).find(key => weekdays[key] === currentWeekday))
            var vizFrame = this.getView().byId("vizFrameWeekly")
            vizFrame.setVizProperties({
                plotArea: {
                    primaryScale: {
                        fixedRange: true,
                        minValue: 0,
                        maxValue: 20
                    },
                    dataPointSize: {
                        max: 40
                    },
                    dataLabel: {
                        visible: true
                    },
                    colorPalette: ["#AF003F"]
                },
                legend: {
                    visible: false
                },
                categoryAxis: {
                    label: { visible: true }
                },
                title: {
                    visible: false
                }
            })
        },

        //Fetch the models
        updateFioriCardModels: async function () {
            //Fiori cards
            var oQueueOccupanciesModel = new JSONModel();
            var query = jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: "http://localhost:4004/API_front/queueLengths?$orderby=date desc",
                success: function (data, status) {
                    if (data["value"].length > 0)
                        oQueueOccupanciesModel.setData(data["value"][0])
                    else
                        oQueueOccupanciesModel.setData($.sap.defaultData.getProperty("/QueueOccupancies"))
                },
                fail: function (data, status) {
                    console.log(status)
                }
            })
            this.getView().setModel(oQueueOccupanciesModel, "QueueOccupancies")

            //Occupied Tables
            var oOccupiedTablesModel = new JSONModel();
            var query2 = jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: "http://localhost:4004/API_front/canteenOccupancies?$orderby=date desc",
                success: function (data, status) {
                    if (data["value"].length > 0)
                        oOccupiedTablesModel.setData(data["value"][0])
                    else
                        oOccupiedTablesModel.setData($.sap.defaultData.getProperty("/OccupiedTables"))
                }
            })
            this.getView().setModel(oOccupiedTablesModel, "OccupiedTables")

            //TotalTables
            var oTotalTablesModel = new JSONModel();
            var query2 = jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: "http://localhost:4004/API_front/canteen",
                success: function (data, status) {
                    oTotalTablesModel.setData(data["value"][0])
                }
            })
            this.getView().setModel(oTotalTablesModel, "TotalTables")

            //Current Analytics
            var oAnalyticsModel = new JSONModel();
            var query2 = jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url: "",
                //url: "http://localhost:4004/API_front/canteenOccupancies?$apply=filter(entity_ID eq 1 and day(date) eq " + new Date().getDate() + ")/groupby((hour),aggregate(count with average as averageCount))",
                success: function (data, status) {
                    if (data["value"].length > 0) {
                        for (let i = 0; i < data["value"].length; i++) {
                            data["value"][i]["averageCount"] = Math.floor(data["value"][i]["averageCount"])
                        }
                        oAnalyticsModel.setData(data)
                    }
                }
            })
            this.getView().setModel(oAnalyticsModel, "a1")
        },
        updatePastAnalyticsModel: async function (weekday) {
            this.getView().setModel(new JSONModel({ 'day': weekday }), "weekday");
            var oOccupiedTablesModel = new JSONModel();
            var query2 = jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                url:"http://localhost:4004/API_front/analyticsDays?$orderby=date desc&$filter=canteen_ID eq 1&$top=1",
                success: function(data, status) {
                    if(data["value"].length > 0)
                    {
                        var data2 = []
                        for (let date in data["value"][0]["data"]) {
                            if(data["value"][0]["data"][date]["day"]==weekday)
                            {
                                data2.push({hour:data["value"][0]["data"][date]["hour"], averageCount:data["value"][0]["data"][date]["value"]})
                            }
                        }
                        data2 = {value:data2}
                        oOccupiedTablesModel.setData(data2)
                    }
                }
            })
            this.getView().setModel(oOccupiedTablesModel, "a2")
        },

        //Event listeners
        onBeforePress: function () {
            if (currentWeekday > 1) {
                currentWeekday = currentWeekday - 1
                var wDay = Object.keys(weekdays).find(key => weekdays[key] === currentWeekday)
                this.updatePastAnalyticsModel(wDay)
            }
        },
        onNextPress: function () {
            if (currentWeekday < 5) {
                currentWeekday = currentWeekday + 1
                var wDay = Object.keys(weekdays).find(key => weekdays[key] === currentWeekday)
                this.updatePastAnalyticsModel(wDay)
            }
        }
    });
});