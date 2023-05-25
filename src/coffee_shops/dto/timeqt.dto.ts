import { IsDate } from 'class-validator';

/**
 * @deprecated
 */
export class TimeQT {
  @IsDate()
  startAt?: Date;
  endAt?: Date;
}
