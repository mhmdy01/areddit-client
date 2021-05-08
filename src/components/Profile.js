import React from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

const Profile = () => {
  const { name, username } = useSelector(({ user }) => user);

  return (
    <div>
      <h2>Profile</h2>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>name</th>
            <td>{name}</td>
          </tr>
          <tr>
            <th>username</th>
            <td>{username}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Profile;
