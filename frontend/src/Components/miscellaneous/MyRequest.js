import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const MyRequest = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    const getMyRequest = async () => {
      setLoading(true);
      const userInformation = JSON.parse(
        localStorage.getItem("userInformation")
      );
      if (userInformation && userInformation.email) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "User-Email": userInformation.email,
            },
          };
          const response = await axios.get("/api/req/getmyrequest", config);
          setData(response.data);
        } catch (error) {
          console.log("Error in fetching your request!");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getMyRequest();
  }, []);

  if (loading) {
    return <div className="section">Loading...</div>;
  }

  if (!data) {
    return <div className="section">Submit your request to find a ride</div>;
  }

  const editRequest = async (e) => {
    e.preventDefault();
    try {
      history.push("/form");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRequest = async() => {
    const userInformation = JSON.parse(localStorage.getItem('userInformation'));

  if (userInformation && userInformation.email) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'User-Email': userInformation.email,
        },
      };

      await axios.delete('/api/req/delete', config);

      toast({
        title: "Request Deleted!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });


      window.location.reload()
    } catch (error) {
      console.error('Error deleting request:', error);
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Error deleting request",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
}

  return (
    <div>
      <div className="box">
        <span>My Request</span>
        <div style={{ marginTop: "25px" }}>
          <p>
            <b>Name:</b> {data.user.name}
          </p>
          <p>
            <b>Roll number:</b> {data.user.rollno}
          </p>
          <p>
            <b>Email:</b> {data.userEmail}
          </p>
          <p>
            <b>Ride Frequency:</b> {data.frequency}
          </p>
          <p>
            <b>Ride mode:</b>{" "}
            {data.mode === "Both" ? "Both (to and from University)" : data.mode}
          </p>
          <p>
            <b>Residential area:</b> {data.area}
          </p>
          <p>
            <b>Prefered arrival time:</b> {data.arrtime}
          </p>
          <p>
            <b>Prefered departure time:</b> {data.deptime}
          </p>
          <p>
            <b>Type of service:</b>{" "}
            {data.service === "need"
              ? "In need of service"
              : "Offering for service"}
          </p>
        </div>
        <Box marginBottom={2}>
          <Button
            colorScheme="blue"
            width={"15%"}
            style={{ marginTop: 15, marginRight: 10 }}
            onClick={editRequest}
            isLoading={loading}
          >
            Edit Request
          </Button>
          <Button
            colorScheme="red"
            width={"15%"}
            style={{ marginTop: 15 }}
            onClick={deleteRequest}
            isLoading={loading}
          >
            Delete Request
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default MyRequest;
