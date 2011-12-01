		var owner = null;
		
		window.fbAsyncInit=function(){
		FB.login(function(response) {
		   	if (response.authResponse) {
		     	console.log('Welcome!  Fetching your information.... ');
		 		FB.api('/me', function(response) {
		       		owner = response;	
		     	});
		   } else {
		     console.log('User cancelled login or did not fully authorize.');
		   }
		 }, {scope: 'email'});
		}
	
		$(document).ready(function(){
			initialize();
		});
		function initialize() {    
			           
			if (navigator.geolocation){
				navigator.geolocation.getCurrentPosition(success, error);
			}
			
			function success(position){
				var current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
				var map_options = {     
					zoom: 12,     
					center: current_location,     
					mapTypeId: google.maps.MapTypeId.TERRAIN   
				};    
				var map = new google.maps.Map(document.getElementById("map_canvas"), map_options); 
				
				var current_marker = new google.maps.Marker({
					position: current_location,
					animation: google.maps.Animation.DROP,
					map: map, 
					title:"You are here!"
				});
					   
				google.maps.event.addListener(map, 'zoom_changed', function() {      
					/* will add more plots of claimed land */  
				}); 
				
				
				google.maps.event.addListenerOnce(map, 'bounds_changed', function() { 
					$.ajax({
						url: "/lollies/lands.js",
						cache: false,
						dataType: "json",
						success: function(lands){
							var source = map.getBounds().getNorthEast();
							var source_lng = Math.floor(source.lng()) + 0.5;
							var source_lat = Math.floor(source.lat()) + 0.5;
							var lat, lng, ne, sw;
							lng = source_lng;
		
							for(x =0; x <= 15; x++){
								lat = source_lat;
								for(y =0; y <= 10; y++){
									ne = new google.maps.LatLng(lat, lng);
									sw = new google.maps.LatLng(lat-0.05, lng-0.05);
									var rectangle = new google.maps.Rectangle();
									var latlngbounds = new google.maps.LatLngBounds();
									
									latlngbounds.extend( ne );
									latlngbounds.extend( sw )
									
									box_color = (lands["land_" + ne.lat() + "_" + ne.lng()]) ? "#FF0000":"#000000";
									
									var rectOptions = {       
										strokeColor: "#FF0000",       
										strokeOpacity: 0.8,       
										strokeWeight: 2,       
										fillColor: box_color,       
										fillOpacity: 0.35,       
										map: map,       
										bounds: latlngbounds    
									};     
									
									rectangle.setOptions(rectOptions);
									
									google.maps.event.addListener(rectangle, 'click', function() { 
										var self = this;
										var land_ne = self.getBounds().getNorthEast();
										var id = "land_" + land_ne.lat() + "_" + land_ne.lng();
										
										$.ajax({
										  url: "/lollies/lands.js",
										  cache: false,
										  dataType: "json",
										  success: function(data){
		
										   if(data[id]){
										   		var battle = confirm("land already claimed by " + data[id].owner.name + ". wanna fight for it?");
										   		if(battle){
										   			location.href = "assemble-team.php?player1=" + owner.id + "&player2=" + data[id].owner.id + "&land=" + id;
										   		}else{
										   			alert("I'm not angry, just disappointed.");	
										   		}
										   		return false;
										   }
											
											if( self.getBounds().contains(current_location)){
												/* user in the bounds of the piece of unclaimed land */
												var claim = confirm("wanna claim?");
												if (claim){
													var land_entry = {
														"latlng" : {
															lat: land_ne.lat(),
															lng: land_ne.lng() 
														},
														"owner": owner,
														"color":"#efefef"
													};
													data[id] = land_entry;
		
													$.ajax({
														type: "POST",
														url:"/lollies/claim.php",
														data:{
													        json : JSON.stringify(data) /* convert here only */
													    },
														success:function(){
															self.setOptions({
																fillColor: "#78AB46"
															})
														}
													});
												}
											}
										  }
										});
									});
									lat = lat - 0.05;
								}
								lng = lng - 0.05;
							}
							
						}
					});
							
					
				}); 
			}
			function error (){
				console.log("position not found")
			}
		}