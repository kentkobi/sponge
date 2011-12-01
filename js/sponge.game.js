var Game = Base.extend({
    players: null,
    state: null,
    history: null,
    constructor: function(params){
        $.extend(this, params);
    },
    install: function (){
    	var self = this;
        $("body").bind("actor.select", {game:self}, self.eventHandler);
        
        this.state = "started";
        console.log("game installed");
        
        return this;
    },
    init: function(){
        return this;
    },
    select: function (actor, type){
		$(".menu").remove();
        var menu = $("<ul class='menu action-menu'></ul>"),
            items = null;
        
        switch(type){
            case "select":
                /* action menu */
                items = ["attack","move"];
                break;
            case "info":
                /* display public info */
                break;
            case "target":
                items = ["aimed","burst"];
                break;
            default:
                alert("error")
        }
        
        /*build items*/
        for(i=0; i < items.length; i++){
            menu.append("<li class='item'>" + items[i] + "</li>");
        }
        
        /* display near actor */
       menu.css({
        	position: 'absolute',
            top: actor.domRoot.position().top,
            left: actor.domRoot.position().left + actor.domRoot.width()
        });
       $("body").append(menu);
        
        $(".item", menu).bind("click", function(e){
            $("body").trigger({type: "actor.action", method: "update", action: $(this).text(), actor:actor});
            menu.remove();
        });
    },
    eventHandler: function(e){
        e.preventDefault();
        var self = e.data.game;

        if (self[e.method] && self[e.method].apply) {
            self[e.method](e.actor, e.action);
        } else {
            throw new Error('eventHandler(): cannot find method for event ' + e.type);
        }
    }
});