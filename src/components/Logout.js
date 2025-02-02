const Logout = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "./login";
    };

    handleLogout();

    return null;
};

export default Logout;
