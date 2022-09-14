import {
    getLoggedInUser,
    findUser,
    updateUser,
    getUserIndex
} from './user.js';

function Login() {
    const [status, setStatus]       = React.useState('');
    const [name, setName]           = React.useState('');
    const [password, setPassword]   = React.useState('');   
    const ctx = React.useContext(UserContext);
    const [show, setShow]           = React.useState((ctx.users.findIndex(user => user.loggedin === true) > -1 ? false : true));
    
    //initLoginPage();

    const initLoginPage = () => {
        const loggedInUser = getLoggedInUser();
        console.log(loggedInUser);
        if (loggedInUser != undefined) {
            setStatus(`Welcome back, ${loggedInUser.name}!`);
            setShow(false);
            return false
        }
        else {
            setShow(true);
            return true;
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
            setStatus(`Welcome back, ${name}!`);
            console.log(ctx.users);
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