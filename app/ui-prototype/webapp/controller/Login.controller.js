sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"../utils/Utility",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment"
], function(Controller, JSONModel, MessageToast, Filter, FilterOperator, Fragment) {
	"use strict";

	return Controller.extend("ns.uiprototype.controller.Login", {
		onInit: function() {
			this.getView().setModel(new JSONModel({}), "login");
		},
		onUserLogin: async function () {
			//get UI input model
			var inputLoginModel = this.getView().getModel("login");

			//get all users from database
			var oData = []
			await fetch('./model/users.json').then(response => response.json()).then(data => oData = data)
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel,"users");
			var userMap = new Map(this.getView().getModel("users").getProperty("/users").map((obj) => [obj.name, obj.password]));
			
			//check if user extists and if password equals
			if(userMap.has(inputLoginModel.getProperty("/userID"))
			&& userMap.get(inputLoginModel.getProperty("/userID")) === inputLoginModel.getProperty("/password"))
			{
				this.getOwnerComponent().getRouter().navTo("dashboard");
			}
			else
			{
				MessageToast.show("Username or Password not correct!")
			}

		}
	});
});
