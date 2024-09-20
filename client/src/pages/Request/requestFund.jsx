import { Tabs } from 'antd';
import { PageHeading } from '../../components/pageTitle';
export function RequestMoney() {

    // const [data = [], setData] = useState([]);
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
                  <h1 className="text-sm underline" onClick={() => updateStatus(record, "rejected")}>
                    Reject
                  </h1>
                  <h1 className="text-sm underline" onClick={() => updateStatus(record, "accepted")}>
                    Accept
                  </h1>
                </div>
              );
            }
            return null;
          },
        },
      ];


  return (
    <div>

      <div className="flex justify-between">
        <PageHeading title={"Requests"} />
        <button className='primary-outlined-btn'>Request Funds</button>
      </div>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Sent" key="1">
          SENT
        </Tabs.TabPane>
        <Tabs.TabPane tab="Received" key="2">
          RECEIVED
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
