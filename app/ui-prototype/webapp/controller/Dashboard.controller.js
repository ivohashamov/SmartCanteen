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
    var currentWeekday = 0
    const weekdays = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7
    }

    return Controller.extend("ns.uiprototype.controller.Dashboard", {
      formatter: formatter,
      onInit: async function () {
        //Load default JSONModel
        await fetch('./model/defaultData.json').then(response => response.json()).then(data => $.sap.defaultData = new JSONModel(data))

        //Firstly update the cards
        this.updateFioriCards()
        this.updateAnalyticsCards()

        //Set time interval for updating the cards
        this._trigger = new sap.ui.core.IntervalTrigger(6 * 1000 /* refresh every x sec */)
        this._trigger.addListener(this.onRefreshTriggered, this);
      },     updateFioriCards: async function() {
        //Fiori cards
        var oQueueOccupanciesModel = new JSONModel();  
        var query = jQuery.ajax({
            type: "GET", 
            contentType: "application/json",
            url:"http://localhost:4004/API_front/queueLengths?$orderby=date desc",
            success: function(data, status) {
                if(data["value"].length > 0)
                    oQueueOccupanciesModel.setData(data["value"][0])
                else
                    oQueueOccupanciesModel.setData($.sap.defaultData.getProperty("/QueueOccupancies"))
            },
            fail: function(data, status) {
                //todo
                console.log("hey")
            }
        })
        this.getView().setModel(oQueueOccupanciesModel, "QueueOccupancies")

        //Occupied Tables
        var oOccupiedTablesModel = new JSONModel();
        var query2 = jQuery.ajax({
            type: "GET", 
            contentType: "application/json",
            url:"http://localhost:4004/API_front/canteenOccupancies?$orderby=date desc",
            success: function(data, status) {
                if(data["value"].length > 0)
                    oOccupiedTablesModel.setData(data["value"][0])
                else
                    oOccupiedTablesModel.setData($.sap.defaultData.getProperty("/OccupiedTables"))
            }
        })
        this.getView().setModel(oOccupiedTablesModel, "OccupiedTables")

        //TotalTables
        var oTotalTablesModel = new JSONModel();
        var query2 = jQuery.ajax({
            type: "GET", 
            contentType: "application/json",
            url:"http://localhost:4004/API_front/canteen",
            success: function(data, status) {
                oTotalTablesModel.setData(data["value"][0])
            }
        })
        this.getView().setModel(oTotalTablesModel, "TotalTables")

        //Analyctical card
        var oVizFrame = this.oVizFrame = this.getView().byId("analyticalCard");
        //oVizFrame
    },
    updateAnalyticsCards: async function()  {
        //Current Analytics
        this.updateCurrentAnalyticsCard()
        var vizFrame = this.getView().byId("idVizFrame")
        vizFrame.setVizProperties({
            plotArea: {
                primaryScale: {
                    fixedRange: true,
                    minValue: 0,
                    maxValue: 20
                },
                dataPointSize: {
                    max: 40
                },
                dataLabel: {
                    visible: true
                },
                colorPalette: ["#AF003F"]
            },
            legend : {
                visible: false
            },
            categoryAxis: {
                label : {visible: true}
            },
            title: {
                visible: false
            }
        })

        //Past Analytics
        var currentDate = new Date()
        currentWeekday = currentDate.getDay()
        this.updatePastAnalyticsCard(Object.keys(weekdays).find(key => weekdays[key] === currentWeekday))
        var vizFrame = this.getView().byId("idVizFrame2")
        vizFrame.setVizProperties({
            plotArea: {
                primaryScale: {
                    fixedRange: true,
                    minValue: 0,
                    maxValue: 20
                },
                dataPointSize: {
                    max: 40
                },
                dataLabel: {
                    visible: true
                },
                colorPalette: ["#AF003F"]
            },
            legend : {
                visible: false
            },
            categoryAxis: {
                label : {visible: true}
            },
            title: {
                visible: false
            }
        })
    },
    updateCurrentAnalyticsCard: async function() {
        var oOccupiedTablesModel = new JSONModel();
        var query2 = jQuery.ajax({
            type: "GET", 
            contentType: "application/json",
            url:"http://localhost:4004/API_front/canteenOccupancies?$apply=filter(entity_ID eq 1 and day(date) eq " + new Date().getDate() + ")/groupby((hour),aggregate(count with average as averageCount))",
            success: function(data, status) {
                if(data["value"].length > 0) {
                    for (let i = 0; i< data["value"].length; i++) {
                        data["value"][i]["averageCount"] = Math.floor(data["value"][i]["averageCount"])
                    }
                    oOccupiedTablesModel.setData(data)
                }   
            }
        })
        this.getView().setModel(oOccupiedTablesModel, "a1")
    },
    updatePastAnalyticsCard: async function(weekday)
    {
        this.getView().setModel(new JSONModel({'day': weekday}), "weekday");
        var oOccupiedTablesModel = new JSONModel();
        var query2 = jQuery.ajax({
            type: "GET", 
            contentType: "application/json",
            url:"http://localhost:4004/API_front/canteenOccupancies?$apply=filter(entity_ID eq 1 and weekday eq '"+weekday+"')/groupby((hour),aggregate(count with average as averageCount))",
            success: function(data, status) {
                if(data["value"].length > 0)
                {
                    for (let i = 0; i< data["value"].length; i++) {
                        data["value"][i]["averageCount"] = Math.floor(data["value"][i]["averageCount"])
                    }
                    oOccupiedTablesModel.setData(data)
                }
            }
        })
        this.getView().setModel(oOccupiedTablesModel, "a2")
    },
    onBeforePress: function () {
        if(currentWeekday > 1) {
            currentWeekday = currentWeekday - 1
            var wDay = Object.keys(weekdays).find(key => weekdays[key] === currentWeekday)
            this.updatePastAnalyticsCard(wDay)
        }
    },
    onNextPress: function () {
        if(currentWeekday < 5) {
            currentWeekday = currentWeekday + 1
            var wDay = Object.keys(weekdays).find(key => weekdays[key] === currentWeekday)
            this.updatePastAnalyticsCard(wDay)
        }
    },
    onRefreshTriggered: async function () {
        await this.updateFioriCards()
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
      onButtonPressed: function () {

        var theUrl = "http://1584749btrial-dev-smartcanteen-srv.cfapps.us10-001.hana.ondemand.com/API_front/canteenOccupancies?$orderby=date desc&$filter=entity_ID eq 1&$top=1";

        var xmlHttp = new XMLHttpRequest();
        //xmlHttp.responseType = "json";
        xmlHttp.open("GET", "localhost:4004/API_front/canteenOccupancies", false); // false for synchronous request
        xmlHttp.send(null);

        MessageToast.show(JSON.stringify(JSON.parse(xmlHttp.responseText)["value"][0]));
      },
      onCheckboxSelected: function (oEvent) {
  
        var sCheckBoxId = oEvent.getSource().getId();
     

        switch (sCheckBoxId) {
          case "container-ns.uiprototype---dashboard--myCheckBox":
            var oCheckBox = this.getView().byId("myCheckBox");
            this.getView().byId("card1").setVisible(oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox1":
            var oCheckBox = this.getView().byId("myCheckBox1");
            this.getView().byId("card2").setVisible(oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox2":
            var oCheckBox = this.getView().byId("myCheckBox2");
            this.getView().byId("card3").setVisible(oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox3":
            var oCheckBox = this.getView().byId("myCheckBox3");
            this.getView().byId("card4").setVisible(oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox4":
            var oCheckBox = this.getView().byId("myCheckBox4");
            this.getView().byId("card5").setVisible(oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox5":
            var oCheckBox = this.getView().byId("myCheckBox5");
            this.getView().byId("card6").setVisible(oCheckBox.getProperty("selected"));
            break;
          case "container-ns.uiprototype---dashboard--myCheckBox6":
            var oCheckBox = this.getView().byId("myCheckBox6");
            this.getView().byId("card7").setVisible(oCheckBox.getProperty("selected"));
            break;
        }
      },
    });
  });
