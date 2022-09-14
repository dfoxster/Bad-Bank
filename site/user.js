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

export default {
    getLoggedInUser,
    findUser,
    updateUser,
    getUserIndex
};