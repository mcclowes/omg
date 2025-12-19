# Schedule

```omg.type
type Schedule = {
  Period?: integer  // Integer used with the unit e.g. 1 (every 1 week), 2 (every 2 months)
  Unit?: "WEEKLY" | "MONTHLY"  // One of the following - WEEKLY or MONTHLY
  DueDate?: integer  // Integer used with due date type e.g 20 (of following month), 31 (of current month)
  DueDateType?: "DAYSAFTERBILLDATE" | "DAYSAFTERBILLMONTH" | "DAYSAFTERINVOICEDATE" | "DAYSAFTERINVOICEMONTH" | "OFCURRENTMONTH" | "OFFOLLOWINGMONTH"  // the payment terms
  StartDate?: string  // Date the first invoice of the current version of the repeating schedule was generated (changes when repeating invoice is edited)
  NextScheduledDate?: string  // The calendar date of the next invoice in the schedule to be generated
  EndDate?: string  // Invoice end date – only returned if the template has an end date set
}
```
