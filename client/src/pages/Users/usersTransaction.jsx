import { PageHeading } from "../../components/pageTitle";
import { Table, message } from "antd";
import { useEffect, useState } from "react";
import { GetAllUsersTransactions } from "../../apiCalls/admin";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import moment from "moment";

export function TransactionDashboard() {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsersTransactions();
      dispatch(HideLoading());
      if (response.success) {
        setTransactions(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const transactionsColumns = [
    {
      title: " Sender",
      dataIndex: "sender",
      render: (text, record) => `${record.sender.firstName} ${record.sender.lastName}`,
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      render: (text, record) => `${record.receiver.firstName} ${record.receiver.lastName}`,
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
      title: "Date",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY       hh:mm A"),
    },
  ];

  return (
    <div>
      <PageHeading title="Transactions" />
      <Table className=" mt-2" columns={transactionsColumns} dataSource={transactions} />

    </div>
  );
}




