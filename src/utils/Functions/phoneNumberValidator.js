const isValidPhoneNumber = (phoneNumber) => {
    // Basic phone number validation (customize as needed)
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
};

export default isValidPhoneNumber;
