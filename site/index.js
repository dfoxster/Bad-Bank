function Spa() {

    return (
        
            <HashRouter>
                <UserContext.Provider value={{users:[{userID: 1, name:'dyral', email:'dyral@mit.edu', password:'secret', balance:100, loggedin:false}], maxUserID: 1}}>
                    <NavBar />
                    <Route path="/" exact component={Home} />
                    <Route path="/CreateAccount/" component={CreateAccount} />
                    <Route path="/login/">
                        <Login />
                    </Route>
                    <Route path="/deposit/" component={Deposit} />
                    <Route path="/withdraw/" component={Withdraw} />
                    <Route path="/balance/" component={Balance} />
                    <Route path="/alldata/" component={AllData} />
                </UserContext.Provider>
            </HashRouter>
        
    );
}

ReactDOM.render(
    <Spa />,
    document.getElementById('root')
)

async function router() {
    var link = window.location.hash === '' || window.location.hash === '#/' || window.location.hash === '#' ?
    '/#home' :
    window.location.hash;

    updateNavbar(link);
}

function updateNavbar(newLink) {
    var linkElements = document.getElementsByClassName('nav-link');
    // reset all navbar links
    for (let item of linkElements) {
        if (item.classList.contains('active')) item.classList.remove('active');
        if (item.hasAttribute('aria-current')) item.removeAttribute('aria-current');
    }

    //choose desired navbar link
    const newLinkID = newLink.replace(/#\//g, '').toLowerCase() + '_link';
    const newLinkElement = document.getElementById(newLinkID);
    if (newLinkElement != null) {
        // highlight desired navbar link
        newLinkElement.classList.add('active');
        newLinkElement.setAttribute('aria-current', 'page');
    }
}

window.addEventListener('hashchange', router);
