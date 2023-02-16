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
                var oModelCount = new JSONModel({count: 0});
                this.getView().setModel(oModelCount);
            }, 
            _getRouter: function () {
              return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onChange: function (oEvent) {

              let oModelCount = this.getView().getModel();
                oModelCount.setProperty("/count", oEvent.getParameter("value").length);
            },
            _getTextAreaValue : function () {
              return this.byId("_IDGenTextArea1").getValue()
            },
            onNavigateToRepos: function () {
              this._getRouter().navTo("RouteRepos", {
                username: this._getTextAreaValue()
              });
              
              // sap.ui.require([
              //   "sap/m/library"
              // ], sapMLib => sapMLib.URLHelper.redirect("#/repos", /*new window*/false));
            },
            onNavigateToOrgs: function () {
              this._getRouter().navTo("RouteOrgs", {
                username: this._getTextAreaValue()
              });
            }
            ,
            handleApiCall: function() {
                let oModel = new JSONModel();
                let sValue = this._getTextAreaValue();
                let success = false;
                let that = this; //método guarro

                // const f = () => fetch("https://port8080-workspaces-ws-zr8ts.us10.trial.applicationstudio.cloud.sap/github_api/users/" + sValue)
                // .then(response=>response.json()
                // .then(data => console.log(data)))
                // f();

                jQuery.ajax({
                  type: "GET",
                  url: "https://port8080-workspaces-ws-zr8ts.us10.trial.applicationstudio.cloud.sap/github_api/users/" + sValue,
                  dataType: "json",
                  success: function(data) {
                    oModel.setData(data);
                    this.getView().byId("btnRepos").setVisible(true);
                    this.getView().byId("btnOrgs").setVisible(true);
                    success = true;

                  }.bind(this),
                  error: function(error) {
                    // Código a ejecutarse en caso de error
                    this.getView().byId("btnRepos").setVisible(false)
                    this.getView().byId("btnOrgs").setVisible(false)
                  }.bind(this)
                });

                // if(success===true) this.getView().byId("btnRepos").setVisible(true)
                this.getView().setModel(oModel, "oModel");
            }
        });
    });
