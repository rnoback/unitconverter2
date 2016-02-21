(function () {
    'use strict';
    
    angular.module('converterApp').service('formatNumberFactory', function(){       
        var self = this;
        this.precision = 5;

        this.setPrecision = function (number) {
            if(number){
                self.precision = number;
            }
        }



        this.formatNumber = function(inputNum) {
            //var aFloat = inputNum.toPrecision(self.precision);
            
            //var aFloat = new Decimal(x);
            //var aFloat = inputNum.toPrecision(self.precision);
           // Math.round10(aFloat, -1);   // 55.6
            //aFloat = aFloat.toFixed(self.precision);
            //aFloat = aFloat.toFixed(self.precision);
            var aFloat = math.format(inputNum, {precision: self.precision});
            // aFloatStr = aFloat.toString();
            return parseFloat(aFloat);

        }
        
    });
    //http://mathjs.org/docs/datatypes/bignumbers.html
    // http://stackoverflow.com/questions/7312468/javascript-round-to-a-number-of-decimal-places-but-strip-extra-zeros
}());