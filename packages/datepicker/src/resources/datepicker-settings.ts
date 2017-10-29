export interface DatepickerSettings {
  calendarSettings?: {
      disableWeekdays?: Array<string | number>;
      disableDays?: Array<{ month: number, day: number, year?: number }>;
  };
}
