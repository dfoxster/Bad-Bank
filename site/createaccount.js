function CreateAccount() {
    const [show, setShow]           = React.useState(true);
    const [status, setStatus]       = React.useState('');
    const [name, setName]           = React.useState('');
    const [email, setEmail]         = React.useState('');
    const [password, setPassword]   = React.useState('');
    const ctx = React.useContext(UserContext);

    const getLoggedInUser = () => {
        return ctx.users.find(user => user.loggedin === true);
    }
    
    const findUser = (fieldName) => {
        const array = ctx.users;
        const arrayCopy = [...array];
        return arrayCopy.find(user => user.name.toLowerCase() == fieldName.toLowerCase());
    }
    
    const updateUser = (theUser, action = undefined, amount = undefined) => {
        const array = ctx.users;
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
    
    const getUserIndex = (userID) => {
        const array = ctx.users;
        return array.findIndex(user => user.userID === userID);
    }
    
    function validate(field, label){
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }        
        return true;
    }

    function isUnique(fieldName, label) {
        const theUser = findUser(fieldName);
        if (theUser != undefined && theUser.name.toLowerCase() === fieldName) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    function handleCreate(){
        console.log(name,email,password);
        if(!validate(name,      'Please enter a name'))                     return;
        if(!isUnique(name,      'A user with this name already exists'))    return;
        if(!validate(email,     'Please enter a email'))                    return;
        if(!validate(password,  'Please enter a password'))                 return;
        ctx.users.push({name,email,password,balance:100,loggedin:false,userID:++ctx.maxUserID});
        setShow(false);
    }
    
    function clearForm() {
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }
    
    return (
        <Card 
            bgcolor="primary"
            header="Create Account"
            status={status}
            body={show ? (
                <>
                    Name<br />
                    <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} />
                    Email<br />
                    <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                    Password<br />
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
                    <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
                </>
            ) : (
                <>
                    <h5>Success</h5>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>
            )}
        />
    );
}