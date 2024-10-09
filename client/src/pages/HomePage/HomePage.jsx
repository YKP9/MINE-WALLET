import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import homeImg from "../../assets/home.png";

export function HomePage() {
  return (
    <div>
      <header>
        <nav className={`${styles.navbar} flex justify-between p-2 `}>
          <div>MiNEWALLET</div>
          <div className={`${styles.navLinks} flex gap-2 `}>
            <Link
              to="/register"
              className={`${styles.navLink} primary-outlined-btn text-decoration-none `}
            >
              Register
            </Link>
            <Link
              to="/login"
              className={`${styles.navLink} primary-contained-btn text-decoration-none`}
            >
              {" "}
              Login{" "}
            </Link>
          </div>
        </nav>
      </header>
      <main >
       <section className={`${styles.heroSection} `}>
       <div className= {`${styles.heroImg} flex justify-center`}>
            <img src={homeImg} alt="Hero-img" />
        </div>
        <div className={`${styles.heroContent}}`}>
            <div >
                <h1 className="text-3xl">Welcome to MINEWALLET</h1>
            </div>
        </div>
       </section>
      </main>
    </div>
  );
}
