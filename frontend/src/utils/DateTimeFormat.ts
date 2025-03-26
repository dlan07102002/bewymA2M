const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
        return "";
    }
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        // timeZoneName: "short",
    }).format(date);
};

export default formatDate;
