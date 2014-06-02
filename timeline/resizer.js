/*
Timeline resizer js

Date: 06-06-2012
Author: Michal Glenc
*/

function initResizer() {
    var resizing = false;
    var frame = $("#timeline").height();

    $(document).mouseup(function(event) {
        resizing = false;
        frame = $("#timeline").height();
    });

    $("#timeline #resizer").mousedown(function(event) {
        resizing = event.pageY;
    });

    $(document).mousemove(function(event) {
        if (resizing)
        {
            $("#timeline").height(frame - resizing + event.pageY);
            
            $('#timeline #shapes-list').height($('#timeline').height() - $('#timeline #resizer').height() - $('#timeline #toolbar').height());
        }
    });
}