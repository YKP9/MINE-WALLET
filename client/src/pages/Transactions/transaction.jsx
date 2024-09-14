import { PageHeading } from "../../components/pageTitle";
import { Table, message } from "antd";
import { useEffect, useState } from "react";
import { TransactionModal } from "./transferFundsModal";
import { DepositMoneyModal } from "./depositFundsModal";
import { GetTransactionsOfUser } from "../../apiCalls/transaction";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loadersSlice";
import moment from "moment";

export function TransactionHistory() {
  const [showTransferFundsModal, setShowTransferFundsModal] = useState(false);
  const [data = [], setData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [showDepositModal, setShowDepositModal] = useState(false);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => moment(date).format("DD-MM-YYYY        hh:mm A"),
    },
    {
      title: "Time",
      dataIndex: "date",
      render: (date) => moment(date).format(" hh:mm:ss A"),
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        return record.sender._id === user._id ? "Debit" : "Credit";
      },
    },
    {
      title: "Reference Account",
      dataIndex: "",

      // Render method for reference account number
      // render : ( text, record ) => {
      //   return record.sender === user._id ? record.sender._id : record.receiver._id;
      // }

      // Render method for sender and receiver name
      render: (text, record) => {
        return record.sender._id === user._id ? (
          <div>
            <h1 className="text-sm">
              {record.receiver.firstName} {record.receiver.lastName}
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="text-sm">
              {record.sender.firstName} {record.sender.lastName}
            </h1>
          </div>
        );
      },
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const getTransactionData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetTransactionsOfUser();

      if (response.success) {
        setData(response.data);
        dispatch(HideLoading());
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getTransactionData();
  }, []);

  return (
    <div>
      <div className="flex justify-between item-center">
        <PageHeading title="Transactions" />

        <div className="flex gap-1">
          <button
            className="primary-outlined-btn"
            onClick={() => setShowDepositModal(true)}
          >
            Deposit
          </button>
          <button
            className="primary-contained-btn"
            onClick={() => setShowTransferFundsModal(true)}
          >
            Transfer
          </button>
        </div>
      </div>

      <Table columns={columns} dataSource={data} className="mt-2" />

      {showTransferFundsModal && (
        <TransactionModal
          showTransferFundsModal={showTransferFundsModal}
          setShowTransferFundsModal={setShowTransferFundsModal}
          reloadData={getTransactionData}
        />
      )}

      {showDepositModal && (
        < DepositMoneyModal
          showDepositModal={showDepositModal}
          setShowDepositModal={setShowDepositModal}
          reloadData={getTransactionData}
        />
      )}
    </div>
  );
}
