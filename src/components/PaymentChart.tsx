import { useContext } from 'react';
import { MortgageContext } from '@/context/MortgageContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export function PaymentChart() {
  const {
    monthlyPayment,
    monthlyPrincipal,
    monthlyInterest,
    propertyTax,
    homeInsurance,
    pmi,
    amortizationSchedule,
    extraPayment,
  } = useContext(MortgageContext);

  const monthlyBreakdown = [
    {
      name: 'Monthly Breakdown',
      Principal: monthlyPrincipal,
      Interest: monthlyInterest,
      'Property Tax': propertyTax / 12,
      'Home Insurance': homeInsurance / 12,
      PMI: pmi,
      'Extra Payment': extraPayment,
    },
  ];

  const balanceComparison = amortizationSchedule.map((year) => ({
    year: year.year,
    'Standard Balance': year.remainingBalance,
    'With Extra Payment': year.remainingBalanceWithExtra,
  }));

  const commonProps = {
    width: '100%',
    height: '100%',
    margin: { top: 10, right: 30, left: 0, bottom: 0 },
  };

  const axisProps = {
    stroke: 'hsl(var(--foreground))',
    style: {
      fontSize: '12px',
      fontFamily: 'inherit',
    },
    tick: {
      fill: 'hsl(var(--foreground))',
      fontSize: 12,
    },
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium">Monthly Payment Breakdown</h3>
          <p className="text-sm text-gray-500">
            Total Monthly Payment: {formatCurrency(monthlyPayment)}
          </p>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer {...commonProps}>
            <BarChart
              data={monthlyBreakdown}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 120, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                {...axisProps}
                type="number"
                tickFormatter={formatCurrency}
                orientation="bottom"
                axisLine={true}
                tickLine={true}
              />
              <YAxis
                {...axisProps}
                type="category"
                dataKey="name"
                orientation="left"
                axisLine={true}
                tickLine={true}
              />
              <Tooltip
                formatter={(value) => formatCurrency(value as number)}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
              />
              <Bar dataKey="Principal" fill="hsl(var(--chart-1))" stackId="a" />
              <Bar dataKey="Interest" fill="hsl(var(--chart-2))" stackId="a" />
              <Bar dataKey="Property Tax" fill="hsl(var(--chart-3))" stackId="a" />
              <Bar dataKey="Home Insurance" fill="hsl(var(--chart-4))" stackId="a" />
              <Bar dataKey="PMI" fill="hsl(var(--chart-5))" stackId="a" />
              <Bar dataKey="Extra Payment" fill="hsl(var(--primary))" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium">Loan Balance Over Time</h3>
          <p className="text-sm text-gray-500">
            Compare standard payments vs. extra payments
          </p>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer {...commonProps}>
            <LineChart data={balanceComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                {...axisProps}
                dataKey="year"
                orientation="bottom"
                axisLine={true}
                tickLine={true}
                padding={{ left: 0, right: 0 }}
              />
              <YAxis
                {...axisProps}
                tickFormatter={formatCurrency}
                orientation="left"
                axisLine={true}
                tickLine={true}
              />
              <Tooltip
                formatter={(value) => formatCurrency(value as number)}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="Standard Balance"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="With Extra Payment"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}