(function () {
    'use strict';
    
    angular.module('converterApp').service('unitSelectionService', ['$filter', function($filter){
        var self = this;

        this.currentSelectedId = 0;
        this.currentSelectedLabel = '';
        this.defaultButtonText = 'Units';
        this.units = [
            {
                id:1,
                label:'length'
            },
            {
                id:2,
                label:'area'
            },
            {
                id:3,
                label:'volume'
            },
            {
                id:4,
                label:'dry-volume'
            },
            {
                id:5,
                label:'mass'
            },
            {
                id:6,
                label:'power'
            },
            {
                id:7,
                label:'energy'
            },
            {
                id:8,
                label:'force'
            },
            {
                id:9,
                label:'temperature'
            },
            {
                id:10,
                label:'velocity'
            },
            {
                id: 11,
                label:'acceleration',
            },
            {
                id: 12,
                label:'time',
            },
            {
                id: 13,
                label:'data',
            },
            {
                id: 14,
                label:'angle',
            },
            {
                id:15,
                label:'currency'
            }

        ];

        this.units = $filter('orderBy')(this.units, 'label');
        
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
    }]);
}());