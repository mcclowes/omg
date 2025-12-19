# TaxRate

```omg.type
type TaxRate = {
  Name?: string  // Name of tax rate
  TaxType?: string  // The tax type
  TaxComponents?: TaxComponent[]  // See TaxComponents
  Status?: "ACTIVE" | "DELETED" | "ARCHIVED" | "PENDING"  // See Status Codes
  ReportTaxType?: "AVALARA" | "BASEXCLUDED" | "CAPITALSALESOUTPUT" | "CAPITALEXPENSESINPUT" | "ECOUTPUT" | "ECOUTPUTSERVICES" | "ECINPUT" | "ECACQUISITIONS" | "EXEMPTEXPENSES" | "EXEMPTINPUT" | "EXEMPTOUTPUT" | "GSTONIMPORTS" | "INPUT" | "INPUTTAXED" | "MOSSSALES" | "NONE" | "NONEOUTPUT" | "OUTPUT" | "PURCHASESINPUT" | "SALESOUTPUT" | "EXEMPTCAPITAL" | "EXEMPTEXPORT" | "CAPITALEXINPUT" | "GSTONCAPIMPORTS" | "GSTONCAPITALIMPORTS" | "REVERSECHARGES" | "PAYMENTS" | "INVOICE" | "CASH" | "ACCRUAL" | "FLATRATECASH" | "FLATRATEACCRUAL" | "ACCRUALS" | "TXCA" | "SRCAS" | "DSOUTPUT" | "BLINPUT2" | "EPINPUT" | "IMINPUT2" | "MEINPUT" | "IGDSINPUT2" | "ESN33OUTPUT" | "OPINPUT" | "OSOUTPUT" | "TXN33INPUT" | "TXESSINPUT" | "TXREINPUT" | "TXPETINPUT" | "NRINPUT" | "ES33OUTPUT" | "ZERORATEDINPUT" | "ZERORATEDOUTPUT" | "DRCHARGESUPPLY" | "DRCHARGE" | "CAPINPUT" | "CAPIMPORTS" | "IMINPUT" | "INPUT2" | "CIUINPUT" | "SRINPUT" | "OUTPUT2" | "SROUTPUT" | "CAPOUTPUT" | "SROUTPUT2" | "CIUOUTPUT" | "ZROUTPUT" | "ZREXPORT" | "ACC28PLUS" | "ACCUPTO28" | "OTHEROUTPUT" | "SHOUTPUT" | "ZRINPUT" | "BADDEBT" | "OTHERINPUT" | "BADDEBTRELIEF" | "IGDSINPUT3" | "SROVR" | "TOURISTREFUND" | "TXRCN33" | "TXRCRE" | "TXRCESS" | "TXRCTS" | "CAPEXINPUT" | "UNDEFINED" | "CAPEXOUTPUT" | "ZEROEXPOUTPUT" | "GOODSIMPORT" | "NONEINPUT" | "NOTREPORTED" | "SROVRRS" | "SROVRLVG" | "SRLVG" | "IM" | "IMESS" | "IMN33" | "IMRE" | "BADDEBTRECOVERY" | "USSALESTAX" | "BLINPUT3"  // See ReportTaxTypes
  CanApplyToAssets?: boolean  // Boolean to describe if tax rate can be used for asset accounts i.e.  true,false
  CanApplyToEquity?: boolean  // Boolean to describe if tax rate can be used for equity accounts i.e true,false
  CanApplyToExpenses?: boolean  // Boolean to describe if tax rate can be used for expense accounts  i.e. true,false
  CanApplyToLiabilities?: boolean  // Boolean to describe if tax rate can be used for liability accounts  i.e. true,false
  CanApplyToRevenue?: boolean  // Boolean to describe if tax rate can be used for revenue accounts i.e. true,false
  DisplayTaxRate?: number @format("double")  // Tax Rate (decimal to 4dp) e.g 12.5000
  EffectiveRate?: number @format("double")  // Effective Tax Rate (decimal to 4dp) e.g 12.5000
}
```
