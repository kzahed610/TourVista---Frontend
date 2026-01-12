import AuthPanel from '../components/AuthPanel.jsx';
import './LoginPage.css';

function LoginPage() {
    return(
        // FIX: The <AuthPanel> is wrapped in a dedicated `div` for centering.
        // WHY: The original centering styles were incorrectly placed in the component's own CSS and conflicted with global styles.
        // This wrapper applies the styles from `LoginPage.css` to correctly center the login form on the page
        // without affecting any other components. This is a much cleaner and more stable solution.
        <div className="login-page-wrapper">
            <AuthPanel />
        </div>
    );
}

export default LoginPage