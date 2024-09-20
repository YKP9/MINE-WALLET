import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

const TransactionFailed = () => {
  return (
    <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
      <div className="transaction-failed-container">
        <h1>Transaction Failed</h1>
        <p>
          We're sorry, but your transaction could not be completed. Please try
          again later.
        </p>
        <Link to="/">
          Go to Home Page
        </Link>
      </div>
    </CSSTransition>
  );
};
export { TransactionFailed };
