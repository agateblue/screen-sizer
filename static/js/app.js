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
        var url = location.origin + window.location.pathname;
        var iframe_url = get_url();
        var width = $( form ).find('.width').val();
        var height = $( form ).find('.height').val();
        url = url + "?url=" + iframe_url + "&width=" + width + "&height=" + height;
        $(permalink).attr("href", url);
        $("#copy-permalink").val(url);
    }
    
    function zoom_in() {
        update_size(zoom_unit, zoom_unit, true);
        $(form).trigger('sizeChanged');
    }
    
    function zoom_out() {
        update_size(-zoom_unit, -zoom_unit, true);
        $(form).trigger('sizeChanged');
    }
    
    function next_frequent(next_index) {
        var current = $(frequent).find('.active');            
            
        
        if (next_index === 1) {
            if ( current.length === 0 || $(frequent).find("li").index(current)+1 === $(frequent).find("li").length) {
                console.log("next first");
                var next = $(frequent).find("li").first();            
            }
            else {            
                var next = current.next(); 
                console.log("next");
            }
        }
        else {
            console.log($(frequent).find("li").index(current)-1, $(frequent).find("li").length);
            if ( current.length <= 0 || $(frequent).find("li").index(current)-1 === -1) {
                console.log("previous last");
                var next = $(frequent).find("li").last();            
            }
            else {            
                var next = current.prev(); 
                console.log("previous");
            }
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
    
    function toggle_fullscreen() {
        $("body .wrapper header, .header").toggle();
        $(".iframe-wrapper").toggleClass("full");
    }
    
    function toggle_permalink() {
        var sel = "#copy-permalink";
        if ($(sel+".active").length === 1){
            var input = $(sel+".active");
            input.toggleClass('active');
        }
        else {            
            var input = $(sel);
            input.toggleClass('active');
            input.select();
        }
    }
    
    $("body").keydown(function(e){
        var tag = e.target.tagName.toLowerCase();
        if ( tag != 'input' && tag != 'textarea') {
            if (e.which == 70) 
            {
                toggle_fullscreen();
            };
            if (e.which == 80) 
            {
                toggle_permalink();
            };
            if (e.which == 109) 
            {
                zoom_out();
            };
            if (e.which == 107) 
            {
                zoom_in();
            };   
            if (e.which == 82) {
                rotate();
            }
            if (e.which == 32 && e.ctrlKey) {
                e.preventDefault();
                next_frequent(-1);
            }
            else  if (e.which == 32) {
                e.preventDefault();
                next_frequent(1);
            }
            else {
                return;
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

    $(".modal-open").on('click', function(event) {
        console.log('open modal', $(this).attr('data-modal-id'));
        var modal =  $("#"+$(this).attr('data-modal-id'));
        modal.toggleClass("active");
        
    });
    
    $(".modal-close, .modal-bg").on('click', function(event) {
        $(".modal.active").toggleClass('active');
    });    

    // init 
    
        // set from URL from iframe src attribute
    $(form + " input[name='url']").val($( frame ).attr('src'));
    update_permalink();
});
