import CookiesLogin from '../Login';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';
export default function Login_page() {
  return (
    <>
      <ThemeSwitcher />
      <CookiesLogin
        CookieName='role'
        ApiEnd='cookie_login'
        labName='first'
        values={['admin', 'support']}
      />
    </>
  );
}
