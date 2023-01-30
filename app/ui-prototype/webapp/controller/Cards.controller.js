sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    'sap/viz/ui5/data/FlattenedDataset',
    'sap/viz/ui5/controls/common/feeds/FeedItem',
    'sap/viz/ui5/controls/Popover',
    'sap/viz/ui5/controls/VizFrame',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
    'sap/ui/core/Title'
 ], function (Controller, JSONModel, formatter, FlattenedDataset, FeedItem, Popover, VizFrame, ChartFormatter, Format, Title) {
    "use strict";
    var hi = 0
    return Controller.extend("ns.uiprototype.controller.Cards", {
        formatter: formatter,
        onInit: async function () {
            //Load default JSONModel
            await fetch('./model/defaultData.json').then(response => response.json()).then(data => $.sap.defaultData = new JSONModel(data))

            //Firstly update the cards
            this.updateFioriCards()
            this.updateAnalyticsCards()

            //Set time interval for updating the cards
            this._trigger = new sap.ui.core.IntervalTrigger(6 * 1000 /* refresh every x sec */)
            this._trigger.addListener(this.onRefreshTriggered, this);
        },
        updateFioriCards: async function() {
            //Fiori cards
            var oQueueOccupanciesModel = new JSONModel();  
            var query = jQuery.ajax({
                type: "GET", 
                contentType: "application/json",
                url:"http://localhost:4004/API_front/queueLengths?$orderby=date desc",
                success: function(data, status) {
                    if(data["value"].length > 0)
                        oQueueOccupanciesModel.setData(data["value"][0])
                    else
                        oQueueOccupanciesModel.setData($.sap.defaultData.getProperty("/QueueOccupancies"))
                },
                fail: function(data, status) {
                    //todo
                    console.log("hey")
                }
            })
            this.getView().setModel(oQueueOccupanciesModel, "QueueOccupancies")

            //Occupied Tables
            var oOccupiedTablesModel = new JSONModel();
            var query2 = jQuery.ajax({
                type: "GET", 
                contentType: "application/json",
                url:"http://localhost:4004/API_front/canteenOccupancies?$orderby=date desc",
                success: function(data, status) {
                    if(data["value"].length > 0)
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
                url:"http://localhost:4004/API_front/canteen",
                success: function(data, status) {
                    oTotalTablesModel.setData(data["value"][0])
                }
            })
            this.getView().setModel(oTotalTablesModel, "TotalTables")

            //Analyctical card
            var oVizFrame = this.oVizFrame = this.getView().byId("analyticalCard");
            //oVizFrame
        },
        updateAnalyticsCards: async function()  {
            //SAP UI5 cards
            var cardManifests = new JSONModel();
            cardManifests.loadData("model/cardManifests.json");
            this.getView().setModel(cardManifests, "manifests");

            var dataModel = new JSONModel("./model/ByYearCity_sum.json");
            this.getView().setModel(dataModel, "a2");

            var vizFrame = this.getView().byId("idVizFrame")
            vizFrame.setVizProperties({
                plotArea: {
                    primaryScale: {
                        fixedRange: true,
                        minValue: 0,
                        maxValue: 20
                    }
                },
                title: {
                    visible: false
                }
            })
        },
        onRefreshTriggered: async function () {
            await this.updateFioriCards()
        }
    });
 });