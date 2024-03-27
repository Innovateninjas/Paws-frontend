function findMostReportedAnimal(reports) {
    if (!reports || reports.length === 0) {
        return null; 
    }
    const animalCount = {};

    reports.forEach(report => {
        const animalType = report.animal_type.toLowerCase(); // Convert animal type to lowercase for case-insensitive comparison
        if (animalCount[animalType]) {
            animalCount[animalType]++;
        } else {
            animalCount[animalType] = 1;
        }
    });

    // Find the animal type with the highest count
    let mostReportedAnimal = null;
    let maxCount = 0;
    for (const animalType in animalCount) {
        if (animalCount[animalType] > maxCount) {
            mostReportedAnimal = animalType;
            maxCount = animalCount[animalType];
        }
    }

    return mostReportedAnimal;
}

export default findMostReportedAnimal;
