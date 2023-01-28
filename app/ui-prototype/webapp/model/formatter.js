sap.ui.define([], function () {
	"use strict";

	return {
        division100: function (value1, value2) {
            return value1/value2 * 100;
        },
        multiplication: function (value1, value2) {
            return value1*value2;
        },
        additionTimeWithMultiplication: function (value1, value2) {
            var oldDateObj = new Date();
            var newDateObj = new Date();
            newDateObj.setTime(oldDateObj.getTime() + (value1 * value2 * 60 * 1000));
            return String(newDateObj.getHours()).padStart(2, '0') + ":" + String(newDateObj.getMinutes()).padStart(2, '0');
        }
	};
});