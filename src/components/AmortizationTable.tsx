import { useContext } from 'react';
import { MortgageContext } from '@/context/MortgageContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

export function AmortizationTable() {
  const { amortizationSchedule, extraPayment } = useContext(MortgageContext);

  const standardLoanYears = amortizationSchedule.length;
  const extraPaymentYears = amortizationSchedule.findIndex(
    (year) => year.remainingBalanceWithExtra === 0
  );
  const yearsSaved = standardLoanYears - (extraPaymentYears + 1);

  return (
    <div className="space-y-4">
      {extraPayment > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Loan Payoff Comparison</h3>
              <p className="text-sm text-gray-500">
                Extra payment of {formatCurrency(extraPayment)}/month
              </p>
            </div>
            <Badge variant="secondary" className="text-lg">
              {yearsSaved > 0
                ? `Save ${yearsSaved} year${yearsSaved > 1 ? 's' : ''}`
                : 'No time saved'}
            </Badge>
          </div>
        </Card>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Principal</TableHead>
              <TableHead>Interest</TableHead>
              <TableHead>Total Payment</TableHead>
              <TableHead>Balance</TableHead>
              {extraPayment > 0 && (
                <>
                  <TableHead>With Extra Payment</TableHead>
                  <TableHead>Extra Balance</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {amortizationSchedule.map((year) => (
              <TableRow key={year.year}>
                <TableCell>{year.year}</TableCell>
                <TableCell>{formatCurrency(year.principalPaid)}</TableCell>
                <TableCell>{formatCurrency(year.interestPaid)}</TableCell>
                <TableCell>{formatCurrency(year.totalPayment)}</TableCell>
                <TableCell>{formatCurrency(year.remainingBalance)}</TableCell>
                {extraPayment > 0 && (
                  <>
                    <TableCell>{formatCurrency(year.totalWithExtra)}</TableCell>
                    <TableCell>{formatCurrency(year.remainingBalanceWithExtra)}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}