(function () {
    'use strict';
    
    angular.module('converterApp').service('formatNumberFactory', function(){       
        var self = this;
        this.precision = 10;

        this.setPrecision = function (number) {
            if(number){
                self.precision = number;
            }
        }

        this.round_extra_sf = function(f){
            var s=f.toPrecision(10);
            s=s.replace(/^([\+\-0-9\\.]*[1-9\.])0+((?:e[0-9\+\-]+)?)$/g,'$1$2');
            s=s.replace(/\.((?:e[0-9\+\-]+)?)$/g,'$1');
            return s;
        }

        this.formatNumber = function(inputNum) {
            var aFloat = inputNum.toPrecision(self.precision);
            
            //var aFloat = new Decimal(x);
            //var aFloat = inputNum.toFixed(self.precision);
            // Math.round10(aFloat, -1);   // 55.6
            //aFloat = aFloat.toFixed(self.precision);
            //aFloat = aFloat.toFixed(self.precision);
            //var aFloat = math.format(inputNum, {precision: self.precision});
            // aFloatStr = aFloat.toString();
            return parseFloat(aFloat);

        }

         this.formatNumber3 = function(inputNum) {
            var aFloat = inputNum.toPrecision(5);
            return parseFloat(aFloat);
        }
         this.formatNumber4 = function(inputNum) {
            var aFloat = inputNum.toPrecision(10);
            return parseFloat(aFloat);
        }

        this.formatNumber2 = function(inputNum){
            var aFloat = math.format(inputNum, {precision: 14});
            //var aFloat = Math.round(inputNum, 2);
            //var aFloatStr = aFloat.toString();
            return parseFloat(aFloat);
        }

        this.storeName = "";
        this.storeEmail = "";
        this.storeComment = "";
      
    });
    // http://mathjs.org/docs/datatypes/bignumbers.html
    // http://stackoverflow.com/questions/7312468/javascript-round-to-a-number-of-decimal-places-but-strip-extra-zeros
}());