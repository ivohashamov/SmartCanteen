sap.ui.define([], function () {
	"use strict";

	return {
        division100AndSubtract: function (value1, value2) {
            var res = (value2-value1)/value2 * 100
            return Math.max(0, res);
        },
        multiplication: function (value1, value2) {
            return value1*value2;
        },
        substraction: function(value1, value2) {
            var res = value1-value2;
            return Math.max(0, res);
        },
        additionTimeWithMultiplication: function (value1, value2) {
            var oldDateObj = new Date();
            var newDateObj = new Date();
            newDateObj.setTime(oldDateObj.getTime() + (value1 * value2 * 60 * 1000));
            return String(newDateObj.getHours()).padStart(2, '0') + ":" + String(newDateObj.getMinutes()).padStart(2, '0');
        },
        dateFormatter: function(value1) {
            return "abc"
        }
	};
});