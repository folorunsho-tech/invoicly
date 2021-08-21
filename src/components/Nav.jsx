import styles from "../theme/nav.module.css";
import logo from "../assets/mainlogo.svg";

import { Link } from "react-router-dom";
function Nav() {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        {" "}
        <img className={styles.logo} src={logo} alt="Invoicly" />
      </Link>
      <div className={styles.usercont}>
        <p className={styles.username}>Invoicly</p>
      </div>
    </nav>
  );
}

export default Nav;
