// import {NextApiRequest, NextApiResponse} from "next";
import { NextApiRequest, NextApiResponse } from "../../../node_modules/next/dist/shared/lib/utils";
import bcrypt from "bcryptjs";
import Data from "../../../lib/data/index";
import user from "../../../lib/data/user";
import { StoredUserType } from "../../../types/user";
import jwt from "jsonwebtoken";
import { defaultMaxListeners } from "events";



// export default async (req: NextApiRequest, res: NextApiResponse) =>{
//   if(req.method === "POST"){
//     const { email, firstname, lastname, password, birthday } = req.body;
//       if(!email || !firstname || !lastname || !password || !birthday){
//       res.statusCode = 400;
//       return res.sned("필수 데이터가 없습니다.")
//     }

//     const userExist = Data.user.exist({email});
//     if(userExist){
//       res.statusCode = 409;
//       res.send("이미 가입된 이메일입니다.")
//     }

//     const hashedPassword = bcrypt.hashSync(password, 8)

//     const users = Data.user.getList();
//     let userId;
//     if (users.length === 0){
//       userId = 1;
//     }else {
//       userId = users[users.length -1].id + 1;
//     }

//     const newUser: StoredUserType = {
//       id: userId,
//       email,
//       firstname,
//       lastname,
//       password: hashedPassword,
//       birthday,
//       profileImage: "../../../public/static/image/user/default_user_profile_image.jpg",
//     }

//     Data.user.write([...users, newUser]);

//     await new Promise((resolve) => {
//       const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
//       res.setHeader(
//         "Set-Cookie",
//         `access_token=${token}; path=/; expires=${new Date(
//           Date.now() + 60 * 60 * 24 * 1000 * 3 //3일
//         )}; httponly`
//       );
//       resolve(token);
//     });

//     const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> = newUser;

//     delete newUserWithoutPassword.password;
//     res.statusCode = 200;
//     return res.send(newUser);

//   }
//   res.statusCode = 405;

//   return res.end();


// };


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
      const { email, firstname, lastname, password, birthday } = req.body;
      debugger;
      if(!email || !firstname || !lastname || !password || !birthday){
        res.statusCode = 400;
        return res.send("필수 데이터가 없습니다.")
      }

      const userExist = Data.user.exist({email});
      if (userExist){
        res.statusCode = 409;
        res.send("이미 가입된 이메일입니다.")
      }

      //비밀번호 암호화
      const hashedPassword = bcrypt.hashSync(password, 8);

      //유저 정보 추가
      const users = Data.user.getList();
      let userId;
      if (users.length === 0){
        userId = 1
      }else {
        userId = users[users.length -1].id +1;
      }

      const newUser : StoredUserType = {
        id: userId,
        email,
        password : hashedPassword,
        firstname,
        lastname,
        birthday,
        profileimage : "../../../public/static/image/user/default_user_profile_image.jpg",
      }

      Data.user.write([...users, newUser]);

      const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
      res.setHeader(
        "Set-Cookie",
        `access_token=${token}; path=/; expires=${new Date(Date.now() + 60 * 60 * 24 * 1000 * 3)} ; httponly`
      );


  }
  res.statusCode = 405;

  return res.end();
}