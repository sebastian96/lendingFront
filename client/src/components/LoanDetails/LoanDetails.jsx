const LoanDetails = ({loan}) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
    return (
        <div className="row mt-5">
            <h2 className="mb-5">Loan details</h2>
            <div className="col-12 col-md-4">
                <ul className="list-group">
                    <li className="active bg-info list-group-item list-group-item-action text-capitalize text-center">
                        <b className="text-white">{loan.client_business_name}</b>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b>Tax number</b>
                        <span>{loan.client_tax_id}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b>Amount</b>
                        <span>{formatter.format(loan.client_request_amoun)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b>Status</b>
                        <span>{loan.client_loan_status}</span>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}

export default LoanDetails;