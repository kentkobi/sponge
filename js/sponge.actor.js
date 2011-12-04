var SPRITE = {
	walk: {
		north: -547,
		east: -547,
		south: -547,
		west: -547
	},
	attack: {
		north: -547,
		east: -547,
		south: -547,
		west: -547
	},
	idle: {
		north: -547,
		east: -547,
		south: -547,
		west: -547
	},
	die:{
		north: -547,
		east: -547,
		south: -547,
		west: -547
	}
}

var Actor = Entity.extend({
    faction: null,
    type: null,
    state: null,
    orientation: null,
    health: 100,
    attack: 0,
    defense: 0,
    range: 2,
    install: function(){
		var self = this;
		
		this.base // refers to a parent method
			.apply(this, // run that method from the same current instance
				arguments); // with the existing arguments received at run time
		
		$(".body", this.domRoot).bind('click', function(){
			self.select();
		});
		
		self.idle();
		
		console.log("actor installed");
		return this;
	},
	idle: function(){
		var offsetY = 0;
		
		switch(this.orientation){
			case("north"):
				offsetY = -294;
				break;
			case("east"):
				offsetY = -547;
				break;
			case("south"):
				offsetY = -809;
				break;
			case("west"):
				offsetY = -40;
				break;
		}
					
        this.animate({
            start: 0,
            frames: 3,        // number of frames to be displayed when playing the animation
            distance: 128,        // distance in pixels between two frames
            offsetY: offsetY,
            offsetX: 29,
            delay: 250,    // rate at which the frame must be played in miliseconds
            repeat: -1        // number of times to repeat (-1 for infinte)
        })
    },
    move : function( path ) {
        var self     = this;
        var sprite     = self.domRoot;
        
        if( path.length ){
            var direction = null;
            var target = $("#tile_" + path[0].col + "_" + path[0].row);
            var offsetY = -40;
            target.css("background","red");
            
            /* get x,y of player */
            var player_x = sprite.position().left;
            var player_y = sprite.position().top;
            
            /* get x,y of destination */
            var target_x = target.position().left;
            var target_y = target.position().top;
            
            if(target_y != player_y){
				if(target_y < player_y){
					// going up
					offsetY = -294;
				} else {
					// going down
					offsetY = -809;
				}
			}
			
			if(target_x != player_x){
				if(target_x > player_x){
					// going right
					offsetY = -547;
				} else {
					// going left
					offsetY = -40;
				}
			}
            
            this.animate({
				start:			4,
				frames:			7,		// number of frames to be displayed when playing the animation
				distance:		128,		// distance in pixels between two frames
				delay: 			250,		// rate at which the frame must be played in miliseconds
				offsetY:		offsetY,
				offsetX:		29,
				repeat:			1		// number of times to repeat (-1 for infinte)
			})
            
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
        }else{
        	self.idle();
        }
    },
    attack: function(){
        this.animate({
            start: 0,
            frames: 4,        // number of frames to be displayed when playing the animation
            distance: 70,        // distance in pixels between two frames
            offsetY: offsetY,
            delay: 150,    // rate at which the frame must be played in miliseconds
            repeat: 1        // number of times to repeat (-1 for infinte)
        })
    },
    hit: function(){
    	
    },
    die: function() {
        this.state = "dead";
        this.domRoot.stop(true).addClass("dead");
        
        this.animate({
            start: 28,
            frames: 8,        // number of frames to be displayed when playing the animation
            distance: 128,        // distance in pixels between two frames
            offsetY: -40,
            offsetX: 29,
            delay: 70,    // rate at which the frame must be played in miliseconds
            repeat:  1        // number of times to repeat (-1 for infinte)
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