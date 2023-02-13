sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "jquery.sap.global"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, jQuery) {
    "use strict";
    
    return Controller.extend("com.sap.ui5demorest.controller.Repos", {
        _getRouter: function () {
          return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit: function () {
            this._getRouter().getRoute("RouteRepos").attachPatternMatched(this._onObjectMatched.bind(this), this);
          },
          _onObjectMatched: function (oEvent) {
            let oModelRepos = new JSONModel({data:[{name:"", description:""}]});
            
            let sValue = oEvent.mParameters.arguments.username;
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
              this.getView().setModel(oModelRepos, "oModelRepos");
      }
    });
            
          }
        );