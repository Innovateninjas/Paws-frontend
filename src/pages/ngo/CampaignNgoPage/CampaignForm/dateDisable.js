const disableDate = () => {
    const today = new Date();
    let dd = today.getDate() + 1; 
    let mm = today.getMonth() + 1; 
    let yyyy = today.getFullYear();
    // Handle February (month 2)
    if (mm === 2) {
        if ((yyyy % 4 === 0 && yyyy % 100 !== 0) || yyyy % 400 === 0) {
            if (dd > 29) {
                dd = 1; 
                mm++; 
            }
        } else {
            if (dd > 28) {
                dd = 1; 
                mm++; 
            }
        }
    }
    // Handle months with 30 days
    else if ([4, 6, 9, 11].includes(mm)) {
        if (dd > 30) {
            dd = 1; 
            mm++; 
        }
    }
    // Handle months with 31 days
    else {
        if (dd > 31) {
            dd = 1;
            mm++;
        }
    }
    // Handle transition to new year
    if (mm === 13) {
        mm = 1; 
        yyyy++; 
    }
    return `${yyyy}-${mm.toString().padStart(2, '0')}-${dd.toString().padStart(2, '0')}`;
};
export default disableDate;