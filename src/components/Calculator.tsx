import { useContext } from 'react';
import { MortgageContext } from '@/context/MortgageContext';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { Home, DollarSign, Percent, AlertCircle } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Calculator() {
  const {
    homePrice,
    setHomePrice,
    downPayment,
    setDownPayment,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    monthlyPayment,
    totalInterest,
    propertyTax,
    setPropertyTax,
    homeInsurance,
    setHomeInsurance,
    pmi,
    setPmi,
    extraPayment,
    setExtraPayment,
    affordabilityRatio,
    debtToIncomeRatio,
    annualIncome,
    setAnnualIncome,
    monthlyDebts,
    setMonthlyDebts,
  } = useContext(MortgageContext);

  const downPaymentPercent = (downPayment / homePrice) * 100;
  const loanAmount = homePrice - downPayment;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Home className="h-5 w-5" /> Property Details
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Home Price</Label>
              <Input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                min={0}
                step={1000}
              />
              <Slider
                value={[homePrice]}
                onValueChange={([value]) => setHomePrice(value)}
                min={50000}
                max={2000000}
                step={1000}
                className="mt-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Down Payment</Label>
                <Badge variant="secondary">
                  {downPaymentPercent.toFixed(1)}%
                </Badge>
              </div>
              <Input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                min={0}
                max={homePrice}
                step={1000}
              />
              <Progress value={downPaymentPercent} className="mt-2" />
              {downPaymentPercent < 20 && (
                <p className="text-sm text-yellow-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  PMI may be required
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <DollarSign className="h-5 w-5" /> Loan Details
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Interest Rate (%)</Label>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={0}
                max={15}
                step={0.1}
              />
              <Slider
                value={[interestRate]}
                onValueChange={([value]) => setInterestRate(value)}
                min={0}
                max={15}
                step={0.1}
              />
            </div>

            <div className="space-y-2">
              <Label>Loan Term</Label>
              <Select value={loanTerm.toString()} onValueChange={(v) => setLoanTerm(Number(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label className="flex items-center gap-1 cursor-help">
                      Extra Monthly Payment
                      <AlertCircle className="h-4 w-4" />
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Additional payment applied to principal</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(Number(e.target.value))}
                min={0}
                step={50}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Percent className="h-5 w-5" /> Affordability Analysis
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Annual Household Income</Label>
              <Input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                min={0}
                step={1000}
              />
            </div>

            <div className="space-y-2">
              <Label>Monthly Debts (excluding mortgage)</Label>
              <Input
                type="number"
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                min={0}
                step={100}
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Housing Ratio</Label>
                  <Badge variant={affordabilityRatio <= 28 ? "success" : "destructive"}>
                    {affordabilityRatio.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={Math.min(affordabilityRatio, 100)} className="mt-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Debt-to-Income Ratio</Label>
                  <Badge variant={debtToIncomeRatio <= 36 ? "success" : "destructive"}>
                    {debtToIncomeRatio.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={Math.min(debtToIncomeRatio, 100)} className="mt-2" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="grid gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(monthlyPayment)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                <p className="text-xl font-semibold">{formatCurrency(loanAmount)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                <p className="text-xl font-semibold">{formatCurrency(totalInterest)}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Property Tax (yearly)</Label>
              <Input
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(Number(e.target.value))}
                min={0}
                step={100}
              />
            </div>

            <div className="space-y-2">
              <Label>Home Insurance (yearly)</Label>
              <Input
                type="number"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(Number(e.target.value))}
                min={0}
                step={100}
              />
            </div>

            <div className="space-y-2">
              <Label>PMI (monthly)</Label>
              <Input
                type="number"
                value={pmi}
                onChange={(e) => setPmi(Number(e.target.value))}
                min={0}
                step={10}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}