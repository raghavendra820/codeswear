import Forgot from "@/models/Forgot";

export default function handler(req, res) {
  if(req.body.sendEmail){
    let token="nsdfdkngdkjgdjjk";
    const forgot=new Forgot({
      email:req.body.email,
      token:token
    })
    let email = `We have sent you this email in response to your request to reset your password on CodesWear.com
   After you reset your password, any credit card information stored in My Account will be deleted as a security measure.
    To reset your password for
   www.codeswear.in please follow the link below:
    <a href="http://localhost:3000/forgot?token=${token}">Click here to change the password</a>
    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My account page and change your password

    <br/><br/>`;
  }
  else{

  }
    res.status(200).json({  success:true });
}
