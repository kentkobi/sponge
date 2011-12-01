
var los = {
	tileWidth : 70,
	css : { start: "start", finish: "finish", wall: "wall", active: "active" },

	/* To get a X & Y */
	getCoords_XY : function(col, row)  {  
		tempX = ( col * this.tileWidth) - (this.tileWidth / 2);  
		tempY = ( row * this.tileWidth) - (this.tileWidth / 2);   
		xy = {'x':tempX,'y':tempY};
		
		return xy  
	},
	
	/* To get a ROW & COL */
	getCoords_ColRow : function(x, y)  {  
		tempCol = Math.floor((x + (this.tileWidth / 2)) / this.tileWidth);  
		tempRow = Math.floor((y + (this.tileWidth / 2)) / this.tileWidth);  

		ColRow = {'col':tempCol,'row':tempRow};
		return ColRow  
	},
	
	checkLOS : function(col1, row1, col2, row2)  {  
		hasLOS = true;  
		$(".grid_item" ).removeClass("active"); 
		$(".dot" ).remove();
		
		function hypotenuse(a, b) {
		   function square(x) { return x*x; }
		   
		   return Math.sqrt(square(a) + square(b));
		}
		  
		startXY = this.getCoords_XY(col1, row1);  
		endXY = this.getCoords_XY(col2, row2);
		distance = hypotenuse( (endXY.x - startXY.x), (endXY.y - startXY.y)) /15;
		  
		slopeX = (endXY.x - startXY.x) / distance;  
		slopeY = (endXY.y - startXY.y) / distance;
		  
		for(i = 0; i < distance; i++)    {    
			currentX = startXY.x + (slopeX * i);    
			currentY = startXY.y + (slopeY * i);    
			currentTile = this.getCoords_ColRow(currentX+35, currentY+35); 
			$currentTile = $("#cell_" + currentTile.col + "_" + currentTile.row )
			 
			var dot = $("<div class='dot'></div>");
			dot.css({'top': (currentX+70) + 'px', 'left': (currentY+70) + 'px'});
			if($currentTile.hasClass("wall")){
				hasLOS = false;
				break
			}    
			$("#main").append(dot);
		}  

		return hasLOS;  
	},
	
	projectile : function(col1, row1, col2, row2)  {   
		//$(".grid_item" ).removeClass("active"); 
		//$(".dot" ).remove();
		
		function hypotenuse(a, b) {
		   function square(x) { return x*x; }
		   return Math.sqrt(square(a) + square(b));
		}
		  
		startXY 	= this.getCoords_XY(col1, row1);  
		endXY 		= this.getCoords_XY(col2, row2);
		distance 	= hypotenuse( (endXY.x - startXY.x), (endXY.y - startXY.y)) /15;
		slopeX 		= (endXY.x - startXY.x) / distance;  
		slopeY 		= (endXY.y - startXY.y) / distance;
		 
		for(i = 0; i < distance; i++)    {    
			currentX 		= startXY.x + (slopeX * i);    
			currentY 		= startXY.y + (slopeY * i);    
			currentTile 	= this.getCoords_ColRow(currentX+35, currentY+35); 
			$currentTile 	= $("#cell_" + currentTile.col + "_" + currentTile.row )
						
			if($currentTile.hasClass("wall")){
				break
			}    
			
		}  

		return $currentTile;  
	}
}