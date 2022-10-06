export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if(user.isAdmin){
       //compute DB summary
      //return response
      return res.json({ok:true , })
    }else{
      return res.status(403).json({ ok: false, message: "Permission denied" });
    }
   
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
