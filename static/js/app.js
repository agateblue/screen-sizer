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


    $( "#website" ).submit(function( event ) {
        // append query string to URL before submitting url form
        event.preventDefault();
        var url = get_url();
        window.location = window.location.pathname + "?url=" + url;
    });



    $("li.size-category > ul").children().on("click", function(event) {
        // catch clicks on devices and update iframe size accordingly
        event.preventDefault();

        $(".size-category .active").toggleClass("active");
        $(this).toggleClass("active");

        var dimensions = $(this).attr('data-size').split(" ");
        var width = parseInt(dimensions[0], 10);
        var height = parseInt(dimensions[1], 10);
        
         $( "#external-content" ).animate({
            height: height,
            width: width,
        }, 600, function() {});
        $( "#custom-size" ).find('.width').val(width);
        $( "#custom-size" ).find('.height').val(height);
        update_permalink();
    });


    $( "#custom-size" ).submit(function( event ) {
        // use custom size form to update iframe dimensions
        event.preventDefault();
        $(".size-category .active").toggleClass("active");
        var url = get_url();
        var width = $(this).find('.width').val();
        var height = $(this).find('.height').val();
        $( "#external-content" ).animate({
            height: height,
            width: width,
        }, 600, function() {});
        update_permalink();
    });
    function get_url() {
        // return the form's URL, prepend it with http:// if no protocol is present
        var url = $("#website input[name='url']").val();
        if (!url.startsWith("http")) {
            url = "http://" + url;
        }
        return url;
    }

    $("#rotate").on('click', function(event){
        // rotate the iframe
        var iframe = $("#external-content");
        var height = $( "#custom-size" ).find('.width').val();
        var width = $( "#custom-size" ).find('.height').val();

        iframe.animate({
            height: height,
            width: width,
        }, 600, function() {});
        $( "#custom-size" ).find('.width').val(width);
        $( "#custom-size" ).find('.height').val(height);
        update_permalink();
    });
     
    function update_permalink(){
        // update the permalink with new settings (url, size)

        console.log("updating permalink");
        var url = window.location.pathname;
        var iframe_url = get_url();
        var width = $( "#custom-size" ).find('.width').val();
        var height = $( "#custom-size" ).find('.height').val();
        url = url + "?url=" + iframe_url + "&width=" + width + "&height=" + height;
        $("#permalink").attr("href", url);
    }
    $("#refresh").on('click', function(event){
        // reload the iframe
        var iframe = $("#external-content");
        iframe.attr('src', iframe.attr('src'));

    });
    update_permalink();

    $(".collapsible > .collapse").on('click', function(event){
         event.preventDefault();
        var content = $(".collapsible .content");
        content.toggleClass("collapsed");

        if ($(".collapsed").length > 0) {
            $(this).html("+");
        }
        else {
            $(this).html("-");
        }

    }); 
});