(function () {
    'use strict';
    
    angular.module('converterApp').service('formatNumberFactory', function(){       
        var self = this;
        this.precision = 10;

        this.setPrecision = function () {

        }

        this.formatNumber = function(inputNum) {
            //var aFloat = inputNum.toPrecision(self.precision);
            var aFloat = math.format(inputNum, {precision: self.precision})
            var aFloatStr = aFloat.toString();
            return parseFloat(aFloatStr);
        }
        
    });
    // http://stackoverflow.com/questions/7312468/javascript-round-to-a-number-of-decimal-places-but-strip-extra-zeros
}());