import React, {useState, useEffect} from 'react';
import axios from 'axios'
import LoanDetails from '../LoanDetails/LoanDetails';
import './Loan.css';

const Loan = (props) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [loan, setLoan] = useState(null)
    const [disableBtn, setDisableBtn] = useState('')
    const [alertForm, setAlertForm] = useState('d-none');
    const [form, setForm] = useState({
        client_id: user ? user.id : undefined,
        client_business_name: '',
        client_tax_id: '',
        client_request_amoun: ''
    })

    const setValues = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const applyLoan = async (e) => {
        e.preventDefault();
        const {client_request_amoun, client_business_name, client_tax_id} = form;

        if(!isNaN(Number(client_request_amoun)) && client_business_name !== '' && client_tax_id !== '') {
            const response = await axios.post('http://localhost:4000/requestLoan', form)
    
            setLoan(response.data);
            setDisableBtn('disabled')
            setAlertForm('d-none')
        } else {
            setAlertForm('d-block')
        }
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

    const getLoanUser = async (userId) => await axios.get(`http://localhost:4000/loan/${userId}`)

    const logout = () => {
        localStorage.clear();
        return props.history.push('/')
    }

    useEffect(() => {
        if(!user) {
            return props.history.push('/')
        } 
        getLoanUser(user.id).then(res => {
            const { loan, status } = res.data;

            if(status === 200) {
                if(loan.client_loan_status) {
                    setLoan(res.data);
                    setDisableBtn('disabled');
                    setForm({
                        client_id: user.id,
                        client_business_name: loan.client_business_name,
                        client_request_amoun: loan.client_request_amoun,
                        client_tax_id: loan.client_tax_id
                    })
                }
            }
        })

    }, [])

    return (
        <main className="container loan">
            <div className="row">
                <div className="align-items-center col-12 d-flex justify-content-between mb-5 mt-5">
                    <h2>Apply to a loan</h2>
                    <button className="btn btn-secondary" onClick={logout}>Logout</button>
                </div>
            </div>
            <form className="row" onSubmit={applyLoan}>
                <div className={`alert alert-dismissible alert-warning mt-5 ${alertForm}`}>
                    <h4 className="alert-heading">Error!</h4>
                    <p className="mb-0">check the form, and then click apply again</p>
                </div>
                <div className="col-12 col-md-4 p-3">
                    <label id="client_business_name" className="mb-2">Bussines name</label>
                    <input 
                        id="client_business_name"
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Adidas"
                        name="client_business_name"
                        onChange={setValues}
                        value={form.client_business_name}
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
                        value={form.client_tax_id}
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
                        value={form.client_request_amoun}
                    />
                </div>
                <button type="submit" className={`btn btn-outline-light d-block m-auto mt-4 w-25 ${disableBtn}`}>Apply</button>
            </form>
            {renderDetails()}
        </main>
    )
}

export default Loan;