import moment from 'moment';

export const formatDateTime = (dateTimeString: string | null | undefined): string => {
    return dateTimeString ? moment(dateTimeString).format('YYYY-MM-DD HH:mm:ss') : '';
};
