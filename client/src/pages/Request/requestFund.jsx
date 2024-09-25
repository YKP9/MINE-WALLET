import { Tabs, Table, message } from "antd";
import { PageHeading } from "../../components/pageTitle";
import { useState, useEffect } from "react";
import { NewRequestModal } from "./newRequestModal";
import { GetAllRequests, UpdateRequestStatus } from "../../apiCalls/request";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import moment from "moment";
export function RequestMoney() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [data = [], setData] = useState({ sent: [], received: [] });
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  const columns = [
    {
      title: "Request ID",
      dataIndex: "_id",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      render: (sender) => `${sender.firstName} ${sender.lastName}`,
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      render: (receiver) => `${receiver.firstName} ${receiver.lastName}`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        if (record.status === "pending" && record.receiver._id === user._id) {
          return (
            <div className="flex gap-1">
              <h1
                className="text-sm underline"
                onClick={() => updateStatus(record, "rejected")}
              >
                Reject
              </h1>
              <h1
                className="text-sm underline"
                onClick={() => updateStatus(record, "accepted")}
              >
                Accept
              </h1>
            </div>
          );
        }
        return null;
      },
    },
  ];

  const getAllRequests = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllRequests();

      if (response.success) {
        const sentData = response.data.filter(
          (request) => request.sender._id === user._id
        );
        const receivedData = response.data.filter(
          (request) => request.receiver._id === user._id
        );

        setData({
          sent: sentData,
          received: receivedData,
        });
        dispatch(HideLoading());
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const updateStatus = async (record, status) => {
    try {
      dispatch(ShowLoading());
        // Extract the ID and status
    const requestId = record._id; // Get the request ID from the record

    // Log to confirm
    console.log("Updating request with ID:", requestId, "to status:", status);

      const response = await UpdateRequestStatus({
        requestId  : record._id,
        status,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getAllRequests();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAllRequests();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <PageHeading title={"Requests"} />
        <button
          className="primary-outlined-btn"
          onClick={() => setShowNewRequestModal(true)}
        >
          Request Funds
        </button>
      </div>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Sent",
            key: "1",
            children: (
              <Table columns={columns} dataSource={data.sent} rowKey="_id" />
            ),
          },
          {
            label: "Received",
            key: "2",
            children: (
              <Table
                columns={columns}
                dataSource={data.received}
                rowKey="_id"
              />
            ),
          },
        ]}
      />

      {showNewRequestModal && (
        <NewRequestModal
          showNewRequestModal={showNewRequestModal}
          setShowNewRequestModal={setShowNewRequestModal}
          reloadData={getAllRequests}
        />
      )}
    </div>
  );
}
