import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userClasses, setUserClasses] = useState([
    { classid: "You have no classes assigned to you yet!" },
  ]);

  useEffect(() => {
    const trainerID = localStorage.getItem("trainerID");
    console.log(trainerID);
    const fetchedUserData = JSON.parse(localStorage.getItem("userData"));
    const fetchedUserClasses = JSON.parse(localStorage.getItem("userClasses"));
    if (fetchedUserData.studentid == undefined) {
        console.log("Refetching User Data");
        axios
        .get(`https://instraktor-be.vercel.app/users/${trainerID}`)
        .then((response) => {
            console.log(response);
          setUserData(response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // if (fetchedUserClasses) {
    //   setUserClasses(fetchedUserClasses);
    // }
    // if (fetchedUserClasses.classid == "You have no classes assigned to you yet!") {
      
    // }
    // const storedUserClasses = JSON.parse(localStorage.getItem("userClasses"));

    // if (storedUserClasses) {
    //   setUserClasses(storedUserClasses);
    // }
  }, []); 

  return (
    <UserContext.Provider
      value={{ userData, setUserData, userClasses, setUserClasses }}
    >
      {children}
    </UserContext.Provider>
  );
};
