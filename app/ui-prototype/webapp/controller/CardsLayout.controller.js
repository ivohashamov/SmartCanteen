sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/DateFormat",
	"sap/m/MessageToast",
	"sap/ui/integration/library"
], function (Controller, JSONModel, DateFormat, MessageToast, integrationLibrary) {
	"use strict";

	return Controller.extend("ns.uiprototype.controller.CardsLayout", {

		onInit: function () {
			var cardManifests = new JSONModel(),
				homeIconUrl = sap.ui.require.toUrl("ns/uiprototype/images/CompanyLogo.png"),
				date = DateFormat.getDateInstance({style: "long"}).format(new Date());

			cardManifests.loadData(sap.ui.require.toUrl("ns/uiprototype/model/cardManifests.json"));

			this.getView().setModel(cardManifests, "manifests");
			this.getView().setModel(new JSONModel({
				homeIconUrl: homeIconUrl,
				date: date
			}));
		},

		onAction: function (oEvent) {
			if (oEvent.getParameter("type") === integrationLibrary.CardActionType.Navigation) {
				MessageToast.show("URL: " + oEvent.getParameter("parameters").url);
			}
		},

		resolveCardUrl: function (sUrl) {
			return sap.ui.require.toUrl("ns/uiprototype/CardsLayout/" + sUrl);
		}

	});
});
