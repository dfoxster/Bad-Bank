function NavBar() {
     
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" id="home_link" aria-current="page" href="#">BadBank</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="createaccount_link" href="#/CreateAccount">Create Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="login_link" href="#/login">Login</a>
                        </li>
                        <li className="nav-item d-none" id="deposit_item">
                            <a className="nav-link" id="deposit_link" href="#/deposit">Deposit</a>
                        </li>
                        <li className="nav-item d-none" id="withdraw_item">
                            <a className="nav-link" id="withdraw_link" href="#/withdraw">Withdraw</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="balance_link" href="#/balance">Balance</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="alldata_link" href="#/alldata">All Data</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

}