import React, { useEffect, useRef  } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Flex } from "@chakra-ui/react";
import Daily from '@daily-co/daily-js';
import { useUserContext } from "../Context/UserContext";

const LiveClass = (props) => {
    const { id } = useParams();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const iframeContainerRef = useRef(null);

    useEffect(() => {
      const domain = "https://instraktor.daily.co/";
  
      axios
        .get(`https://instraktor-be-v2.vercel.app/video/create-meeting/${id}`)
        .then((res) => {
          if (res.status === 200) {
            const iframe = document.getElementById("dailyCOOO");
            let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvIjp0cnVlLCJkIjoiYzlkMTdiYjktYTNhMS00NDU4LWFhNDEtZjJmMjNiMThkMmY5IiwiaWF0IjoxNzA0NTc5MDQ3fQ.KjgVVlnG8pEPg6BCsAByFqppb37rbcisLhxqioGuOu8"
            // if(id!="as")adminToken = "";
            // iframe.src = `${domain}${id}`;
            iframe.style = {
              position: "relative",
              width: "100%",
              height: "100%",
              border: "0",
              zIndex: 9999,
            }

            // const callProperties = { url: `${domain}${id}`, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvIjp0cnVlLCJkIjoiYzlkMTdiYjktYTNhMS00NDU4LWFhNDEtZjJmMjNiMThkMmY5IiwiaWF0IjoxNzA0NTc5MDQ3fQ.KjgVVlnG8pEPg6BCsAByFqppb37rbcisLhxqioGuOu8"};
            const callProperties = { url: `${domain}${id}`, token: adminToken,showLeaveButton: true,
            showFullscreenButton: true, };
            
            // document.getElementsByClassName("banner").style.display = "none";

            let call = Daily.wrap(iframe,callProperties);
            call.setUserName(userData.trainerid+"_"+userData.name);
            call.setUserData({role:"trainer"});
            call.join();
          }
        })
        .catch((err) => console.log(err));
    }, [id]);


  return(
    <>
    <Flex id="dailyContainer" h="100%" alignItems="center" justifyContent="center">
    <iframe id="dailyCOOO" height="100%" width="100%" allow="camera; microphone"/>
    </Flex>
    </>
  )
}

export default LiveClass