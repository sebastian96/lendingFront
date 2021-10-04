import './Login.css'

const Login = () => {
    return (
        <main className="login">
            <section className="row d-flex justify-content-center align-items-center h-100">
                <form className="col-12 col-sm-6 col-md-4">
                    <h2 className="mb-5">Sign in to LendingFront</h2>
                    <div className="mb-5">
                        <input type="email" className="form-control w-75 d-block m-auto" id="email" placeholder="Write your email"/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control w-75 d-block m-auto" id="password" placeholder="Write your password"/>
                    </div>
                    <button type="submit" className="btn btn-primary d-block m-auto mt-4">Sign in</button>
                </form>
            </section>
        </main>

    )
}

export default Login;