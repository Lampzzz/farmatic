export const parseFirestoreDate = (dateString: string): Date | null => {
  try {
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate;
  } catch (error) {
    console.error("Error parsing Firestore date:", error);
    return null;
  }
};

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
