/**
 * Logic: A booking conflicts if:
 * (checkin < existing_checkout) AND (checkout > existing_checkin)
 */
const checkDateOverlap = (newCheckIn, newCheckOut, existingCheckIn, existingCheckOut) => {
    const start = new Date(newCheckIn);
    const end = new Date(newCheckOut);
    const eStart = new Date(existingCheckIn);
    const eEnd = new Date(existingCheckOut);

    return (start < eEnd) && (end > eStart);
};

module.exports = checkDateOverlap;
