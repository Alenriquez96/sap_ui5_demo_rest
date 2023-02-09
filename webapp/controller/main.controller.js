sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "jquery.sap.global",
    "sap/ui/model/json/JSONModel",
    "../model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,jQuery, JSONModel, models) {
        "use strict";

        return Controller.extend("com.sap.ui5demorest.controller.main", {

            onInit: function () {
                console.log("Entra");
                var oModel = new JSONModel({count: 0});
                this.getView().setModel(oModel);

            }, 
            onChange: function (oEvent) {
              let oModel = this.getView().getModel();
                oModel.setProperty("/count", oEvent.getParameter("value").length);
            },
            handleApiCall: function() {
                let oModel = new JSONModel();
                let oModelRepos = new JSONModel({data:[{name:"", description:""}]});
                let oModelOrgs = new JSONModel();
                let oTextArea = this.byId("_IDGenTextArea1");
                let sValue = oTextArea.getValue();
          
                oModel.setData({hasContent:false});


                jQuery.ajax({
                  type: "GET",
                  url: "https://port8080-workspaces-ws-zr8ts.us10.trial.applicationstudio.cloud.sap/github_api/users/" + sValue,
                  dataType: "json",
                  success: function(data) {
                    oModel.setData(data);
                    oModel.oData.hasContent = true;
                  },
                  error: function(error) {
                    // Código a ejecutarse en caso de error
                    oModel.setData({hasContent:false});

                  }
                });

                jQuery.ajax({
                  type: "GET",
                  url: "https://port8080-workspaces-ws-zr8ts.us10.trial.applicationstudio.cloud.sap/github_api/users/" + sValue  + "/repos",
                  dataType: "json",
                  success: function(data) {
                    oModelRepos.setData({data});
                  },
                  error: function(error) {
                    // Código a ejecutarse en caso de error

                  }
                });

                jQuery.ajax({
                  type: "GET",
                  url: "https://port8080-workspaces-ws-zr8ts.us10.trial.applicationstudio.cloud.sap/github_api/users/" + sValue  + "/orgs",
                  dataType: "json",
                  success: function(data) {
                    oModelOrgs.setData({data});
                  },
                  error: function(error) {
                    // Código a ejecutarse en caso de error
                  }
                })

                this.getView().setModel(oModel, "oModel");
                this.getView().setModel(oModelRepos, "oModelRepos");
                this.getView().setModel(oModelOrgs, "oModelOrgs");
                console.log(oModelRepos);
                console.log(oModelOrgs);
            }
        });
    });
