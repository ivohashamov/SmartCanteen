sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter"
 ], function (Controller, JSONModel, formatter) {
    "use strict";

    return Controller.extend("ns.uiprototype.controller.Cards", {
        formatter: formatter,
        onInit: async function () {
            //SAP UI5 cards
            var cardManifests = new JSONModel();
            cardManifests.loadData("model/cardManifests.json");
            console.log(cardManifests);
            this.getView().setModel(cardManifests, "manifests");

            //Fiori cards
            var oQueueOccupanciesModel = new JSONModel();  
            var query = jQuery.ajax({
                type: "GET", 
                contentType: "application/json",
                url:"https://1584749btrial-dev-smartcanteen-srv.cfapps.us10-001.hana.ondemand.com/API_front/queueLengths?$orderby=date desc",
                success: function(data, status) {
                    oQueueOccupanciesModel.setData(data["value"][0])
                },
                fail: function(data, status) {
                    //todo
                }
            })
            this.getView().setModel(oQueueOccupanciesModel, "QueueOccupancies")

            //Occupied Tables
            var oOccupiedTablesModel = new JSONModel();
            var query2 = jQuery.ajax({
                type: "GET", 
                contentType: "application/json",
                url:"https://1584749btrial-dev-smartcanteen-srv.cfapps.us10-001.hana.ondemand.com/API_front/canteenOccupancies",
                success: function(data, status) {
                    oOccupiedTablesModel.setData(data["value"][0])
                }
            })
            this.getView().setModel(oOccupiedTablesModel, "OccupiedTables")

            //TotalTables
            var oTotalTablesModel = new JSONModel();
            var query2 = jQuery.ajax({
                type: "GET", 
                contentType: "application/json",
                url:"https://1584749btrial-dev-smartcanteen-srv.cfapps.us10-001.hana.ondemand.com/API_front/canteen",
                success: function(data, status) {
                    oTotalTablesModel.setData(data["value"][0])
                }
            })
            this.getView().setModel(oTotalTablesModel, "TotalTables")
        },
        resolveCardUrl: function (sUrl) {
			return sap.ui.require.toUrl("ns/uiprototype/CardsLayout/" + sUrl);
		}

    });
 });