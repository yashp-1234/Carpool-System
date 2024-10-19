import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Formpage = () => {
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const [formData, setFormData] = useState({
    frequency: "",
    mode: "",
    area: "",
    arrtime: "",
    deptime: "",
    service: "",
  });

  useEffect(() => {
    const loadRequest = async () => {
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
          const { data } = await axios.get("/api/req/getmyrequest", config);
          if (data) {
            setFormData(data);
            setIsEditMode(true);
          }
        } catch (error) {
          console.error("Error loading request:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadRequest();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
};

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.frequency ||
      !formData.mode ||
      !formData.area ||
      !formData.arrtime ||
      !formData.deptime ||
      !formData.service
    ) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    if (userInformation && userInformation.email) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "User-Email": userInformation.email,
          },
        };
        if (isEditMode) {
          await axios.put("/api/req/update", formData, config);
        } else {
          await axios.post("/api/req", formData, config);
        }

        toast({
          title: `Request ${isEditMode ? "Updated" : "Submited"}`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        setLoading(false);

        history.push("/main");
      } catch (error) {
        console.error("Error submitting request:", error);
        toast({
          title: "Error Occured!",
          description: error.response?.data?.message || 'An error occurred',
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    }
  };
  if (loading) {
    return <div className="section">Loading...</div>;
  }

  return (
    <Container maxW="3xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w={"xl"}
        m="40px 0 15px 0px"
        borderRadius="lg"
        borderWidth="2px"
        borderColor={"darkblue"}
      >
        <Text fontSize={"4xl"} fontWeight={"600"} color={"darkblue"}>
          Connect Now
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        color="black"
        borderWidth={"2px"}
        marginBottom={"40px"}
        borderColor={"darkblue"}
      >
        <VStack spacing="5px">
          <FormControl id="frequency" marginTop={"2px"} isRequired>
            <FormLabel as="legend">Select ride frequency</FormLabel>
            <RadioGroup
              name="frequency"
              value={formData.frequency}
              onChange={(e) =>
                handleChange({ target: { name: "frequency", value: e } })
              }
            >
              <HStack spacing="24px">
                <Radio value="Single-day">Single-day</Radio>
                <Radio value="Weekly">Weekly</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl id="mode" marginTop={"10px"} isRequired>
            <FormLabel as="legend">Select ride mode</FormLabel>
            <RadioGroup
              name="mode"
              value={formData.mode}
              onChange={(e) =>
                handleChange({ target: { name: "mode", value: e } })
              }
            >
              <HStack spacing="24px">
                <Radio value="To University">To university</Radio>
                <Radio value="From University">From university</Radio>
                <Radio value="Both">Both</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl marginTop={"10px"} isRequired>
            <FormLabel>Select your residential area</FormLabel>
            <Select
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Select area"
            >
              <option value="Ahmedabad Cantonment">Ahmedabad Cantonment</option>
              <option value="Alam Roza">Alam Roza</option>
              <option value="Ambawadi">Ambawadi</option>
              <option value="Amraiwadi">Amraiwadi</option>
              <option value="Asarwa">Asarwa</option>
              <option value="Asarwa Chakla">Asarwa Chakla</option>
              <option value="Badarkha">Badarkha</option>
              <option value="Bahiyal">Bahiyal</option>
              <option value="Bapunagar">Bapunagar</option>
              <option value="Behrampura">Behrampura</option>
              <option value="Bhairavnath Road">Bhairavnath Road</option>
              <option value="Bopal">Bopal</option>
              <option value="Chaloda">Chaloda</option>
              <option value="Chandkheda">Chandkheda</option>
              <option value="Chandlodiya">Chandlodiya</option>
              <option value="Dabhoda">Dabhoda</option>
              <option value="Dariapur">Dariapur (Ahmedabad)</option>
              <option value="Detroj">Detroj</option>
              <option value="Ellis bridge">Ellis bridge (area)</option>
              <option value="Ghatlodiya">Ghatlodiya</option>
              <option value="Ghodasar">Ghodasar</option>
              <option value="Girdharnagar">Girdharnagar</option>
              <option value="Gita Mandir Road">Gita Mandir Road</option>
              <option value="Gomtipur">Gomtipur</option>
              <option value="Gota">Gota, Gujarat</option>
              <option value="Isanpur">Isanpur</option>
              <option value="Jamalpur">Jamalpur, Gujarat</option>
              <option value="Jawahar Chowk">Jawahar Chowk</option>
              <option value="Jholapur">Jholapur</option>
              <option value="Jodhpur">Jodhpur, Gujarat</option>
              <option value="Juhapura">Juhapura</option>
              <option value="Kalupur">Kalupur</option>
              <option value="Kalyanpura">Kalyanpura (Ahmedabad)</option>
              <option value="Khadia">Khadia, Ahmedabad</option>
              <option value="Kharna">Kharna</option>
              <option value="Khodiyarnagar">Khodiyarnagar</option>
              <option value="Khokhra">Khokhra</option>
              <option value="Lambha">Lambha</option>
              <option value="Makarba">Makarba</option>
              <option value="Maninagar">Maninagar</option>
              <option value="Memnagar">Memnagar</option>
              <option value="Mithakali">Mithakali</option>
              <option value="Motera">Motera</option>
              <option value="Naroda">Naroda</option>
              <option value="Nava Vadaj">Nava Vadaj</option>
              <option value="Navarangpura">Navarangpura</option>
              <option value="Odhav">Odhav</option>
              <option value="Paldi">Paldi</option>
              <option value="Polarpur">Polarpur</option>
              <option value="Rajpur Gomtipur">Rajpur Gomtipur</option>
              <option value="Ramol">Ramol</option>
              <option value="Ranip">Ranip</option>
              <option value="Sabarmati">Sabarmati (area)</option>
              <option value="Saraspur">Saraspur</option>
              <option value="Sardarnagar">Sardarnagar</option>
              <option value="Sarkhej">Sarkhej</option>
              <option value="Shahibaug">Shahibaug</option>
              <option value="Shahpur">Shahpur, Gujarat</option>
              <option value="Shardanagar">Shardanagar</option>
              <option value="Shastri Nagar">Shastri Nagar, Ahmedabad</option>
              <option value="Subhash Bridge">Subhash Bridge</option>
              <option value="Sukhrampura">Sukhrampura</option>
              <option value="Thakkar Bapanagar">Thakkar Bapanagar</option>
              <option value="Thaltej">Thaltej</option>
              <option value="Usmanpura">Usmanpura</option>
              <option value="Vastral">Vastral</option>
              <option value="Vastrapur">Vastrapur</option>
              <option value="Vejalpur">Vejalpur</option>
            </Select>
          </FormControl>

          <FormControl marginTop={"10px"} isRequired>
            <FormLabel>Prefered arrival and departure time</FormLabel>
            <div>
              Arr:{" "}
              <input
                type="time"
                name="arrtime"
                value={formData.arrtime}
                onChange={handleChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Dep:{" "}
              <input
                type="time"
                name="deptime"
                value={formData.deptime}
                onChange={handleChange}
              />
            </div>
          </FormControl>

          <FormControl id="service" marginTop={"10px"} isRequired>
            <FormLabel as="legend">
              Are you in need of the service or do you want to offer the
              service?
            </FormLabel>
            <RadioGroup
              name="service"
              value={formData.service}
              onChange={(e) =>
                handleChange({ target: { name: "service", value: e } })
              }
            >
              <HStack spacing="24px">
                <Radio value="need">In need of service</Radio>
                <Radio value="offer">Offering for service</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Button
            colorScheme="blue"
            width={"60%"}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
          >
            {isEditMode ? "Update Request" : "Place Request"}
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Formpage;
