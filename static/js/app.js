$(document).ready(function (){
    
    function get_url(){
        
    }
    $( "#website" ).submit(function( event ) {
        event.preventDefault();
        var queryString = $('#website').serialize();
        console.log(queryString);
        window.location = window.location.pathname + "?" + queryString;
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
});
