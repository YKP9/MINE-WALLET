import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

const TransactionSuccessul = () => {
  return (
    <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
      <div className="success-container">
        <h1>Payment Successful!</h1>
        <p className="mb-5">Thank you for your purchase. Your transaction was successful.</p>
        <Link to="/" className="mt-5"> <span>Go to Home Page</span>
          
        </Link>
      </div>
    </CSSTransition>
  );
};

export { TransactionSuccessul };
