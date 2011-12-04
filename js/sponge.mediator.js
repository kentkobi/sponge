var Mediator = Base.extend({
    game: null,
    constructor: function(params){
        $.extend(this, params);
    },
    install: function (data){
    	var self = this;
        $("body").bind("actor.action", {mediator:this}, self.eventHandler);
               
        for(i = 0; i < this.game.players.length; i++){
        	for(a = 0; a < this.game.players[i].roster.length; a++){
        		this.game.players[i].roster[a] = new Actor(this.game.players[i].roster[a]).install();
        	}
        }
        
        console.log("mediator installed");
        return this;
    },
    update: function (actor, action){       
        console.log("performing " + action + " by " + actor.type)
        
        switch(action){
            case "attack":
                //determine target
                //determine line of sight
                //determine damage
                //actor.attack(location)
                //target.update(damage)
                break;
            case "move":
            	var self = this;
            	self.game.level.highlight(actor.tile, actor.range);
            	$(".highlight").bind("click", function(){
            		$(".highlight").removeClass("highlight");
            		var path = self.game.level.path(actor.tile, $(this));
	                actor.move(path);
            	})
                                
                break;
            default:
                alert("error")
        }
        
        //this.publish(data);
        return this;
    },
    select: function (data){
        var actor = data.actor;
        switch(actor.faction){
            case "friendly":
                sponge.game.menu(actor, "actions");
                break;
            case "enemy":
                if(sponge.player.state = "attacking"){
                    sponge.game.menu(actor, "target");
                }
                break;
            default:
                alert("error")
        }
        sponge.game.menu(actor,"info");
    },
    publish: function (data){
        console.log(data);
    },
    eventHandler: function(e){
        e.preventDefault();
        var self = e.data.mediator;

        if (self[e.method] && self[e.method].apply) {
            self[e.method](e.actor, e.action);
        } else {
            throw new Error('eventHandler(): cannot find method for event ' + e.type);
        }
    }
});