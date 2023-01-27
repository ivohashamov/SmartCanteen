sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("ns.uiprototype.controller.Dashboard", {
            onInit() {
            },
            onItemSelect: function (oEvent) {
              var oItem = oEvent.getParameter("item");
              this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
            },
            handleUserNamePress: function (event) {
              var oPopover = new Popover({
                showHeader: false,
                placement: PlacementType.Bottom,
                content: [
                  new Button({
                    text: 'Feedback',
                    type: ButtonType.Transparent
                  }),
                  new Button({
                    text: 'Help',
                    type: ButtonType.Transparent
                  }),
                  new Button({
                    text: 'Logout',
                    type: ButtonType.Transparent
                  })
                ]
              }).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');
        
              oPopover.openBy(event.getSource());
            },
            onSideNavButtonPress: function () {
              var oToolPage = this.byId("toolPage");
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
            onButtonPressed: function () {
              
              var theUrl = "http://localhost:4004/API/Occupancies"//?$orderby=date desc&$filter=canteen_ID eq 1&$top=1";
              
              var xmlHttp = new XMLHttpRequest();
              //xmlHttp.responseType = "json";
              xmlHttp.open( "GET", "http://localhost:4004/API/Occupancies", false); // false for synchronous request
              xmlHttp.send( null );
            
              MessageToast.show(JSON.stringify(JSON.parse(xmlHttp.responseText)["value"][0]));
              }
          });
    });