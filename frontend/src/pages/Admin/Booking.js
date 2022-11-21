import React, { useEffect, useState, useContext } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
import AuthContext from "../../context/AuthContext";
import Axios from "axios";
   


const baseUrl='http://127.0.0.1:8000/'
export default function Booking() {
  const [slots, setSlots] = useState([])
  const {authTokens} = useContext(AuthContext)

  useEffect(() => {
    Axios.get(baseUrl+'base/slots',
    {
      headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer  ${authTokens.access}`
      }
    }).then((response) => {
      setSlots(response.data)
      console.log(response.data)
    })
    
  },[])

  return (
    <Card className="w-40 mt-6 ml-4 shadow-md rounded">
      { slots?.map((slot, index) => {
        return(
          <div key={slot.id}>
            <CardHeader color="blue" className="relative h-20 bg-green-800">
            <h1 className="text-center py-6 text-3xl font-bold justify-center">{slot.rooms}</h1>
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h5" className="mb-2">
                Seat
              </Typography>
              {slot.is_booked ?
                <Typography>
                Booked
              </Typography> :
                <Typography>
                 Not Booked
              </Typography>
               }
            </CardBody>
            <CardFooter divider className="flex items-center justify-center py-3">
              
            <Typography variant="small" color="gray" className="flex gap-1">
              <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
              Company name
            </Typography>
        </CardFooter>
      </div>
        )
      })}
      
    </Card>
    

  );
}