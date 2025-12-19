# ReportWithRow

```omg.type
type ReportWithRow = {
  ReportID?: string  // ID of the Report
  ReportName?: string  // Name of the report
  ReportTitle?: string  // Title of the report
  ReportType?: string  // The type of report (BalanceSheet,ProfitLoss, etc)
  ReportTitles?: string[]  // Report titles array (3 to 4 strings with the report name, orgnisation name and time frame of report)
  ReportDate?: string  // Date of report
  Rows?: ReportRows[]
  UpdatedDateUTC?: string  // Updated Date
  Fields?: ReportFields[]
}
```
