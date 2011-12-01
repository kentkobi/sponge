var Actor = Entity.extend({
    faction: null,
    type: null,
    health: 100,
    attack: 0,
    defense: 0,
    install: function(){
		var self = this;
		
		this.base // refers to a parent method
			.apply(this, // run that method from the same current instance
				arguments); // with the existing arguments received at run time
		
		$(".body", this.domRoot).bind('click', function(){
			self.select();
		});
		
		console.log("actor installed");
		return this;
	},
    move : function( path ) {
        var self     = this;
        var sprite     = self.domRoot;
        
        if( path.length ){
            var direction = null;
            var target = $("#cell_" + path[0].x + "_" + path[0].y);
            
            /* get x,y of player */
            var player_x = sprite.position().left;
            var player_y = sprite.position().top;
            
            /* get x,y of destination */
            var target_x = target.position().left;
            var target_y = target.position().top;
            
            if(player_y > target_y){
               direction = "north";
            } else if (player_y < target_y) {
               direction = "south";
            }
            
            if(player_x < target_x){
               direction = "east";
            } else if (player_x > target_x) {
               direction = "west";
            }
            
            sprite.addClass(direction).animate({
                top : target_y,
                left : target_x
            }, 500, 'linear', function() {
                self.location.row = path[0].y;
                self.location.col = path[0].x;
                path.shift();
                sprite.removeClass(direction);
                self.tile = target;
                target.removeClass("active");
                self.move( path );
            });    
        }
    },
    attack: function(){
        this.animate({
            start:            0,
            frames:            4,        // number of frames to be displayed when playing the animation
            distance:        70,        // distance in pixels between two frames
            offsetY:        offsetY,
            delay:             150,    // rate at which the frame must be played in miliseconds
            repeat:            1        // number of times to repeat (-1 for infinte)
        })
    },
    die: function() {
        this.state = "dead";
        this.domRoot.stop(true).addClass("dead");
        
        this.animate({
            start:            28,
            frames:            8,        // number of frames to be displayed when playing the animation
            distance:        128,        // distance in pixels between two frames
            offsetY:        -40,
            offsetX:        29,
            delay:             70,    // rate at which the frame must be played in miliseconds
            repeat:            1        // number of times to repeat (-1 for infinte)
        });    
        
        this.uninstall();
    },
    info: function(){
        
    },
    select: function(){
    	var self = this;
        $("body").trigger({type:"actor.select", method: "select", action: "select", actor:self});
    }
})