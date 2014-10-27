var DateUtils = DateUtils || {};
(function (dateUtils) {
    dateUtils.dayOfWeek = function(date) {
        var d = new Date(date);
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        return weekday[d.getDay()];
    }

    dateUtils.treatAsUTC = function (date) {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    };

    var dateRange = function (startDate, endDate) {
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
    };

    dateRange.prototype.getNumberOfDays = function () {
        var millisecondsPerDay = 86400000;
        return (Math.abs(dateUtils.treatAsUTC(this.endDate) - dateUtils.treatAsUTC(this.startDate))) / millisecondsPerDay;
    };

    dateRange.prototype.getDates = function() {
        var dateArray = new Array();
        var numDays = this.getNumberOfDays();
        for (var dayNum = 0; dayNum < numDays; dayNum++)
            dateArray.push(new Date().setDate(this.startDate.getDate() + dayNum));
        return dateArray;
    };

    dateRange.prototype.getDaysOfWeek = function () {
        var dates = this.getDates();
        return dates.map(function (currentDate) {
            var d = new Date(currentDate);
            return dateUtils.dayOfWeek(d);
        });
    };

    dateUtils.DateRange = dateRange;
})(DateUtils);

/*
Example:
var dateRange = new DateUtils.DateRange(new Date(14,10,1), new Date(14,10,8));
console.log(dateRange.getDates());
dateRange.getDates().map(function(d) {
    console.log(new Date(d));
});
dateRange.getDaysOfWeek().map(function(d) {
    console.log(d);
});
*/