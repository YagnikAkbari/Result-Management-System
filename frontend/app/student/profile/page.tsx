import React from "react";
import styles from "../../../styles/pages/studentProfile.module.scss";

const Profile = () => {
  const user = {
    Name: "Yagnik Akbari",
    Div: "B",
    EnrollmentNo: "20BECE30003",
    Batch: "2020-2024",
    Branch: "Computer Engineering",
    Email: "yagnik58ppsv@gmail.com",
    collegeEmail: "yagnik_2@ldrp.ac.in",
  };
  return (
    <div className="flex items-center justify-center mt-12">
      <div className={`rounded-2xl ${styles.card}`}>
        <div>
          <div>
            <label>Name:</label>
            <br />
            <p>{user?.Name}</p>
          </div>
        </div>

        <div>
          <div>
            <label>Division:</label>
            <br />
            <p>{user?.Div}</p>
          </div>
          <div>
            <label>Enrollment:</label>
            <br />
            <p>{user?.EnrollmentNo}</p>
          </div>
        </div>

        <div>
          <div>
            <label>Batch:</label>
            <br />
            <p>{user?.Batch}</p>
          </div>
          <div>
            <label>Branch:</label>
            <br />
            <p>{user?.Branch}</p>
          </div>
        </div>

        <div>
          <div>
            <label>Email:</label>
            <br />
            <p>{user?.Email}</p>
          </div>
          <div>
            <label>College Email:</label>
            <br />
            <p>{user?.collegeEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
