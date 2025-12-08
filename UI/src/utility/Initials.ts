// src/utils/formatName.js or src/utils/formatName.ts (if using TypeScript)

/**
 * Generates initials from a full name.
 * @param {string} name - The full name (e.g., "Atasi Kulkarni").
 * @returns {string} The initials (e.g., "AK").
 */
export const getInitials = (name: string) => {
    if (!name) return '';
  
    const nameParts = name.trim().split(' ');
    
    if (nameParts.length === 1) {
      // If only one name is provided (e.g., "Atasi"), return the first letter
      return nameParts[0][0].toUpperCase();
    }
    
    // Get the first letter of the first name and the last name
    const firstNameInitial = nameParts[0][0];
    const lastNameInitial = nameParts[nameParts.length - 1][0];
  
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  };
  