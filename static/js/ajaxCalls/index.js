var putCall = function(url, data, callback, type){

    /*
    return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: data,
        contentType: type
    });
    */
    return $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(data),
        datatype: "application/json",
        contentType: "application/json",
        success: callback
    });
};

var postCall = function(url, data, callback, type){

    /*
    return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: data,
        contentType: type
    });
    */
    return $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        datatype: "application/json",
        contentType: "application/json",
        success: callback
    });
};

var getCall = function (url, data, callback, type)
{
    return $.get(url,data,callback);
    /*$.ajax({
        url: url,
        type: 'GET',
        data: JSON.stringify(data),
        datatype: "application/json",
        contentType: "application/json",
        success: callback
    });*/
};