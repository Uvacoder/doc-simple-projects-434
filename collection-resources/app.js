$(document).ready(function() {
    
    // Toggle Show/Hide for Multiple Divs on languages.html page
    $("#C-button").click(function(e) {
        e.preventDefault();
            $(".options-info").not("#C-info").hide();
            $("#C-info").show();
    });

    $("#Python-button").click(function(e) {
        e.preventDefault();
            $(".options-info").not("#Python-info").hide();
            $("#Python-info").show();
    });

    $("#JavaScript-button").click(function(e) {
        e.preventDefault();
            $(".options-info").not("#JavaScript-info").hide();
            $("#JavaScript-info").show();
    });

    /* EXAMPLE OF TOGGLE ANIMATION

    $("#JavaScript-button").click(function(e) {
        e.preventDefault();
            $(".options-info").not("#JavaScript-info").slideUp();
            $("#JavaScript-info").slideToggle("slow", function () {
            });
    });
    */
});
