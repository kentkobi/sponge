var Player = Base.extend({
    id: null,
    name: null,
    roster: null,
    state: null,
    constructor: function(params){
        $.extend(this, params);
    },
    install: function(){
        //Display profile info at bottom of screen
        
        return this;
    }
})