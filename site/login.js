function Login(props) {
    const ctx       = React.useContext(UserContext);

    const getLoggedInUser = () => {
        return ctx.users.find(user => user.loggedin === true);
    }
    
    const findUser = (fieldName) => {
        let array = ctx.users;
        const arrayCopy = [...array];
        return arrayCopy.find(user => user.name.toLowerCase() == fieldName.toLowerCase());
    }

    const getUserIndex = (userID) => {
        const array = ctx.users;
        return array.findIndex(user => user.userID === userID);
    }

    const updateUser = (theUser, action = undefined, amount = undefined) => {
        let array = ctx.users;
        const arrayCopy = [...array];
        const index = getUserIndex(theUser.userID);
        let actionTaken = false;
        switch (action) {
            case 'login':
                theUser.loggedin = true;
                actionTaken = true;
                break;
            case 'logout':
                theUser.loggedin = false;
                actionTaken = true;
                break;
            default:
                console.log('Action not found.');
        }
        if (actionTaken) {
            arrayCopy[index] = theUser;
            array = [...arrayCopy];
            return true;
        }
        else {
            console.log('User not updated.');
            return false;
        }
        
    }
    
    const [name, setName]           = React.useState('');
    const [password, setPassword]   = React.useState('');   
    const [show, setShow]           = React.useState(
                                        (ctx.users.findIndex(user => user.loggedin === true) > -1 ? 
                                        false : true)
                                      );
    const [status, setStatus]       = React.useState(
                                        (ctx.users.findIndex(user => user.loggedin === true) > -1 ? 
                                        'Welcome back, ' + getLoggedInUser().name + '!' : '')
                                      );
    
    
    const [loggedIn, setLoggedIn] = React.useState(false);
    //initLoginPage();

    const initLoginPage = () => {
        const loggedInUser = getLoggedInUser();
        console.log(loggedInUser);
        if (loggedInUser != undefined) {
            setStatus(`Welcome back, ${loggedInUser.name}!`);
            setShow(false);
            return false;
        }
        else {
            setShow(true);
            return true;
        }

    } 

    function toggleDisplay(id) {
        const element = document.getElementById(id);
        if (element.classList.contains('d-none')) {
            element.classList.remove('d-none');
        }
        else {
            element.classList.add('d-none');
        }
    }

    function validate(fieldName, fieldPassword, label) {
        let theUser = findUser(fieldName);
        if (theUser === undefined ||
            theUser.password != fieldPassword) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;

    }

    function handleSubmit() {
        console.log(name,password);
        if(!validate(name, password, 'Invalid username or password')) return;
        let theUser = findUser(name);
        let userUpdated = updateUser(theUser, 'login');
        if (userUpdated) {
            toggleDisplay('deposit_item');
            toggleDisplay('withdraw_item');
            setStatus(`Welcome back, ${name}!`);
            setShow(false);
        }
        else {
            console.log('Error while updating user');
        }
    }

    function signOut() {
        let theUser = getLoggedInUser();
        let userUpdated = updateUser(theUser, 'logout');
        if (userUpdated) {
            setName('');
            setPassword('');
            setShow(true);
            toggleDisplay('deposit_item');
            toggleDisplay('withdraw_item');
            setStatus('You have successfully logged out.');
            setTimeout(() => setStatus(''), 3000);   
        }
        else {
            console.log('Error while updating user');
        }
    }    
    
    return (
        <Card 
        bgcolor="warning"
        header="Login"
        status={status}
        body={show ? (
            <>
                Name<br />
                <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} />
                Password<br />
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
                <button type="submit" className="btn btn-light" onClick={handleSubmit}>Log In</button>
            </>
        ) : (
            <>
                <h5>Login Successful</h5>
                <button type="submit" className="btn btn-light" onClick={signOut}>Log Out</button>
            </>
        )}
        />
    );
}