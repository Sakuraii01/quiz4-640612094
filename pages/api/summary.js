import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB, writeUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    const user = checkToken(req);
    const users = readUsersDB();
    const customers = users.filter(x => !x.isAdmin);
    const admins = users.filter(x => x.isAdmin);
    const totalMoney = customers.reduce((p, c) => {
      return p + (c.money != null ? c.money : 0);
    }, 0);

    if (user == null || !user.isAdmin)
    //check authentication
      return res.status(403).json({ ok: false, message: "Permission denied" });
    
    return res.status(200).json({
        ok: true,
        userCount: customers.length,
        adminCount: admins.length,
        totalMoney: totalMoney != null ? totalMoney : 0,
      })
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}