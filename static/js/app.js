$(document).ready(function (){
    var frame = "#external-content";
    var form = "#website";
    var permalink = "#permalink";
    var zoom_unit = 50;
    var frequent = "#frequent";
    $.event.trigger({
        type:    "sizeChanged",
        message: "size in form has changed",
        time:    new Date()
    });
    
    $(form).on("sizeChanged", function(event){
        $(".size-category .active, .size-category.active, #frequent.active").toggleClass("active");
        update_permalink();
        update_iframe_size();
    });
    
    function update_size(width, height, increment){
        var w = $( form ).find('.width')
        var h = $( form ).find('.height')
        
        if (increment === true) {
            var new_width = parseInt(w.val(), 10) + width;
            w.val(new_width);
            var new_height = parseInt(h.val(), 10) + height;
            h.val(new_height);            
        }
        else {
            w.val( width);
            h.val(height);   
        }
    }
    
    function update_iframe_size(){
        $( frame ).animate({
            height: $( form ).find('.height').val(),
            width: $( form ).find('.width').val(),
        }, 0, function() {});
    }
    
    function update_permalink(){
        // update the permalink with new settings (url, size)
        var url = window.location.pathname;
        var iframe_url = get_url();
        var width = $( form ).find('.width').val();
        var height = $( form ).find('.height').val();
        url = url + "?url=" + iframe_url + "&width=" + width + "&height=" + height;
        $(permalink).attr("href", url);
    }
    
    function zoom_in() {
        update_size(zoom_unit, zoom_unit, true);
        $(form).trigger('sizeChanged');
    }
    
    function zoom_out() {
        update_size(-zoom_unit, -zoom_unit, true);
        $(form).trigger('sizeChanged');
    }
    
    function next_frequent() {
        
        var current = $(frequent).find('.active');        
        if (current.length === 0 || $(frequent).find("li").index(current)+1 === $(frequent).find("li").length) {
            var next = $(frequent).find("li").first();            
        }
        else {            
            var next = current.next();            
        }
        var dimensions = $(next).attr('data-size').split(" ");
        var width = parseInt(dimensions[0], 10);
        var height = parseInt(dimensions[1], 10);        
         
        update_size(width, height);
        
        $(form).trigger('sizeChanged');
        $(frequent).addClass('active');
        
        $(next).toggleClass("active");
        
    }
    
    function rotate(){
        var height = $( form ).find('.width').val();
        var width = $( form ).find('.height').val();
        update_size(width, height);
        $(form).trigger('sizeChanged');
    }
    $("body").keypress(function(e){
        var tag = e.target.tagName.toLowerCase();
        if ( tag != 'input' && tag != 'textarea') {
            if (e.which == 45) 
            {
                zoom_out();
            };
            if (e.which == 43) 
            {
                zoom_in();
            };   
            if (e.which == 32) {
                next_frequent();
            }
            if (e.which == 114) {
                rotate();
            }
        }           
    });
    // from http://stackoverflow.com/questions/646628/how-to-check-if-a-string-startswith-another-string
    if (typeof String.prototype.startsWith != 'function') {
          // see below for better implementation!
          String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
          };
    }

    $("li.size-category > ul").children().on("click", function(event) {
        // catch clicks on devices and update iframe size accordingly
        event.preventDefault();
        
        var dimensions = $(this).attr('data-size').split(" ");
        var width = parseInt(dimensions[0], 10);
        var height = parseInt(dimensions[1], 10);        
         
        update_size(width, height);
        
        $(form).trigger('sizeChanged');
        
        $(this).closest(".size-category").toggleClass("active");
        $(this).toggleClass("active");
    });


    $( form ).submit(function( event ) {
        // use custom size form to update iframe dimensions
        event.preventDefault();
        $(".size-category .active").toggleClass("active");
        var url = get_url();
        var width = $(this).find('.width').val();
        var height = $(this).find('.height').val();
        
        update_size(width, height);
        if (get_url() === $(frame).attr("src")) {
            // iframe url has not changed, juste need to update dimensions
            $(form).trigger('sizeChanged');
        }
        else {
            update_permalink();
            window.location = $(permalink).attr("href");
        }  
    });
    
    function get_url() {
        // return the form's URL, prepend it with http:// if no protocol is present
        var url = $(form + " input[name='url']").val();
        if (!url.startsWith("http")) {
            url = "http://" + url;
        }
        return url;
    }

    $("#languages").on('change', function(event){
        var locale = $(this).val();
        var url = $(permalink).attr("href");
        window.location = "/" + locale + url.substring(url.indexOf("?"))
    });
    
    $("#rotate").on('click', function(event){
        rotate();
    }); 
    
    $("#refresh").on('click', function(event){
        // reload the iframe
        var iframe = $(frame);
        iframe.attr('src', iframe.attr('src'));
    });

    $("#reveal-more").on('click', function(event) {
        $("#more").show();
    });
    
    $("#close-more, #more").on('click', function(event) {
        $("#more").hide();
    });    

    // init 
    
        // set from URL from iframe src attribute
    $(form + " input[name='url']").val($( frame ).attr('src'));
    update_permalink();
});
