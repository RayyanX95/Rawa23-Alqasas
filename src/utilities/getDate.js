const getDateAndTime = () => {
    let current_dateTime = new Date();

    let formatted_date = current_dateTime.getFullYear() + "-" +
        (current_dateTime.getMonth() + 1) + "-" + current_dateTime.getDate() +
        " " + current_dateTime.getHours() + ":" + current_dateTime.getMinutes() +
        ":" + current_dateTime.getSeconds();
    return formatted_date;
}

export default getDateAndTime;