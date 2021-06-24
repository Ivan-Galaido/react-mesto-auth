function Footer() {
  const startingYear = 2021;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {`${startingYear}${currentYear > startingYear ? -currentYear : ""} Mesto Russia`}
      </p>
    </footer>
  );
}

export default Footer;
