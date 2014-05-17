$(document).ready(function (){
    // from http://stackoverflow.com/questions/646628/how-to-check-if-a-string-startswith-another-string
    if (typeof String.prototype.startsWith != 'function') {
          // see below for better implementation!
          String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
          };
    }
    // set from URL from iframe src attribute
    $("#website input[name='url']").val($( "#external-content" ).attr('src'));

    $("li.size-category > ul").children().on("click", function(event) {
        // catch clicks on devices and update iframe size accordingly
        event.preventDefault();

        $(".size-category .active, .size-category.active").toggleClass("active");
        $(this).closest(".size-category").toggleClass("active");
        $(this).toggleClass("active");

        var dimensions = $(this).attr('data-size').split(" ");
        var width = parseInt(dimensions[0], 10);
        var height = parseInt(dimensions[1], 10);
        
         $( "#external-content" ).animate({
            height: height,
            width: width,
        }, 600, function() {});
        $( "#website" ).find('.width').val(width);
        $( "#website" ).find('.height').val(height);
        update_permalink();
    });


    $( "#website" ).submit(function( event ) {
        // use custom size form to update iframe dimensions
        event.preventDefault();
        $(".size-category .active").toggleClass("active");
        var url = get_url();
        var width = $(this).find('.width').val();
        var height = $(this).find('.height').val();
        
        update_permalink();
        if (get_url() === $("#external-content").attr("src")) {
            // iframe url has not changed, juste need to update dimensions
            $( "#external-content" ).animate({
                height: height,
                width: width,
            }, 600, function() {});
        }
        else {
            window.location = $("#permalink").attr("href");
        }
        
    });
    function get_url() {
        // return the form's URL, prepend it with http:// if no protocol is present
        var url = $("#website input[name='url']").val();
        if (!url.startsWith("http")) {
            url = "http://" + url;
        }
        return url;
    }

    $("#languages").on('change', function(event){
        var locale = $(this).val();
        var url = $("#permalink").attr("href");
        window.location = "/" + locale + url.substring(url.indexOf("?"))
    });
    $("#rotate").on('click', function(event){
        // rotate the iframe
        var iframe = $("#external-content");
        var height = $( "#website" ).find('.width').val();
        var width = $( "#website" ).find('.height').val();
        update_width(width, height);
        
    });
     
    function update_width(width, height) {
        $( "#website" ).find('.width').val(width);
        $( "#website" ).find('.height').val(height);

        var iframe = $("#external-content");
        iframe.animate({
            height: height,
            width: width,
        }, 600, function() {});
        update_permalink();
    }
    function update_permalink(){
        // update the permalink with new settings (url, size)

        var url = window.location.pathname;
        var iframe_url = get_url();
        var width = $( "#website" ).find('.width').val();
        var height = $( "#website" ).find('.height').val();
        url = url + "?url=" + iframe_url + "&width=" + width + "&height=" + height;
        $("#permalink").attr("href", url);
    }
    $("#refresh").on('click', function(event){
        // reload the iframe
        var iframe = $("#external-content");
        iframe.attr('src', iframe.attr('src'));

    });

    $("#reveal-more").on('click', function(event) {
        $("#more").show();
    });
    $("#close-more, #more").on('click', function(event) {
        $("#more").hide();
    });
    update_permalink();

});
