export const getDefaultStartDate = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    return currentDate.toISOString().slice(0, 10);
};

export const getDefaultEndDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
};