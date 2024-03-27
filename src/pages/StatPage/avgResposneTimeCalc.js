// Function to calculate average response time
function calculateAverageResponseTime(reports) {
    let totalResponseTimeMinutes = 0;
    let validReportsCount = 0;

    reports.forEach(report => {
        if (report.response_time) {
            const reportReportedTime = new Date(report.reported_time);
            const reportResponseTime = new Date(report.response_time);
            const timeDifferenceMs = reportResponseTime - reportReportedTime;
            const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60); // Convert milliseconds to minutes
            totalResponseTimeMinutes += timeDifferenceMinutes;
            validReportsCount++;
        }
    });

    if (validReportsCount > 0) {
        const averageResponseTimeMinutes = totalResponseTimeMinutes / validReportsCount;
        const averageDays = Math.floor(averageResponseTimeMinutes / (24 * 60));
        const averageHours = Math.floor((averageResponseTimeMinutes % (24 * 60)) / 60);
        const averageMinutes = Math.floor(averageResponseTimeMinutes % 60);
        return `${averageDays} days, ${averageHours} hours, ${averageMinutes} minutes`;
    } else {
        return "Loading...";
    }
}

export default calculateAverageResponseTime;
