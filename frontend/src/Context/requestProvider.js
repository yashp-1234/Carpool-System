import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ReqContext = createContext();

const ReqProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [requestExists, setRequestExists] = useState();

  const history = useHistory();

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    setUser(userInformation);

    if (!userInformation) {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    const fetchData = async () => {
      const userInformation = JSON.parse(
        localStorage.getItem("userInformation")
      );
      const email = userInformation.email;
      if (!email) {
        console.log("User not logged in");
        history.push("/");
      } else {
        try {
          const reqExists = await axios.get("/api/req/check-request", {
            headers: {
              "user-email": email,
            },
          });
          if (reqExists.data.exists === true) {
            setRequestExists(true);
          } else {
            setRequestExists(false);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [setRequestExists, history]);


  return (
    <ReqContext.Provider
      value={{
        user,
        setUser,
        requestExists,
        setRequestExists,
      }}
    >
      {children}
    </ReqContext.Provider>
  );
};

export const ReqState = () => {
  return useContext(ReqContext);
};

export default ReqProvider;
