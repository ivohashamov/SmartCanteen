sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../utils/Utility",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("ns.uiprototype.controller.Login", {
		onInit: function() {
			this.getView().setModel(new JSONModel({}), "login");
		},
		onUserLogin2: function () {
			var users = new JSONModel();
			users.loadData("model/users.json");

			this.getView().setModel(users, "users")
			var oData = this.getView().getModel("login").getData();

			this.loginUser(this.getView().getModel("users"), oData)

		},
		onUserLogin: function() {
            //dummy navigation to next page
            this.getOwnerComponent().getRouter().navTo("dashboard");
            return

			var oData = this.getView().getModel("login").getData();
			var oModel = this.getView().getModel();
			var that = this;
			BO.loginUser(oModel, oData)
				.then(function(oResponse) {
					//navigate to
					sap.ui.getCore().setModel(new JSONModel(oResponse.results[0]), "User");
					that.getOwnerComponent().getRouter().navTo("Dashboard");
				})
				.fail(function(oError) {
					sap.m.MessageBox.error(JSON.parse(oError.responseText).error.message.value);
				});
		},
		loginUser: function(oModel, Odata) {
			var aFilter = [];
			aFilter.push(new Filter("userID", FilterOperator.EQ, Odata.userID));
			aFilter.push(new Filter("Password", FilterOperator.EQ, Odata.password));
			return this.readData(oModel, "/Users", {
				filters: aFilter
			});
		},
		submitData: function(oModel, sPath, aData) {
			return Utility.odataCreate(oModel, sPath, aData);
		},
		readData: function(oModel, sPath, aParameters) {
			return Utility.odataRead(oModel, sPath, aParameters);
		}

	});
});
