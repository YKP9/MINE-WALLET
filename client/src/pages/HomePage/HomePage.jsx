import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import homeImg from "../../assets/home.png";
import { useRef } from "react";
import logo from "../../assets/MINEWALLET.png"

export function HomePage() {
  const footerRef = useRef(null);

  const handleScrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <header className={`mb-5 ${styles.header}`}>
        <nav className={`${styles.navbar} flex justify-between  `}>
          <div className="flex items-center"><img src={logo} alt="MINEWALLET_LOGO" style={{ width: "200px" }} /></div>
          <div className={`${styles.navLinks} `}>
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
            <button onClick={handleScrollToFooter} className={`${styles.navLink} primary-outlined-btn text-decoration-none `}>Contact-Us</button>
          </div>
        </nav>
      </header>
      <main>
        <section className={`${styles.heroSection} `}>
          <div className={`${styles.heroImg} flex justify-center`}>
            <img src={homeImg} alt="Hero-img" />
          </div>
          <div className={`${styles.heroContent}}`}>
            <div className={`${styles.heroText} w-50 `}>
              <h1 className="text-3xl">Welcome to MINEWALLET</h1>
              <div>
                <div className="text-2xl mt-3">
                  " Empower Your Transactions with MINEWALLET "
                </div>
                <div className="w-75 text-xl mt-4 p-1">
                  With MINEWALLET, pay with just an email and password.
                  Effortlessly link your bank accounts and cards, and enjoy
                  quick access to a local network of payment solutions. Join us
                  today for a better way to pay!
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.benifitsContainer} h-screen  `}>
          <div
            className={`${styles.benifitsText} text-center mt-5 text-3xl bold `}
          >
            Benifits of adding the Digital Wallet
          </div>
          <div className={`${styles.benifitsContent} mt-5`}>
            <div className={`${styles.benifitCard}`}>
              <p className="text-xl mb-1 bold">Secure Transactions</p>
              <p>
                Your security is our priority. MINEWALLET employs advanced
                encryption to keep your information safe.
              </p>
            </div>
            <div className={`${styles.benifitCard}`}>
              <p className="text-xl mb-1 bold">Instant Payments</p>
              <p className="text-lg text-center">
                Make and receive payments in seconds, enjoying instant
                transactions without waiting.
              </p>
            </div>
            <div className={`${styles.benifitCard}`}>
              <p className="text-xl mb-1 bold">User-Friendly Interface</p>
              <p className="text-lg text-center">
                Navigate effortlessly with our intuitive design, ensuring a
                smooth user experience.
              </p>
            </div>
            <div className={`${styles.benifitCard}`}>
              <p className="text-xl mb-1 bold">Multiple Payment Options</p>
              <p className="text-lg text-center">
                Easily link your bank accounts, cards, and local payment methods
                for convenient transactions.
              </p>
            </div>
            <div className={`${styles.benifitCard} bordered`}>
              <p className="text-xl mb-1 bold">Global Reach</p>
              <p className="text-lg text-center">
                Join millions of users worldwide and make international payments
                seamless.
              </p>
            </div>
            <div className={`${styles.benifitCard} bordered`}>
              <p className="text-xl mb-1 bold">Chargeback Protection</p>
              <p className="text-lg text-center">
                Rest easy with our chargeback protection policy for peace of
                mind with every transaction.
              </p>
            </div>
            <div className={`${styles.benifitCard} bordered`}>
              <p className="text-xl mb-1 bold">Quick Setup</p>
              <p className="text-lg text-center">
                Get started in minutes. Create your account and start
                transacting with just an email.
              </p>
            </div>
            <div className={`${styles.benifitCard} bordered`}>
              <p className="text-xl mb-1 bold">24/7 Customer Support</p>
              <p className="text-lg text-center">
                Our dedicated support team is here for you anytime, day or
                night.
              </p>
            </div>
          </div>
          <div className={`${styles.benifitBA}  w-80 m-auto flex justify-center item-center h-30 flex-col `}>
            <div className="text-2xl">
              Boost your business by adding MINEWALLET to your checkout today
            </div>
            <div className={`${styles.BA} mt-5`}>
              <Link to="/register" className="text-decoration-none primary-outlined-btn bg-quarternary">Get a Business Account</Link>
            </div>
          </div>
          

          
          
        </section>
        
      </main>
      <footer ref={footerRef} className={ `${styles.footer} border h-25 flex justify-between p-4 text-lg`}>
        <div>Copyright @ 2024 MINEWALLET All rights reserved.</div>
        <div><img src={logo} style={{width:"150px",height:"150px"}} alt="LogoImg" /></div>
        <div >
          <div className="text-3xl">Contact-Us</div>
          <div className="mt-2">1800 9999 9999</div>
          <div className="mt-1">mw9@gmail.com</div>
        </div>
      </footer>
    </div>
  );
}
