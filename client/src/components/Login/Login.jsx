import React, {useState} from 'react';
import './Login.css'

const Login = (props) => {
    const [alertClass, setAlertClass] = useState('d-none');
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const USERS = [
        {
            id: 1,
            name: 'Sebastian Miranda',
            email: 'user1@email.com',
            password: 'lendingFront2021'
        },
        {
            id: 2,
            name: 'Juan Tibaduiza',
            email: 'user2@email.com',
            password: 'lendingFront2021'
        },
    ];

    const setValues = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = (e) => {
        e.preventDefault();
        
        const user = USERS.find(user => user.email === form.email && user.password === form.password);

        if(user) {
            return props.history.push('/apply-loan')
        }

        return setAlertClass('d-block');
    }

    return (
        <main className="login">
            <section className="row d-flex justify-content-center align-items-center h-100">
                <form className="col-12 col-sm-6 col-md-4" onSubmit={loginUser}>
                    <h2 className="mb-5">Sign in to LendingFront</h2>
                    <div className="mb-5">
                        <input 
                            type="email" 
                            className="form-control w-75 d-block m-auto" 
                            id="email" 
                            placeholder="Write your email"
                            name="email"
                            onChange={setValues}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="form-control w-75 d-block m-auto" 
                            id="password" 
                            placeholder="Write your password"
                            name="password"
                            onChange={setValues}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary d-block m-auto mt-4">Sign in</button>
                    <div className={`alert alert-dismissible alert-warning mt-5 ${alertClass}`}>
                        <h4 className="alert-heading">Error!</h4>
                        <p className="mb-0">Email or password incorrect.</p>
                    </div>
                </form>
            </section>
        </main>

    )
}

export default Login;