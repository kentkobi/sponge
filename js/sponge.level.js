var Level = Base.extend({
    id: null,
    domRoot: null,
    tileSize: 70,
    grid: [],
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
                var tile = $("<td class='tile' id='tile_" + x + "_" + y + "'></td>").data("location",{x:x,y:y})
                $("tr:last",this.domRoot).append(tile);
            }
        }
        
        $("body").append(this.domRoot);
        
        $(".tile", this.domRoot).bind("click", function(){
        	self.select($(this));
        });

        this.grid = new Array(this.rows);
		for (i=0; i < this.rows; i++) {
			this.grid[i] = new Array(this.cols)
		}
		
		for(var x = 0; x < this.rows; x++) {
            for(var y = 0; y < this.cols; y++) {
                //for now, everything is walkable
				this.grid[x][y] = 0;
            }   
        }

        console.log("level installed");
        
        return this;
    },
    select: function(tile){
    	console.log("tile clicked");
        return tile
    },
    highlight: function(tile, distance){
    	console.log("highlighting tiles...");
		var tileset = [],
			highlighted_tile = null;
    	var axis_x = tile.data("location").x;
		var axis_y = tile.data("location").y;

		var movement_x_start =  axis_x - distance;
		var movement_y_start =  axis_y - distance;
		var movement_length =  distance * 2 + 1;

		for(i=0; i < movement_length; i++){
			for(b=0; b < movement_length; b++){
				highlighted_tile = $("#tile_" + movement_x_start + "_" + movement_y_start)
				highlighted_tile.addClass("highlight");
				tileset.push(highlighted_tile);
				movement_x_start = movement_x_start + 1;
			}
			movement_y_start = movement_y_start + 1;
			movement_x_start = axis_x - distance;
		}
			
		return tileset;
    },
    find: function(position){
        return tile
    },
    path: function(start_tile, end_tile){
    	var grid = this.grid;	
		var path = AStar(grid,[start_tile.data("location").x, start_tile.data("location").y], [end_tile.data("location").x, end_tile.data("location").y], 'Manhattan');
		console.log(path);

		return path;
    },
    lineofsight: function(start_tile, end_tile){
        //return true or false
    }
})  