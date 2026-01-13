import CookiesLogin from '../Login';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';
export default function Login_page() {
  return (
    <>
      <ThemeSwitcher />
      <CookiesLogin
        CookieName='userId'
        ApiEnd='cookie_login_second'
        labName='second'
        values={['MQ==', 'OQ==']}
      />
    </>
  );
}
