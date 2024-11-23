import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator } from '@/components/Calculator';
import { AmortizationTable } from '@/components/AmortizationTable';
import { PaymentChart } from '@/components/PaymentChart';
import { MortgageProvider } from '@/context/MortgageContext';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <MortgageProvider>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Advanced Mortgage Calculator
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Calculate your mortgage payments, view amortization schedule, and analyze costs
            </p>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Mortgage Analysis</CardTitle>
              <CardDescription>
                Explore different aspects of your mortgage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="calculator">Calculator</TabsTrigger>
                  <TabsTrigger value="chart">Payment Chart</TabsTrigger>
                  <TabsTrigger value="schedule">Amortization</TabsTrigger>
                </TabsList>
                <TabsContent value="calculator">
                  <Calculator />
                </TabsContent>
                <TabsContent value="chart">
                  <PaymentChart />
                </TabsContent>
                <TabsContent value="schedule">
                  <AmortizationTable />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </MortgageProvider>
  );
}

export default App;