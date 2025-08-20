/**
 * Parses Firestore date strings in the format "Aug 17, 2003"
 * @param dateString - The date string from Firestore
 * @returns A Date object or null if parsing fails
 */
export const parseFirestoreDate = (dateString: string): Date | null => {
  try {
    // Handle the simple Firestore date format "Aug 17, 2003"
    const parsedDate = new Date(dateString);

    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate;
  } catch (error) {
    console.error("Error parsing Firestore date:", error);
    return null;
  }
};

/**
 * Formats a date to a readable string
 * @param date - Date object or date string
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string | null): string => {
  if (!date) return "N/A";

  try {
    const dateObj = typeof date === "string" ? parseFirestoreDate(date) : date;

    if (!dateObj || isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

/**
 * Formats a date with time
 * @param date - Date object or date string
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date | string | null): string => {
  if (!date) return "N/A";

  try {
    const dateObj = typeof date === "string" ? parseFirestoreDate(date) : date;

    if (!dateObj || isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting date time:", error);
    return "Invalid Date";
  }
};

/**
 * Formats a relative time (e.g., "2 days ago")
 * @param date - Date object or date string
 * @returns Relative time string
 */
export const formatRelativeTime = (date: Date | string | null): string => {
  if (!date) return "N/A";

  try {
    const dateObj = typeof date === "string" ? parseFirestoreDate(date) : date;

    if (!dateObj || isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }

    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;

    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return "Invalid Date";
  }
};
