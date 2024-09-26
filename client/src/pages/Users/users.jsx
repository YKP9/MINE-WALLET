import { useState, useEffect } from "react";
import { PageHeading } from "../../components/pageTitle";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { Table, message } from "antd";
import moment from "moment";
import {
  GetAllUsers,
  UpdateUserVerificationStatus,
  
} from "../../apiCalls/admin";

export function AdminVerification() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers();
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  

  useEffect(() => {
    getUsers();
  }, []);

 

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      render: (text, record) => {
        return record.isVerified ? "Yes" : "No";
      },
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            {record.isVerified ? (
              <button
                className="primary-outlined-btn"
                onClick={() => updateVerificationStatus(record._id, false)}
              >
                SUSPEND
              </button>
            ) : (
              <button
                className="primary-contained-btn"
                onClick={() => updateVerificationStatus(record._id, true)}
              >
                ACTIVATE
              </button>
            )}
          </div>
        );
      },
    },
  ];

 

  const updateVerificationStatus = async (userId, isVerified) => {
    try {
      dispatch(ShowLoading());
      const response = await UpdateUserVerificationStatus({
        userId,
        isVerified,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getUsers();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <PageHeading title="Users" />

      <Table className=" mt-2" columns={columns} dataSource={users} />
      
    </div>
  );
}
