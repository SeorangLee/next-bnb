import React, {useState} from "react";
import OutsideClickHandler from "react-outside-click-handler";
import user from "../lib/data/user";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";


//* Is user menu open
const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);


const HeaderUserProfile: React.FC = () => {
  return(
    <OutsideClickHandler
      onOutsideClick={()=> {
        if (isUsermenuOpened) {
          setIsUsermenuOpened(false);
        }
      }}
    >
      <button
        className="header-user-profile"
        type="button"
        onClick={()=> setIsUsermenuOpened(!isUsermenuOpened)}
      >
        <HamburgerIcon />
        <img 
          src={user.profileImage}
          className="header-user-profile-image"
          alt=""
        />
      </button>
      {isUsermenuOpened && <div>유저 메뉴</div>}
    </OutsideClickHandler>
  )
}

export default HeaderUserProfile;