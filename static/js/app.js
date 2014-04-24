$(document).ready(function (){
    
    $("#website input[type='url']").val($( "#external-content" ).attr('src'));

    $( "#website" ).submit(function( event ) {
        event.preventDefault();
        var url = get_url();
        window.location = window.location.pathname + "?url=" + url;
    });

    $("#sizes > li > ul").children().on("click", function(event) {
        event.preventDefault();
        var dimensions = $(this).attr('data-size').split(" ");
        var width = parseInt(dimensions[0], 10);
        var height = parseInt(dimensions[1], 10);
         $( "#external-content" ).animate({
            height: height,
            width: width,
        }, 600, function() {});
        //$("#external-content").height(height).width(width);
    });

    $( "#custom-size" ).submit(function( event ) {
        event.preventDefault();
        var url = get_url();
        var width = $(this).find('.width').val();
        var height = $(this).find('.height').val();
        window.location = window.location.pathname + "?url=" + url + "&width=" + width + "&height=" + height ;
    });
    function get_url() {
        return $("#website input[type='url']").val();
    }

    function update_size(width, height){

    }
});
