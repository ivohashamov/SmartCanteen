sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "../model/formatter",
  'sap/viz/ui5/data/FlattenedDataset',
  'sap/viz/ui5/controls/common/feeds/FeedItem',
  'sap/viz/ui5/controls/Popover',
  'sap/viz/ui5/controls/VizFrame',
  'sap/viz/ui5/format/ChartFormatter',
  'sap/viz/ui5/api/env/Format',
  'sap/ui/core/Title'
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast, JSONModel, formatter, FlattenedDataset, FeedItem, Popover, VizFrame, ChartFormatter, Format, Title) {
    "use strict";
    return Controller.extend("ns.uiprototype.controller.Dashboard", {
      formatter: formatter,
      onInit: function () {
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

        //update the settings model
        var sCheckBoxId = oEvent.getSource().getId();
        switch (sCheckBoxId) {
          case "container-ns.uiprototype---dashboard--myCheckBox":
            var oCheckBox = this.getView().byId("myCheckBox");
            settingsModel.setProperty("/card1", oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox1":
            var oCheckBox = this.getView().byId("myCheckBox1");
            settingsModel.setProperty("/card2", oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox2":
            var oCheckBox = this.getView().byId("myCheckBox2");
            settingsModel.setProperty("/card3", oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox3":
            var oCheckBox = this.getView().byId("myCheckBox3");
            settingsModel.setProperty("/card4", oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox4":
            var oCheckBox = this.getView().byId("myCheckBox4");
            settingsModel.setProperty("/card5", oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox5":
            var oCheckBox = this.getView().byId("myCheckBox5");
            settingsModel.setProperty("/card6", oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox6":
            var oCheckBox = this.getView().byId("myCheckBox6");
            settingsModel.setProperty("/card7", oCheckBox.getProperty("selected"));
            break;
          }

          //set the settings model
          this.getView().setModel(settingsModel, "settingsModel")
      },
    });
  });
