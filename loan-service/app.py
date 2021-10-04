from flask import Flask, jsonify, request

app = Flask(__name__)

PORT = 4000
HOST = '0.0.0.0'

clients = [
    {
        'client_id': 1,
        'client_business_name': None,
        'client_tax_id': None,
        'client_request_amoun': None,
        'client_is_logged': True,
        'client_loan_status': None
    },
    {
        'client_id': 2,
        'client_business_name': None,
        'client_tax_id': None,
        'client_request_amoun': None,
        'client_is_logged': False,
        'client_loan_status': None
    },
    {
        'client_id': 3,
        'client_business_name': None,
        'client_tax_id': None,
        'client_request_amoun': None,
        'client_is_logged': True,
        'client_loan_status': None
    },
]

@app.route('/loan/<client_id>')
def getLoan(client_id):
    clientFound = [client for client in clients if client['client_id'] == int(client_id)]

    if len(clientFound) > 0:
        return jsonify({'loan': clientFound, 'status': 200})
    
    return jsonify({'message': 'the client was not found', 'status': 404})

@app.route('/requestLoan', methods=['POST'])
def requestLoan():
    request_amount = request.json['request_amount']
    business_name = request.json['business_name']
    tax_id = request.json['tax_id']
    client_id = request.json['client_id']
    amount = 50000
    clientFound = [client for client in clients if client['client_id'] == client_id]

    print(clientFound)

    if(len(clientFound) > 0):
        currentClient = clientFound[0]
        if request_amount > amount:
            currentClient['client_loan_status'] = 'Denied'
        elif request_amount == amount:
            currentClient['client_loan_status'] = 'Pending'
        elif request_amount < amount:
            currentClient['client_loan_status'] = 'Approved'
        
        currentClient['client_business_name'] = business_name
        currentClient['client_tax_id'] = tax_id
        currentClient['client_request_amoun'] = request_amount

        return jsonify({'loan': currentClient, 'status': 200})
    
    return jsonify({'message': 'the client was not found', 'status': 404})
    

if __name__ == '__main__':
    print(f'Server running on port {PORT}')
    app.run(host=HOST, port=PORT, debug=True)