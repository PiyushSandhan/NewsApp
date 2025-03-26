// utils/validateFields.js
export const validateFields = (fields) => {
    return Object.values(fields).every((value) => value?.trim());
};
