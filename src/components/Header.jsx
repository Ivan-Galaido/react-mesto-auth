import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, userEmail, onSignOut }) {
  const { pathname } = useLocation();
  const linkText = pathname === '/sign-in' ? 'Регистрация' : 'Войти';
  const link = pathname === '/sign-in' ? '/sign-up' : '/sign-in';

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    document.addEventListener('scroll', () => window.pageYOffset > 200 && setMobileMenuOpen(false));
  }, []);

  useEffect(() => {
    if (!loggedIn) setMobileMenuOpen(false);
  }, [loggedIn]);

  const classNamesMobileMenu = [
    'header__mobile-menu',
    !isMobileMenuOpen ? 'header__mobile-menu_hidden' : ''
  ].join(' ').trim();

  const classNamesMobileMenuButton = [
    'header__burger',
    isMobileMenuOpen ? 'header__burger_active' : ''
  ].join(' ').trim();

  return (
    <header className="header fade-in">
      {loggedIn && pathname === '/' && (
        <div className={classNamesMobileMenu}>
          <p className="header__email">{userEmail}</p>
          <Link to="/sign-in" className="header__link header__link_faded" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      )}

      <nav className="header__nav">
        <Link to="/" className="header__logo" aria-label="На главную" />

        {loggedIn && pathname === '/' ? (
          <>
            <button className={classNamesMobileMenuButton} onClick={toggleMobileMenu}>
              <span className="header__line" />
            </button>

            <div className="header__user-menu">
              <p className="header__email">{userEmail}</p>
              <Link to="/sign-in" className="header__link header__link_faded" onClick={onSignOut}>
                Выйти
              </Link>
            </div>
          </>
        ) : (
          <Link to={link} className="header__link">
            {linkText}
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
