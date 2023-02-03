sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"../utils/Utility",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment",
	"sap/ui/model/odata/v4/ODataModel"
], function(Controller, JSONModel, MessageToast, Filter, FilterOperator, Fragment,Utility,ODataModel) {
	"use strict";

	return Controller.extend("ns.uiprototype.controller.Login", {
		onInit: function() {
			this.getView().setModel(new JSONModel({}), "users");
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

			console.table(userMap);
			
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

		},
		// I will keep it for Documentation
		onUserLogin2: async function () {
            //get UI input model

			//var oData = this.getView().getModel(new JSONModel({}),"users");

			var inputLoginModel = this.getView().getModel("login");

			//get all users from the database (hopfully :') )
			// var oUsersModel = new JSONModel();
            // var query2 = jQuery.ajax({
            //     type: "GET", 
            //     contentType: "application/json",
            //     url:"http://localhost:4004/API_front/users",
            //     success: function(data, status) {
			// 		console.log(data)
            //         oUsersModel.setData(data["value"][0])
            //     }
            // })
		




			// var oModel = this.getView().getModel();
			// console.table(oModel) ; 




			// var aFilter = [];
			// aFilter.push(new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.EQ,oData.getProperty("/userID") ));
			// aFilter.push(new sap.ui.model.Filter("password", sap.ui.model.FilterOperator.EQ, oData.getProperty("/password")));

      
        //   console.table(oData);

			// new Filter 
            var nameInput = inputLoginModel.getProperty("/userID");
			var passwordInput = inputLoginModel.getProperty("/password");

			console.log(nameInput, passwordInput);

			var oModel = new ODataModel({
				serviceUrl: "http://localhost:4004/API_front/",
				synchronizationMode : "None"
			  });
			  this.getView().setModel(oModel);
			  console.table(oModel);




			var oFilter = new sap.ui.model.Filter({
				filters: [
				  new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.EQ, inputLoginModel.getProperty("/userID")),
				  new sap.ui.model.Filter("password", sap.ui.model.FilterOperator.EQ, inputLoginModel.getProperty("/password"))
				],
				and: true
			  });

			  //var oBinding = oModel.bindList("/users", null, null, [oFilter]);
			  
              var oList = oModel.bindList("/users");

			  oList.requestContexts(0, 5).then(function (aContexts) {
				aContexts.forEach(function (oContext) {
					// As we have fetched the data already, we can access "Note" through getProperty
					var sNote = oContext.getProperty("name"); 
					if (!sNote) {
						oContext.setProperty("Note", "No notes");
					}
				});
			});


			   console.table(oList);
	
			//   var oNote = oModel.bindProperty("name");
			//   console.table(oNote);
 
 
			  oNote.requestValue().then(function (sValue) {
				  // do something with sValue
				  // Note: We cannot use setValue as oNote is an absolute property binding
				  console.table(sValue);
			  });



			//  var aData =  oModel.read("/users", {
			// 	filters: oFilter
			// });
           
			/// SOLUTION  IMPORTANT
			// var oModel = this.getOwnerComponent().getModel(); 
			
			//   oBinding.attachDataReceived(function(oEvent) {

			// 	var aData = oEvent.getSource().getModel().getData().users;
			// 	console.table(aData);
			// 	if (aData.length > 0) {
			// 	  // redirect to the dashboard view page
			// 	  this.getOwnerComponent().getRouter().navTo("dashboard");
			// 	} else {
			// 	  // show an error message
			// 	  sap.m.MessageToast.show("Incorrect name or password. Please try again.");
			// 	}
			//   });




			// oData.read("/users", {
			// 	filters: [
			// 	  new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.EQ, nameInput),
			// 	  new sap.ui.model.Filter("password", sap.ui.model.FilterOperator.EQ, passwordInput)
			// 	],
			// 	success: function(oData) {
			// 	  if (oData.results.length > 0) {
			// 		sap.ui.core.UIComponent.getRouterFor(this).navTo("dashboard");
			// 	  } else {
			// 		sap.m.MessageToast.show("Incorrect name or password. Please try again.");
			// 	  }
			// 	},
			// 	error: function() {
			// 	  sap.m.MessageToast.show("Failed to retrieve data from the service");
			// 	}
			//   });




			// this.getOwnerComponent().getRouter().navTo("dashboard");




			//var oData2 = new sap.ui.mode.odata.ODataModel();








            
		}
	});
});
