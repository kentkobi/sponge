var Level = Base.extend({
    id: null,
    domRoot: null,
    tileSize: 70,
    rows: null,
    cols: null,
    constructor: function(params){
        $.extend(this, params);
    },
    install: function(){
    	var self = this;
        this.domRoot =     $("<table></table>");
        
        for(y = 0; y <= this.rows; y++){
            this.domRoot.append("<tr></tr>");
            for(x = 0; x <= this.cols; x++){
                var tile = $("<td class='tile' id='tile_" + y + "_" + x + "'></td>").data("location",{x:x,y:y})
                $("tr:last",this.domRoot).append(tile);
            }
        }
        
        $("body").append(this.domRoot);
        
        $(".tile", this.domRoot).bind("click", function(){
        	self.select($(this));
        });
        console.log("level installed");
        
        return this;
    },
    select: function(tile){
    	console.log("tile clicked");
        return tile
    },
    highlight: function(tile, distance){
    	console.log("highlighting tiles...");

    	var axis_x = tile.data("location").x;
		var axis_y = tile.data("location").y;

		var movement_x_start =  axis_x - distance;
		var movement_y_start =  axis_y - distance;
		var movement_length =  distance * 2 + 1;

		for(i=0; i < movement_length; i++){
			for(b=0; b < movement_length; b++){
				$("#tile_" + movement_y_start + "_" + movement_x_start).addClass("highlight");
				movement_x_start = movement_x_start + 1;
			}
			movement_y_start = movement_y_start + 1;
			movement_x_start = axis_x - distance;
		}
    },
    find: function(position){
        return tile
    },
    path: function(start_tile, end_tile){
        
        return path
    },
    lineofsight: function(start_tile, end_tile){
        //return true or false
    }
})  