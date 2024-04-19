export const validateWebsiteLink = (value) => {
    const regex =
        /^(?:(?:https?):\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?(?:\/\S*)?$/;
    return regex.test(value);
};
