module.exports =
{
    GetCurrentURLDateString: function ()
    {
        return GetCurrentURLDateString();
    },
    GetCurrentDateString: function ()
    {
        return GetCurrentDateString();
    },
    GetCurrentTimeString: function ()
    {
        return GetCurrentTimeString();
    },
    StringLimitLength: function (str,max_length)
    {
        return StringLimitLength(str,max_length);
    }
}

function StringLimitLength(str,max_length){

    if(str.length > max_length)
    {
        return str.substring(0, max_length-3) + "...";
    }
    else
    {
        return str;
    }

}
function GetCurrentURLDateString(){
    
    var today = new Date();    

    var y = today.getFullYear();
    var m = (today.getMonth() + 1);
    var d = today.getDate();

    var date = y + '-' + ((m < 10) ? "0":"") + m + '-' + ((d < 10) ? "0":"") + d;

    return (date.toString().split("-").join(""));
}
function GetCurrentDateString(){
    
    var today = new Date();    

    var y = today.getFullYear();
    var m = (today.getMonth() + 1);
    var d = today.getDate();

    var date = y + '-' + ((m < 10) ? "0":"") + m + '-' + ((d < 10) ? "0":"") + d;

    return date.toString();
}
function GetCurrentTimeString(){
    
    var today = new Date();    

    var h = today.getHours();
    var m = today.getMinutes();

    var date = ((h < 10) ? "0":"") + h + ":" + ((m < 10) ? "0":"") + m;

    return date.toString();
}