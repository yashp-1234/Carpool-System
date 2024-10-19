import React, { useEffect, useState } from "react";
import { Card, CardBody, Text, Stack, Button } from "@chakra-ui/react";
import axios from "axios";

const ReqEntries = () => {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  useEffect(() => {

    const loadEntries = async () => {
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
          const response = await axios.get("/api/req/entries", config);
        //   console.log(response);
        //   console.log(response.data);
          setEntries(response.data);
        } catch (error) {
          console.log("Error in fetching your request!");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  if (loading) {
    return <div className="section">Loading...</div>;
  }
  if (!entries || entries.length === 0) {
    return <div className="section">No entries found</div>;
  }

  return (
    <div>
      <div className="reqs">
      <Text marginBottom={3}>This is the list of requests that are {entries[0].service === "need" ? "in need of" : "offering"} services from your area. Click on contact to get in touch with them.</Text>
        <Stack spacing="4">
          {entries.map((entry, index) => (
            <Card variant="filled" key={entry._id}>
              <div className="card">
                <div>
                  <CardBody>
                    <Text color={"darkblue"}>
                      <b>Request {index + 1}</b>
                    </Text>
                    <Text>
                      <b>Name:</b> {entry.user.name}
                    </Text>
                    <Text>
                      <b>Roll number:</b> {entry.user.rollno}
                    </Text>
                    <Text>
                      <b>Email:</b> {entry.userEmail}
                    </Text>
                    <Text>
                      <b>Area:</b> {entry.area}
                    </Text>
                    <Text>
                      <b>Frequency:</b> {entry.frequency}
                    </Text>
                    <Text>
                      <b>Ride mode:</b> {entry.mode === "Both" ? "Both (to and from University)" : entry.mode}
                    </Text>
                    <Text>
                      <b>Prefered arrival time:</b> {entry.mode === "To University" || entry.mode === "Both" ? entry.arrtime : "(NA)"}
                    </Text>
                    <Text>
                      <b>Prefered departure time:</b> {entry.mode === "From University" || entry.mode === "Both" ? entry.deptime : "(NA)"}
                    </Text>
                  </CardBody>
                </div>

                <div className="reqButton">
                  <Button colorScheme="blue" onClick={() => window.location.href=`mailto:${entry.userEmail}`}> Contact</Button>
                </div>
              </div>
            </Card>
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default ReqEntries;
