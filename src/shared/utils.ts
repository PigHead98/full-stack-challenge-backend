import * as _ from 'lodash';
import * as moment from 'moment';

export function ClearNilProperties<T extends Object>(
  object: T | Partial<T>,
): Partial<T> {
  return _.pickBy(object, (prop) => !_.isNil(prop));
}

export const FormatDate = (date: string, dateFormat = 'YYYY-MM-dd'): string => {
  return moment(date).utc().format(dateFormat);
};
