import React, {useState} from 'react';
import axios from 'axios'
import LoanDetails from '../LoanDetails/LoanDetails';
import './Loan.css';

const Loan = () => {
    const [loan, setLoan] = useState(null)
    const [form, setForm] = useState({
        client_id: 1,
        client_business_name: '',
        client_tax_id: '',
        client_request_amoun: 0
    })

    const setValues = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const applyLoan = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/requestLoan', form)

        setLoan(response.data);
    }

    const renderDetails = () => {
        if(loan) {
            if(loan.status === 404) {
                return (
                    <div className="alert alert-dismissible alert-warning mt-5">
                        <h4 className="alert-heading">Error!</h4>
                        <p className="mb-0">{loan.message}</p>
                    </div>
                )
            }
            return (
                <LoanDetails loan={loan.loan}/>
            )
        }

    }

    return (
        <main className="container loan">
            <div className="row">
                <div className="col-12 mt-5 mb-5">
                    <h2>Apply to a loan</h2>
                </div>
            </div>
            <form className="row" onSubmit={applyLoan}>
                <div className="col-12 col-md-4 p-3">
                    <label id="client_business_name" className="mb-2">Bussines name</label>
                    <input 
                        id="client_business_name"
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Adidas"
                        name="client_business_name"
                        onChange={setValues}
                    />
                </div>
                <div className="col-12 col-md-4 p-3">
                    <label id="client_tax_id" className="mb-2">Tax Id</label>
                    <input 
                        id="client_tax_id"
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. 555-555-555"
                        name="client_tax_id"
                        onChange={setValues}
                    />
                </div>
                <div className="col-12 col-md-4 p-3">
                    <label id="client_request_amoun" className="mb-2">Amount</label>
                    <input 
                        id="client_request_amoun"
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. 100000"
                        name="client_request_amoun"
                        onChange={setValues}
                    />
                </div>
                <button type="submit" className="btn btn-primary d-block m-auto w-25 mt-4">Apply</button>
            </form>
            {renderDetails()}
        </main>
    )
}

export default Loan;