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
    
    $(form).on("sizeChanged", function(event, reset_current){
        if (reset_current !== false ) {
            $(".size-category .current, .size-category.current, #frequent.current").toggleClass("current");        
        }
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
        var current = $(frequent).find('.current');            
            
        
        if (next_index === 1) {
            if ( current.length === 0 || $(frequent).find("li").index(current)+1 === $(frequent).find("li").length) {
                var next = $(frequent).find("li").first();            
            }
            else {            
                var next = current.next(); 
            }
        }
        else {
            if ( current.length <= 0 || $(frequent).find("li").index(current)-1 === -1) {
                var next = $(frequent).find("li").last();            
            }
            else {            
                var next = current.prev(); 
            }
        }
        
        var dimensions = $(next).attr('data-size').split(" ");
        var width = parseInt(dimensions[0], 10);
        var height = parseInt(dimensions[1], 10);        
         
        update_size(width, height);
        
        $(form).trigger('sizeChanged');
        $(frequent).addClass('current');
        
        $(next).toggleClass("current");
        
    }
    
    function rotate(){
        var height = $( form ).find('.width').val();
        var width = $( form ).find('.height').val();
        update_size(width, height);
        $(form).trigger('sizeChanged', [false,]);
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
    
    function change_website_url() {
        $("#frame-url").select();
    }
    
    function change_width() {
        $("#custom-width" ).select();
    }
    
    function change_height() {
        $("#custom-height" ).select();
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
            if (e.which == 87) 
            {   
                e.preventDefault();
                change_website_url();
            };
            if (e.which == 88) 
            {
                e.preventDefault();
                change_width();
            };
            if (e.which == 67) 
            {
                e.preventDefault();
                change_height();
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
        
        $(this).closest(".size-category").toggleClass("current");
        $(this).toggleClass("current");
    });


    $( form ).submit(function( event ) {
        // use custom size form to update iframe dimensions
        event.preventDefault();
        $(".size-category .current").toggleClass("current");
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
    
    $("#permalink").on('click', function(event){
        
        toggle_permalink();
        event.preventDefault();
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
        var modal =  $("#"+$(this).attr('data-modal-id'));
        modal.toggleClass("active");
        event.preventDefault()
        
    });
    
    $(".modal-close, .modal-bg").on('click', function(event) {
        $(".modal.active").toggleClass('active');
    });    

    $(".close-fullscreen, #fullscreen").on('click', function(event) {
        toggle_fullscreen();
        event.preventDefault();
    });
    $(document).mouseup(function (event)
    {
        var container = $(".active");

        if (!container.is(event.target) // if the target of the click isn't the container...
            && container.has(event.target).length === 0) // ... nor a descendant of the container
        {
            container.toggleClass('active');
        }
    });
    
    // init 
    
        // set from URL from iframe src attribute
    $(form + " input[name='url']").val($( frame ).attr('src'));
    update_permalink();


    
    $("#screenshot-modal .capture").on('click', function(e){
        
        var url = "/screenshot?url=" + $("#external-content").attr('src') + "&width=" + $( form ).find('.width').val() + "&height=" + $( form ).find('.height').val();
        $.getJSON(url, function(data){
            screenshot_url = data['url'];
            screenshot = parse_screenshot(data);

            add_screenshot(screenshot);
            add_screenshot_template(screenshot);
        });
    });

    function parse_screenshot (data) {
        var id = data['id'];
        var screenshot = {id: id, url: data['url']};

        var i = id.indexOf('/');
        var splits = [id.slice(0,i), id.slice(i+1)];

        screenshot['domain'] = splits[0]; 
        // remove file extension and dot and retrive file information from filename
        var file_data = splits[1].split('___');

        screenshot["path"] = file_data[0];
        var size = file_data[1];
        screenshot["width"] = size.split('x')[0];
        screenshot["height"] = size.split('x')[1];
        screenshot["timestamp"] = file_data[2].substring(0, file_data[2].length - 4);
        return screenshot
    }

    // localstorage relative code

    $("#screenshot-modal .clear").on('click', function(e) {
        localStorage.setObj("screenshots", {});
        setup_screenshots();
    });
    Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }

    if (localStorage.getItem("screenshots") === null) {
        localStorage.setObj("screenshots", {});
    }
    function all_screenshots() {
        return localStorage.getObj('screenshots');

    }
    function domain_screenshots(domain) {
        var all = all_screenshots();

        if ( !all.hasOwnProperty(domain)) {
            all[domain] = Array();
        }
        localStorage.setObj('screenshots', all);
        return all[domain];
    }
    function update_domain_screenshots(domain, screenshots) {
        var all = all_screenshots();
        all[domain] = screenshots
        localStorage.setObj("screenshots", all);
        console.dir(window.localStorage);
    }

    function add_screenshot(screenshot) {
        var screenshots = domain_screenshots(screenshot['domain']);
        screenshots.unshift(screenshot);
        update_domain_screenshots(screenshot['domain'], screenshots);
    }

    // templates, from http://stackoverflow.com/questions/14062368/new-recommended-jquery-templates
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };

    function add_screenshot_template(screenshot) {
        var screenshotTemplate = $("#screenshotTemplate").html();
        var template = screenshotTemplate.format(screenshot['url'], screenshot['domain'], screenshot['width'], screenshot['height'], screenshot['timestamp'], screenshot['path'].replace("%2F", "/"));
        $("#screenshots").prepend(template);
    }
    function setup_screenshots(){
        $("#screenshots").empty();
        var domains = all_screenshots();
        $.each(domains, function(i, screenshots){
            console.log(i);
            $.each(screenshots, function() {
                console.log(this);
                add_screenshot_template(this);
            });
        });
    }

    setup_screenshots();
});
