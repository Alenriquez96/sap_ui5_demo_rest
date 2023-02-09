/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comsap/ui5_demo_rest/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
