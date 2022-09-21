function Withdraw() {
    const ctx = React.useContext(UserContext);

    const userIsLoggedIn = () => (ctx.users.findIndex(user => user.loggedin === true) > -1);
    const getLoggedInUser = () => {
        return ctx.users.find(user => user.loggedin === true);
    }
    
    const findUser = (fieldName) => {
        const array = ctx.users;
        const arrayCopy = [...array];
        return arrayCopy.find(user => user.name.toLowerCase() == fieldName.toLowerCase());
    }
    
    const updateUser = (theUser, action = undefined, amount = undefined) => {
        let array = ctx.users;
        let arrayCopy = [...array];
        const index = getUserIndex(theUser.userID);
        let message = '';
        let actionTaken = false;
        let newBalance = 0;
        switch (action) {
            // case 'login':
            //     theUser.loggedin = true;
            //     actionTaken = true;
            //     break;
            // case 'logout':
            //     theUser.loggedin = false;
            //     actionTaken = true;
            //     break;
            // case 'deposit':
            //     newBalance = theUser.balance + parseFloat(amount);
            //     theUser.balance = newBalance;
            //     actionTaken = true;
            case 'withdraw':
                newBalance = theUser.balance - parseFloat(amount);
                theUser.balance = newBalance;
                actionTaken = true;
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

    var formatter = new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD',
    });

    const [amount, setAmount]   = React.useState('');
    const [balance, setBalance] = React.useState(
                                    userIsLoggedIn ? 
                                    formatter.format(getLoggedInUser().balance.toString()) : '0'
                                  );
    const [show, setShow]       = React.useState(true);
    const [status, setStatus]   = React.useState('');
    
    function validate(field, action, label) {
        let isValid = true;
        switch (action) {
            case 'checkEmpty':
                if (!field) {
                    isValid = false;
                }
                break;
            case 'checkValid':
                const currencyRegEx = new RegExp(/^[^\$]([0-9]{1,3}([0-9]{3})*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/);
                if (!currencyRegEx.test(amount) ||
                    (parseInt(amount) != amount && parseFloat(amount) != amount))
                {
                    isValid = false;
                }
                break;
            case 'checkNSF':
                let newBalance = getLoggedInUser().balance - parseFloat(amount);
                if (newBalance < 0) {
                    isValid = false;
                }
                break;
            default:
                console.log('Action not found');
                isValid = false;
        }
        if (!isValid) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
        }
        return isValid;
    }
    
    function handleWithdraw() {
        if(!validate(amount, 'checkEmpty', 'Please enter a withdrawal amount')) return;
        if(!validate(amount, 'checkValid', 'Please enter a valid withdrawal amount')) return;
        if(!validate(amount, 'checkNSF', 'You do not have sufficient funds to complete this transaction.')) return;
        let userUpdated = updateUser(getLoggedInUser(), 'withdraw', amount);
        if (userUpdated) {

            setBalance(formatter.format(getLoggedInUser().balance.toString()));
            setStatus('You have successfully made a ' + formatter.format(amount) + ' withdrawal.');
            setShow(false);
        }
    }

    function clearForm() {
        setAmount('');
        setStatus('');
        setShow(true);
    }
    
    return (
        <Card 
            bgcolor="info"
            header="Withdraw"
            status={status}
            body={show ? (
                <>
                    <span style={ {float:'left'} }>Balance</span><span style={ {float:'right'} }>{balance}</span><br />
                    Deposit Amount<br />
                    <input type="input" className="form-control" id="amount" placeholder="Withdrawal Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} />
                    <button type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
                </>
            ) : (
                <>
                    <h5>Success</h5>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Make another withdrawal</button>
                </>
            )}
        />
    );
}