import { Input } from '@/Components/ui/input'
import React, { useState, useEffect } from 'react'
import { Button } from '@/Components/ui/button'

const FinancialCalculator = ({carDetail}) => {
    const [details, setDetails] = useState({
        price: 0,
        interestRate: 0,
        loanTerm: 0,
        downPayment: 0
    });
    const [answer, setAnswer] = useState(null);

    // UseEffect is not necessary for initial calculation, so removed it

    const calculate = () => {
        const principal = details.price - details.downPayment;
        const monthlyInterest = details.interestRate / 1200;
        const monthlyPayment = (principal * monthlyInterest * Math.pow(1 + monthlyInterest, details.loanTerm)) / 
            (Math.pow(1 + monthlyInterest, details.loanTerm) - 1);

        setAnswer(monthlyPayment ? monthlyPayment.toFixed(2) : "Invalid input");
    };

    const handleInput = (e) => {
        setDetails({ ...details, [e.target.name]: parseFloat(e.target.value)});
    };

    return (
        <div className='p-10 border rounded-xl shadow-md mt-7'>
            <h2 className='font-medium w-fit mx-auto border-b-2 p-2 border-primary text-center text-2xl mb-3'>
                Financial Calculator
            </h2>

            <div className='w-full flex gap-5 mt-4'>
                <div className='w-full'>
                    <label>Price $</label>
                    <Input value={details.price} name="price" onChange={handleInput} type="number" />
                </div>
                <div className='w-full'>
                    <label>Interest Rate (%)</label>
                    <Input value={details.interestRate} name="interestRate" onChange={handleInput} type="number" />
                </div>
            </div>

            <div className='w-full flex gap-5 mt-4'>
                <div className='w-full'>
                    <label>Loan Term (Months)</label>
                    <Input value={details.loanTerm} name="loanTerm" onChange={handleInput} type="number" />
                </div>
                <div className='w-full'>
                    <label>Down Payment $</label>
                    <Input value={details.downPayment} name="downPayment" onChange={handleInput} type="number" />
                </div>
            </div>

            <Button onClick={calculate} className="w-full mt-5" size="lg">
                {answer === null ? "Calculate" : `Monthly Payment: $${answer}`}
            </Button>
        </div>
    )
};

export default FinancialCalculator;
