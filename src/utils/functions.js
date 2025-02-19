export function getFileExtension(filename) {
    if (!filename) return ""; // Handle empty input
    const parts = filename.split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : "";
}