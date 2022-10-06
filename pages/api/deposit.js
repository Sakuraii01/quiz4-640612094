import { checkToken } from "../../backendLibs/checkToken";
import { writeUsersDB } from "../../backendLibs/dbLib";

export default function depositRoute(req, res) {
  if (req.method === "PUT") {
      const user = checkToken(req);
    if (!user.isAdmin) {  //check authentication
      const amount = req.body.amount;
      //validate body
      if (typeof amount !== "number")
        return res.status(400).json({ ok: false, message: "Invalid amount" });

      //check if amount < 1
      if(amount < 1){
         return res.status(400).json({ ok: false, message: "Amount must be greater than 0" });
      }

      //find and update money in DB
      const users = readUsersDB();
      const foundUserIdx = users.findIndex((x) => x.username === user.username);
      if (foundUserIdx === -1)
      return res
        .status(404)
        .json({ ok: false, message: "user is not found" });

      users[foundUserIdx].money += req.body.amount;
      writeUsersDB(users);

      return res.json({ ok: true, money: users[foundUserIdx].money });

    } else {
      return res.status(403).json({
        ok: false,
        message: "You do not have permission to deposit",
      });
    }
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
