from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    }
]

@app.route('/loan/<client_id>')
def getLoan(client_id):
    clientFound = [client for client in clients if client['client_id'] == int(client_id)]

    if len(clientFound) > 0:
        return jsonify({'loan': clientFound[0], 'status': 200})
    
    return jsonify({'message': 'the client was not found', 'status': 404})

@app.route('/requestLoan', methods=['POST'])
def requestLoan():
    request_amount = int(request.json['client_request_amoun'])
    business_name = request.json['client_business_name']
    tax_id = request.json['client_tax_id']
    client_id = request.json['client_id']
    amount = 50000
    clientFound = [client for client in clients if client['client_id'] == client_id]

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