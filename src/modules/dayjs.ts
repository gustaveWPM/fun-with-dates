import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

const _dayjs = dayjs;

_dayjs.extend(utc);

export default _dayjs;
