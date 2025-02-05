import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

const _dayjs = dayjs;

_dayjs.extend(utc);
_dayjs.extend(timezone);

export default _dayjs;
