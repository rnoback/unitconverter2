(function () {
    'use strict';
    
    angular.module('converterApp').service('unitSelectionService', function(){
        var self = this;

        this.currentSelectedId = 0;
        this.currentSelectedLabel = '';

        this.units = [
            {
                id:1,
                label:'length'
            },
            {
                id:2,
                label:'weight'
            }
        ];
        
        this.getLabelById = function(id){
            for(var i=0; i<self.units.length; i++){
                if(self.units[i].id === id){
                    return self.units[i].label;
                }
            }
        };
        
        this.redirectUnit = function(curUnit){
            self.currentSelectedLabel = self.getLabelById(curUnit.id);
            window.location.href='#/' + self.currentSelectedLabel;
            //self.currentSelectedId = curUnit.id;
        };
    });

}());