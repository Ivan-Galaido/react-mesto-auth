function Footer() {
  const startingYear = 2021;
  const currentYear = new Date().getFullYear();
  const text =
    currentYear > startingYear
      ? `${startingYear}-${currentYear} Mesto Russia`
      : `${startingYear} Mesto Russia`;

  return (
    <footer className="footer fade-in">
      <p className="footer__copyright">&copy; {text}</p>
    </footer>
  );
}

export default Footer;
