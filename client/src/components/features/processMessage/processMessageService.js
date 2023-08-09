/** @format */

import axios from "axios";

const API_URL = "/api/mail/confirm";

//Get personal profile
const sendMail = async (formData) => {
  const emailHTML = `
    <html>
      <head>
        <style>        
         .container {
            background-color: black;
            max-width: 600px;
            margin: 0 auto;            
            font-size: 15px;  
            padding: 15px;                   
         }
         .messageBody {
            max-width: 600px;
            padding: 10px;
            color: gold; 
            border-radius: 10px; 
            border: 2px solid white;             
         }
         .footer{
          max-width: 600px;
          text-align: center;
          color: white;
          padding: 10px;
         }
        </style>
      </head>
      <body>
        <div class="container">        
        <div class="messageBody">
            <p>
                Dear ${formData.firstname},
            </p>
            <p>Please verify your account</p>
            <p>
                Click the button below to verify your account on the IMPACT Academy Mentorship Hub.
            </p>

            <p>
            Verification Link: http://localhost:3000/verify-user/
            </p>
            <p>
                Thanks
            </p>        
            <p>
                Kindest Regards,<br />
                I.O. James<br />
                IMPACT Academy Dev Team
            </p>
        </div>
        <div class="footer">
          IMPACT Academy &copy; 2023
        </div>
        </div>
      </body>
    </html>
  `;
  const subject = "verify account";

  const formDataWithHTML = { ...formData, subject, html: emailHTML };
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.post(API_URL, formDataWithHTML);

  return response.data;
};

const processMessageService = {
  sendMail,
};

export default processMessageService;
