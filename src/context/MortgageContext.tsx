import { createContext, useState, useEffect, ReactNode } from 'react';

interface MortgageContextType {
  homePrice: number;
  setHomePrice: (value: number) => void;
  downPayment: number;
  setDownPayment: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  loanTerm: number;
  setLoanTerm: (value: number) => void;
  propertyTax: number;
  setPropertyTax: (value: number) => void;
  homeInsurance: number;
  setHomeInsurance: (value: number) => void;
  pmi: number;
  setPmi: (value: number) => void;
  extraPayment: number;
  setExtraPayment: (value: number) => void;
  annualIncome: number;
  setAnnualIncome: (value: number) => void;
  monthlyDebts: number;
  setMonthlyDebts: (value: number) => void;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalInterest: number;
  affordabilityRatio: number;
  debtToIncomeRatio: number;
  amortizationSchedule: Array<{
    year: number;
    principalPaid: number;
    interestPaid: number;
    totalPayment: number;
    remainingBalance: number;
    totalWithExtra: number;
    remainingBalanceWithExtra: number;
  }>;
}

export const MortgageContext = createContext<MortgageContextType>({} as MortgageContextType);

export function MortgageProvider({ children }: { children: ReactNode }) {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(3600);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [pmi, setPmi] = useState(0);
  const [extraPayment, setExtraPayment] = useState(0);
  const [annualIncome, setAnnualIncome] = useState(100000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [monthlyPrincipal, setMonthlyPrincipal] = useState(0);
  const [monthlyInterest, setMonthlyInterest] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [affordabilityRatio, setAffordabilityRatio] = useState(0);
  const [debtToIncomeRatio, setDebtToIncomeRatio] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<
    MortgageContextType['amortizationSchedule']
  >([]);

  useEffect(() => {
    const calculateMortgage = () => {
      const loanAmount = homePrice - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;

      const monthlyP =
        (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const monthlyI = loanAmount * monthlyRate;
      const monthlyPr = monthlyP - monthlyI;

      const schedule: MortgageContextType['amortizationSchedule'] = [];
      let balance = loanAmount;
      let balanceWithExtra = loanAmount;
      let totalInterestPaid = 0;
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      let yearlyExtra = 0;

      for (let month = 1; month <= numberOfPayments; month++) {
        const interest = balance * monthlyRate;
        const principal = monthlyP - interest;
        balance -= principal;

        // Calculate with extra payment
        const interestWithExtra = balanceWithExtra * monthlyRate;
        const principalWithExtra = monthlyP - interestWithExtra + extraPayment;
        balanceWithExtra = Math.max(0, balanceWithExtra - principalWithExtra);

        yearlyPrincipal += principal;
        yearlyInterest += interest;
        yearlyExtra += extraPayment;
        totalInterestPaid += interest;

        if (month % 12 === 0 || month === numberOfPayments || balanceWithExtra === 0) {
          schedule.push({
            year: Math.ceil(month / 12),
            principalPaid: yearlyPrincipal,
            interestPaid: yearlyInterest,
            totalPayment: yearlyPrincipal + yearlyInterest,
            remainingBalance: Math.max(0, balance),
            totalWithExtra: yearlyPrincipal + yearlyInterest + yearlyExtra,
            remainingBalanceWithExtra: balanceWithExtra,
          });
          yearlyPrincipal = 0;
          yearlyInterest = 0;
          yearlyExtra = 0;
        }

        if (balanceWithExtra === 0 && schedule.length > 0) break;
      }

      const totalMonthlyPayment = monthlyP + propertyTax / 12 + homeInsurance / 12 + pmi + extraPayment;
      const monthlyIncome = annualIncome / 12;
      const housingRatio = (totalMonthlyPayment / monthlyIncome) * 100;
      const dtiRatio = ((totalMonthlyPayment + monthlyDebts) / monthlyIncome) * 100;

      setMonthlyPayment(totalMonthlyPayment);
      setMonthlyPrincipal(monthlyPr);
      setMonthlyInterest(monthlyI);
      setTotalInterest(totalInterestPaid);
      setAffordabilityRatio(housingRatio);
      setDebtToIncomeRatio(dtiRatio);
      setAmortizationSchedule(schedule);
    };

    calculateMortgage();
  }, [
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax,
    homeInsurance,
    pmi,
    extraPayment,
    annualIncome,
    monthlyDebts,
  ]);

  return (
    <MortgageContext.Provider
      value={{
        homePrice,
        setHomePrice,
        downPayment,
        setDownPayment,
        interestRate,
        setInterestRate,
        loanTerm,
        setLoanTerm,
        propertyTax,
        setPropertyTax,
        homeInsurance,
        setHomeInsurance,
        pmi,
        setPmi,
        extraPayment,
        setExtraPayment,
        annualIncome,
        setAnnualIncome,
        monthlyDebts,
        setMonthlyDebts,
        monthlyPayment,
        monthlyPrincipal,
        monthlyInterest,
        totalInterest,
        affordabilityRatio,
        debtToIncomeRatio,
        amortizationSchedule,
      }}
    >
      {children}
    </MortgageContext.Provider>
  );
}