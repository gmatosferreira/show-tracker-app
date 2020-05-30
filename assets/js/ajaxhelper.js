function ajaxHelper(uri, method, data) {
    now = new Date();
    if(sessionStorage.getItem('TVDBToken')==null || sessionStorage.getItem('TVDBTokenExpires') == null || now.getTime() - sessionStorage.getItem('TVDBTokenExpires') > 86000000) {
        console.log("Token expired or inexistent!");
        return null;
    }
    console.log('Bearer ' + sessionStorage.getItem('TVDBToken'));
    alert("Test " + now.getTime());
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'jsonp',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('TVDBToken'));
        },
        success: function(data, status) {
            console.log("success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
        },
    })
}