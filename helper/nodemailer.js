import nodemailer from "nodemailer"

const transport= nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
    auth: {
      user: "tip.top.kapil.01@gmail.com",
      pass: "wipxouladdooceuz",
    }
})

 export const sendMail=(mail,otp)=>{
const details={ from:"tip.top.kapil.01@gmail.com",
to:mail,
subject:"verify",
html:`<div style="height:100vh;width:100%; background:rgb(34, 190, 3); text-align: center ;padding: 2rem  ;
display: flex; justify-content: center; align-items: center;"><div>
 <b style="font-size: 4rem;">T I P T O P</b>
 <p style="font-size: 2rem;">Please use the verification code below on the TIPTOP Website</p>
 <p style="font-size: 4rem; color: rgb(252, 36, 3); letter-spacing: 1rem;">${otp}</p>
 <p class="font-size:1rem;">Thanks!</p>
</div>
</div>`}

   transport.sendMail(details)
}
