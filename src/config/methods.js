
export function FormatDate(timestamp) {
    let date = new Date(timestamp*1000);
    let month = date.getMonth();
    let formatMonth = month + 1;
    return `${formatMonth}/${date.getDate()}/${date.getFullYear()}`;
}