
export const handleStatusChange = async (reportId, newStatus, setReports) => {
    try {
        console.log('reportId:', reportId);
        const response = await fetch(`https://aniresfr-backend.vercel.app/api/animals/${reportId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
            setReports((prevReports) =>
                prevReports.map((report) =>
                    report.id === reportId ? { ...report, status: newStatus } : report
                )
            );
        } else {
            console.error('Error updating status:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
};
