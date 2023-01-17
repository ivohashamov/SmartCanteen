sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/integration/library"
 ], function (Controller, JSONModel, MessageToast) {
    "use strict";
    return Controller.extend("ns.uiprototype.controller.Cards", {
        onInit: function () {
            //SAP UI5 cards
            var cardManifests = new JSONModel();
            cardManifests.loadData("model/cardManifests.json");
            console.log(cardManifests);
            this.getView().setModel(cardManifests, "manifests");

            //Fiori cards
            var oDataModel = new JSONModel();
            var query = jQuery.ajax({
                type: "GET", 
                contentType: "application/json",
                url:"http://localhost:4004/API/Occupancies",
                success: function(data, status) {
                    oDataModel.setData(data["value"][0])
                }
            })
            this.getView().setModel(oDataModel, "data")

            var oDataModel2 = new JSONModel();
            var query2 = jQuery.ajax({
                type: "GET", 
                contentType: "application/json",
                url:"http://localhost:4004/browse/Tables?$apply=aggregate(numberOfSeats with sum as count)",
                success: function(data, status) {
                    oDataModel2.setData(data["value"][0])
                }
            })
            this.getView().setModel(oDataModel2, "data2")
        },
        resolveCardUrl: function (sUrl) {
			return sap.ui.require.toUrl("ns/uiprototype/CardsLayout/" + sUrl);
		}

    });
 });