(function () {
    'use strict';
    
    angular.module('converterApp').service('formatNumberFactory', function(){       
        var self = this;
        this.precision = 4;

        this.setPrecision = function (number) {
            if(number){
                self.precision = number;
            }
        }



        this.formatNumber = function(inputNum) {
            //var aFloat = inputNum.toPrecision(self.precision);
            var aFloat = math.format(inputNum, {precision: self.precision});
            //var aFloat = new Decimal(x);
            //aFloat = inputNum.toPrecision(self.precision);

           // Math.round10(aFloat, -1);   // 55.6
            //aFloat = aFloat.toFixed(self.precision);
            //aFloat = Number((aFloat).toFixed(self.precision));
            var aFloatStr = aFloat.toString();
            return parseFloat(aFloatStr);
        }
        
    });
    //http://mathjs.org/docs/datatypes/bignumbers.html
    // http://stackoverflow.com/questions/7312468/javascript-round-to-a-number-of-decimal-places-but-strip-extra-zeros
}());