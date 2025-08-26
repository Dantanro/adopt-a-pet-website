function getCurrentDate()
{
    const currentDate = new Date();

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = daysOfWeek[currentDate.getDay()];
    const month = monthsOfYear[currentDate.getMonth()];
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hours = addLeadZero(currentDate.getHours());
    const minutes = addLeadZero(currentDate.getMinutes());
    const seconds = addLeadZero(currentDate.getSeconds());
    return hours + ":" + minutes + ":" + seconds + ", " + day + ", " + month + " " + date + ", " + year;
}
function addLeadZero(value)
{
    if(value < 10)
    {
        return "0" + value;
    }
    else return value;
}

function updateDateTime()
{
    document.getElementById("date").innerHTML = getCurrentDate();
}
window.onload = updateDateTime;
setInterval(updateDateTime, 1000);