import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './components/ui/select';
import { Label } from './components/ui/label';

const CircleProgress = ({ percentage }: { percentage: number }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="w-36 h-36 transform -rotate-90">
      <circle
        className="text-gray-300"
        strokeWidth="8"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="72"
        cy="72"
      />
      <circle
        className="text-pink-500"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="72"
        cy="72"
      />
    </svg>
  );
};

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(371900);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTerm, setLoanTerm] = useState(25);
  const [downPayment, setDownPayment] = useState(71900);
  const [pmi, setPMI] = useState(471900);
  const [propertyTax, setPropertyTax] = useState(1100);
  const [homeownersInsurance, setHomeownersInsurance] = useState(371900);
  const [lifetimeRepayment, setLifetimeRepayment] = useState(507250);
  const [monthlyPayment, setMonthlyPayment] = useState(1690);
  const [totalInterest, setTotalInterest] = useState(13900);
  const [mortgagePercentage, setMortgagePercentage] = useState(74);

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm, downPayment, pmi, propertyTax, homeownersInsurance]);

  const calculateMortgage = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPaymentCalc = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthlyPaymentCalc * numberOfPayments;
    const totalInterestCalc = totalPayment - principal;

    setMonthlyPayment(monthlyPaymentCalc);
    setTotalInterest(totalInterestCalc);
    setLifetimeRepayment(totalPayment + downPayment);

    const mortgagePercent = (principal / (principal + totalInterestCalc)) * 100;
    setMortgagePercentage(Math.round(mortgagePercent));
  };

  return (
    <Card className="w-full max-w-3xl bg-gray-900 text-white p-6 rounded-3xl">
      <CardContent className="space-y-6">
        <h2 className="text-2xl font-bold text-pink-300">MORTGAGE CALCULATOR</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loanAmount" className="text-gray-400">Loan amount</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="bg-gray-800 border-pink-300 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interestRate" className="text-gray-400">Interest rate</Label>
            <div className="flex">
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="bg-gray-800 border-pink-300 text-white flex-grow"
              />
              <div className="bg-pink-300 text-gray-900 px-3 flex items-center rounded-r">%</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="loanTerm" className="text-gray-400">Loan term</Label>
            <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
              <SelectTrigger className="bg-gray-800 border-pink-300 text-white">
                <SelectValue>Select loan term</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 years</SelectItem>
                <SelectItem value="20">20 years</SelectItem>
                <SelectItem value="25">25 years</SelectItem>
                <SelectItem value="30">30 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="downPayment" className="text-gray-400">Down payment amount</Label>
            <div className="flex">
              <Input
                id="downPayment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="bg-gray-800 border-pink-300 text-white flex-grow"
              />
              <div className="bg-pink-300 text-gray-900 px-3 flex items-center rounded-r">
                {((downPayment / loanAmount) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pmi" className="text-gray-400">Private mortgage insurance</Label>
          <Input
            id="pmi"
            type="number"
            value={pmi}
            onChange={(e) => setPMI(Number(e.target.value))}
            className="bg-gray-800 border-pink-300 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-400">Optional inputs: Property taxes, Homeowner's insurance</Label>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(Number(e.target.value))}
              placeholder="Property taxes"
              className="bg-gray-800 border-pink-300 text-white flex-grow"
            />
            <Input
              type="number"
              value={homeownersInsurance}
              onChange={(e) => setHomeownersInsurance(Number(e.target.value))}
              placeholder="Homeowner's insurance"
              className="bg-gray-800 border-pink-300 text-white flex-grow"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <div className="relative w-36 h-36">
            <CircleProgress percentage={mortgagePercentage} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-xs">Mortgage</div>
              <div className="text-xs">Amount</div>
              <div className="font-bold text-lg">{mortgagePercentage}%</div>
            </div>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <h3 className="text-4xl font-bold text-pink-300">${lifetimeRepayment.toFixed(0)}</h3>
            <p className="text-sm text-gray-400">Lifetime Repayment</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mt-6">
          <div>
            <p className="text-xs text-gray-400">Mortgage Amount</p>
            <p className="font-bold">${(loanAmount - downPayment).toFixed(0)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Interest</p>
            <p className="font-bold">${totalInterest.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Monthly Payment</p>
            <p className="font-bold">${monthlyPayment.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Property Tax</p>
            <p className="font-bold">${propertyTax}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Insurance</p>
            <p className="font-bold">${homeownersInsurance}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;