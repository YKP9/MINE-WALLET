

// export  function TransactionSuccessful() {
//   return (
//     <div>
      
//     </div>
//   )
// }


import { CSSTransition } from "react-transition-group";
 

 export const TransactionSuccessul = () => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames="fade"
    >
      <div className="success-container">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your transaction was successful.</p>
      </div>
    </CSSTransition>
  );
};

