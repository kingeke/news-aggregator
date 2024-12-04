import moment from "moment";

export const inputDelay = 0;

export const drawerWidth = 260;

export const fieldHasError = (errors, field) => {
    return errors[field] ? true : false;
};

export const formatDate = ({ date, withTime = true, fromNow = false, format = "Do MMM, YYYY", isUnix = false, castAsEndOfDay = false }) => {

    if (castAsEndOfDay) {

        date = moment(date).endOf('day');
    }

    return date
        ? fromNow
            ? moment(date).fromNow()
            : (
                isUnix ?
                    moment.unix(date).format(
                        `${withTime ? "Do MMM, YYYY - LT" : format}`
                    )
                    : moment(date).format(
                        `${withTime ? "Do MMM, YYYY - LT" : format}`
                    )
            )
        : null;
};

export const formatNumber = ({
    number,
    withNaira = false,
    returnZero = false,
    isEstimated = false
}) => {
    if (isEstimated) return withNaira ? `\u20A6${estimateNumber(number)}` : estimateNumber(number);
    if (!number || number === null) return returnZero ? (withNaira ? `\u20A6 0` : 0) : null;
    let formattedNumber = parseFloat(number).toLocaleString();
    let result = withNaira ? `\u20A6 ${formattedNumber}` : formattedNumber;
    return result;
};

export const asset = (path) => {
    return `/assets/${path}`;
};

export const PoweredBy = () => (
    <small>Powered by Innoscripta &trade;</small>
);

export const textLimit = (str, limit = 50) => {

    if (str?.length > limit) {
        return str.substring(0, limit) + '...';
    }

    return str;
};
