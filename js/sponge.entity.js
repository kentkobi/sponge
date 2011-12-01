var Entity = Base.extend({
    id: null,
    type: null,
    domRoot: null,
    location: null,
    constructor: function(params){
        $.extend(this, params);
    },
    install: function(){
        var self = this;
        var sprite = $("<div class='" + self.type + "' id='" + self.id + "'><div class='wrapper'><div class='body'></div></div></div>");
        
        self.tile = $("#tile_" + self.location.row + "_" + self.location.col);    
        
        sprite.css({
        	position: 'absolute',
            top: self.tile.position().top,
            left: self.tile.position().left
        });
        
        $("body").append(sprite);
        self.domRoot = $("#" + self.id);
        
        return this;
    },
    init: function(){
        return this;
    },
    animate: function(){
        var self = this;
        var body = $(".body", self.domRoot);
        clearTimeout(this.timer);
        
        var defaults = {
            start:            0,
            frames:            3,        // number of frames to be displayed when playing the animation
            distance:        70,        // distance in pixels between two frames
            delay:             200,    // rate at which the frame must be played in miliseconds
            offsetY:        0,
            offsetX:        0,
            repeat:            -1,        // number of times to repeat (-1 for infinte)
            count:            0
        };
        options = $.extend(defaults, options);

        if(options.repeat != 0){
            body.css("background-position", "-" + (options.distance * (options.start+options.count) + options.offsetX) + "px " + options.offsetY + "px");
            
            options.count = (options.count < options.frames) ? options.count+1 : 0;
            if(options.repeat != -1 && options.count >= options.frames){
                options.repeat = options.repeat - 1;
            }
            this.timer = setTimeout(function(){    self.animate(options) }, options.delay);
        } else {
            if ($.isFunction(options.callback)) {
                options.callback.apply(self);
            }
        }
    },
    uninstall: function(){
        this.domRoot.unbind();
        
        return this;
    },
    destroy: function(){
        this.domRoot.remove();
        
        return this;
    }
})