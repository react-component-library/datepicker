import moment from 'moment';

const MIN_DATE_LIMIT = 200;
const MAX_DATE_LIMIT = 200;

const DAY_PICKER_ROWS = 6;

export const getDaysOnCalendar = (year: number, month: number, options: { fixedRows: boolean }) => {
    const { fixedRows } = options;

    const firstDay = moment().year(year).month(month).date(1).day();
    const daysInMonth = moment().year(year).month(month).daysInMonth();

    let index = 1;
    const rows = fixedRows ? DAY_PICKER_ROWS : Math.ceil((firstDay + daysInMonth) / 7);
    const cols = 7;
    const datesOnCalendar = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const date = index - firstDay;

            const mDate = moment().year(year).month(month).date(date);

            datesOnCalendar.push(mDate.toDate());

            index++;
        }
    }

    return datesOnCalendar;
};

export const getMonthsOnCalendar = (year: number) => {
    const monthsOfYear = [];

    for (let month = 1; month <= 12; month++) {
        const mDate = moment()
            .year(year)
            .month(month - 1)
            .date(1);

        monthsOfYear.push(mDate.toDate());
    }

    return monthsOfYear;
};

export const getYearsOnCalendar = (selectedYear: number, count: number) => {
    const firstYear = Math.floor(selectedYear / count) * count;

    const years = [];

    for (let i = 1; i <= count; i++) {
        const mDate = moment()
            .year(firstYear + i)
            .month(1)
            .date(1);

        years.push(mDate.toDate());
    }

    return years;
};

export const getInitialViewDate = (date: Date, maxDate: Date) => {
    const mDate = moment(date);
    const mMaxDate = moment(maxDate);

    if (mDate && mDate.isValid()) return date;

    if (mMaxDate && mMaxDate.isValid()) return moment.min(moment(), mMaxDate).toDate();

    return new Date();
};

export const getDefaultMinDate = () => {
    const currentDate = new Date();

    const minDate = new Date(currentDate.getFullYear() - MIN_DATE_LIMIT, currentDate.getMonth(), currentDate.getDate());

    return minDate;
};

export const getDefaultMaxDate = () => {
    const currentDate = new Date();

    const maxDate = new Date(currentDate.getFullYear() + MAX_DATE_LIMIT, currentDate.getMonth(), currentDate.getDate());

    return maxDate;
};

export const isLessThanDate = (date1: Date, date2: Date) => {
    const mDate1 = moment(date1);
    const mDate2 = moment(date2);

    return +mDate1.format('YYYYMMDD') < +mDate2.format('YYYYMMDD');
};

export const isGreaterThanDate = (date1: Date, date2: Date) => {
    const mDate1 = moment(date1);
    const mDate2 = moment(date2);

    return +mDate1.format('YYYYMMDD') > +mDate2.format('YYYYMMDD');
};

export const isSameDate = (date1: Date, date2: Date) => {
    const mDate1 = moment(date1);
    const mDate2 = moment(date2);

    return mDate1.format('YYYYMMDD') === mDate2.format('YYYYMMDD');
};

export const formatDate = (date: Date, format: string) => {
    const mDate = moment(date);

    return mDate.format(format);
};
