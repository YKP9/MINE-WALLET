import { PageHeading } from "../../components/pageTitle"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

export function UserProfile() {

    const { user } = useSelector((state) => state.users);
  return (
    <div>

      <PageHeading title="Profile" />

      <div className="card p-2 mt-2 w-50 br-3 flex flex-col gap-1 uppercase">
        <div className="flex justify-between">
          <h1 className="text-md "> Username </h1>
          <h1 className="text-md ">{user.userName}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md ">First Name</h1>
          <h1 className="text-md ">{user.firstName}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md ">Last Name</h1>
          <h1 className="text-md ">{user.lastName}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md ">Email</h1>
          <h1 className="text-md ">{user.email}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md ">Mobile</h1>
          <h1 className="text-md ">{user.phoneNumber}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md ">Address </h1>
          <h1 className="text-md ">{user.address}</h1>
        </div>
      </div>

      <div className="mt-3" >
        <Link to={"/edit-profile"} > <button className="primary-contained-btn"  >EDIT</button> </Link>
      </div>
    
    </div>
  )
}
