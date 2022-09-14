function Balance() {
    const ctx = React.useContext(UserContext);
    return (
        <h1>Balance
            <br />
            {JSON.stringify(ctx, null, "\t")}
        </h1>
    );
}