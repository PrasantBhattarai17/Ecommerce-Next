// Utility for currency conversion and formatting
// Fixed conversion rate from USD to NPR (Rs.)
const CONVERSION_RATE = 130;

export const formatPrice = (priceInUsd) => {
    const priceInNpr = priceInUsd * CONVERSION_RATE;
    return `Rs. ${priceInNpr.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const convertToNpr = (priceInUsd) => {
    return priceInUsd * CONVERSION_RATE;
};

export const getCurrencySymbol = () => {
    return 'Rs.';
};
