export const addressRegex = /^[a-zA-Z0-9\s,.-]+$/; // Only alphanumeric, spaces, commas, periods, hyphens
export const cityRegex = /^[a-zA-Z\s.-]+$/; // Only letters, spaces, periods, hyphens
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // follows email format including @ symbol
export const instructionsRegex = /^[a-zA-Z0-9\s.,!?()-]+$/; // alphanumeric, spaces, commas, periods, hyphens, question/excl. marks, and parens
export const locationNameRegex = /^[a-zA-Z0-9\s.-]+$/; // Only alphanumeric, spaces, commas, periods, hyphens
export const nameRegex = /^[a-zA-Z\s]*$/; // Text only regex for names
export const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // Phone regex for format (XXX) XXX-XXXX
export const zipRegex = /^\d{5}$/; // Only 5 digits
