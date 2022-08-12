import { readFileSync, writeFileSync } from "fs";
import { StoredUserType } from "../../types/user";


//*get user list
const getList = () => {
  const usersBuffer = readFileSync("../../data/users.json");
  const usersString = usersBuffer.toString();
  if(!usersString){
    return [];
  }
  const users: StoredUserType[] = JSON.parse(usersString);
  return users;
};

//*check email already
const exist = ({email} : {email:string}) => {
  const users = getList();
  return users.some((user) => user.email === email);
};

//*store user List
const write = async (users: StoredUserType[]) => {
  writeFileSync("data/users.json", JSON.stringify(users));
};

export default {getList, exist, write};

