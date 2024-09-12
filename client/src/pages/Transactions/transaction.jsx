import { PageHeading } from "../../components/pageTitle";
import { Table } from "antd";
import { useState } from "react";
import { TransactionModal } from "./transferFundsModal";

export function TransactionHistory() {
  const [showTransferFundsModal, setShowTransferFundsModal] = useState(false);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
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

  return (
    <div>
      <div className="flex justify-between item-center">
        <PageHeading title="Transactions" />

        <div className="flex gap-1">
          <button className="primary-outlined-btn">Deposit</button>
          <button
            className="primary-contained-btn"
            onClick={() => setShowTransferFundsModal(true)}
          >
            Transfer
          </button>
        </div>
      </div>

      <Table columns={columns} dataSource={[]} className="mt-2" />

      {showTransferFundsModal && (
        <TransactionModal
          showTransferFundsModal={showTransferFundsModal}
          setShowTransferFundsModal={setShowTransferFundsModal}
        />
      )}
    </div>
  );
}
