import axios from 'axios';

export const handleStatusChange = async (reportId, newStatus, setReports) => {
    try {
        const currentTime = new Date().toISOString().replace(/Z$/, '');
        const formattedTime = currentTime + 'Z';

        const response = await axios.patch(`https://paws-backend.azurewebsites.net/api/animals/${reportId}/`, {
            status: newStatus,
            response_time: formattedTime
        });

        if (response.status === 200) {
            setReports((prevReports) =>
                prevReports.map((report) =>
                    report.id === reportId ? { ...report, status: newStatus, response_time: formattedTime } : report
                )
            );
        } else {
            console.error('Error updating status:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating status:', error.message);
    }
};
