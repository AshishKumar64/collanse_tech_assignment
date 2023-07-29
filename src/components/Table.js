import React from "react";
import { useSelector } from "react-redux";
import { removeUser, editUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Table = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  return (
    <>
      <h2>---- Registered Users ----</h2>
      {users.length !== 0 ? (
        <table>
          <tr>
            <th>Name</th>
            <th>Date of birth</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
          {users?.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.dob}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address.join(', ')}</td>
                <td style={{ display: "flex" }}>
                  <button
                    onClick={() => dispatch(editUser(user, index))}
                    className="button edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(removeUser(user.id))}
                    className="button delete"
                    style={{ background: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      ) : (
        <div className="no_record"><h4>No data found</h4></div>
      )}
    </>
  );
};
export default Table;
