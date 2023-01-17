sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("ns.uiprototype.CardsLayout.componentCard.ComponentCard", {

		onInit: function () {
			var mapImageUrl = sap.ui.require.toUrl("ns/uiprototype/CardsLayout/componentCard/images/map.png");
			this.getView().setModel(new JSONModel({ mapImageUrl: mapImageUrl }));
		}

	});
});