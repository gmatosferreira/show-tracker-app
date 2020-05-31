$(document).ready(function () {

    // Show one accordion when the other is shown
    $('#collapseLogin').on('show.bs.collapse', function () {
        $('#collapseRegister').collapse('hide');
    });

    $('#collapseRegister').on('show.bs.collapse', function () {
        $('#collapseLogin').collapse('hide');
    });

   
});