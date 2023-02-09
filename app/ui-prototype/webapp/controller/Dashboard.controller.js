sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "../model/formatter"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, formatter) {
    "use strict";
    return Controller.extend("ns.uiprototype.controller.Dashboard", {
      formatter: formatter,
      onInit: function () {
      },
      onAfterRendering: function () {
        //retrieve settingsModel
        var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
        var settingsModel = oStore.get("settingsModel");
        this.getView().setModel(new JSONModel(settingsModel), "settingsModel")

        //update settings
      },
      onItemSelect: function (oEvent) {
        var oItem = oEvent.getParameter("item");
        this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
      },
      onSideNavButtonPress: function () {
        var oToolPage = this.byId("dashboard");
        var bSideExpanded = oToolPage.getSideExpanded();

        this._setToggleButtonTooltip(bSideExpanded);

        oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
      },
      _setToggleButtonTooltip: function (bLarge) {
        var oToggleButton = this.byId('sideNavigationToggleButton');
        if (bLarge) {
          oToggleButton.setTooltip('Large Size Navigation');
        } else {
          oToggleButton.setTooltip('Small Size Navigation');
        }
      },
      onCheckboxSelected: function (oEvent) {
        //get the settings model
        var settingsModel = this.getView().getModel("settingsModel")

        //and safe it persistant
        var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
        oStore.put("settingsModel", settingsModel.getProperty("/"));
      },
    });
  });
