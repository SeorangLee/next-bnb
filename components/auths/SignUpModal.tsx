import React, {useState, useMemo, useCallback, useEffect} from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { monthList, dayList, yearList } from "../../lib/staticData";
import Selector from "../common/Selector";
import Button from "../common/Button";
import { signupAPI } from "../../lib/api/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { authActions } from "../../store/auth";
import useValidateMode from "../../hooks/useValidateMode";
import PasswordWarning from "./PasswordWarning";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon  from "../../public/static/svg/auth/open_eye.svg";
import ClosedEyeIcon  from "../../public/static/svg/auth/close_eye.svg";


const Container = styled.form`
  width : 568px;
  height : 710px;
  padding : 32px;
  background-color : white;
  z-index : 11;
  display: flex;
  flex-direction: column;
  justify-contents : center;

  .modal-close-x-icon {d
    cursor : pointer;
    display : block;
    margin : 0 0 40px auto;
  }

  .input-wrapper {
    position : relative;
    margin-bottom : 16px;
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top : 16px;
    margin-bottom : 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display : flex;
    margin-bottom : 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width : 33.3333%;
    }
  }

  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left : 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal : () => void;
}


//* minimum length of password
const PASSWORD_MIN_LENGTH = 8;

const SignUpModal: React.FC<IProps> = ({ closeModal }) =>{

  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();


  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  }

  //when change birth day
  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  }
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  }
  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  }

  //* when focus on password input
  const onFocusPassword = () => {
      setPasswordFocused(true);
    }

  //*submit sign up form 
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true);
    // dispatch(commonActions.setValidateMod(true))

    if(!email || !lastname || !!firstname || !password ){
      return undefined;
    }

    try {
      const signUpBody = {
        email,
        lastname,
        firstname,
        password,
        birthday: new Date(
          `${birthYear}-${birthMonth!.replace("???", "")}-${birthDay}`
        ).toISOString(),
      };
      const { data } = await signupAPI(signUpBody);
      dispatch(userActions.setLoggedUser(data));

      await signupAPI(signUpBody);
    }catch (e){
      console.log(e);
    }
};

//*check password has name or email
const isPasswordHasNameOrEmail = useMemo(
  () =>
    !password ||
    !lastname ||
    password.includes(lastname) ||
    password.includes(email.split("@")[0]),
  [password, lastname, email]
);

// debugger;
console.log(isPasswordHasNameOrEmail)

//* is password over min length
const isPasswordOverMinLength = useMemo(
  ()=> !!password && password.length >= PASSWORD_MIN_LENGTH,
  [password]
);

//* is password has symbol or number 
const isPasswordHasNumberOrSymbol = useMemo(
  () =>
  !(
    /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
    /[0-9]/g.test(password)
  ),
  [password]
);

//* check sign up form input value
const validateSignUpForm = () =>{
  //* when nothing of input value
  if (!email || !lastname || !firstname || !password){
    return false;
  }
  //* when incorrect password
  if (
      isPasswordHasNameOrEmail ||
      isPasswordOverMinLength ||
      isPasswordHasNumberOrSymbol
    ) {
      return false;
    }
  //* when nothing of brith info selector
  if (!birthDay || !birthMonth || !birthYear ){
    return false;
  }

  return true;
}

//* submit sign up form
const onSubminSignUp = async (event:React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  setValidateMode(true);
  console.log(validateSignUpForm());

  if (validateSignUpForm()) {
    try {
      const signUpBody = {
        email,
        lastname,
        firstname,
        password,
        birthday: new Date(
          `${birthYear}-${birthMonth!.replace("???", "")}-${birthDay}`
        ).toISOString(),
      };
      
      const { data } = await signupAPI(signUpBody);

      dispatch(userActions.setLoggedUser(data));
      closeModal()
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
};

//*change to login modal
const changeToLoginModal = () =>{
  dispatch(authActions.setAuthMode("login"));
}

useEffect(() => {
  return () => {
    setValidateMode(false);
  };
}, []);


  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal}/>
      <div className="input-wrapper">
        <Input 
          placeholder="????????? ??????" 
          type="email" 
          icon={<MailIcon />} 
          name="email"
          value={email}
          onChange={onChangeEmail}
          // validateMode={validateMode}
          useValidation
          isValid={!!email}
          errorMessage="???????????? ???????????????."
        />
      </div>
      <div className="input-wrapper">
        <Input 
          placeholder="??????(???:??????)" 
          icon={<PersonIcon />}
          value={lastname}
          onChange={onChangeLastname}
          // validateMode={validateMode}
          useValidation
          isValid={!!lastname}
          errorMessage="????????? ???????????????."
        />
      </div>
      <div className="input-wrapper">
        <Input 
          placeholder="???(???:???)" 
          icon={<PersonIcon />}
          value={firstname}
          onChange={onChangeFirstname}
          // validateMode={validateMode}
          useValidation
          isValid={!!firstname}
          errorMessage="?????? ???????????????."
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input 
          placeholder="???????????? ????????????"
          type = {hidePassword ? "password" : "text"}
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            isPasswordOverMinLength &&
            !isPasswordHasNumberOrSymbol
          }
          errorMessage="??????????????? ???????????????."
          onFocus={onFocusPassword}
        />
      </div>
      {passwordFocused &&(
        <>
          <PasswordWarning 
            isValid={isPasswordHasNameOrEmail}
            text="??????????????? ?????? ???????????? ????????? ????????? ????????? ??? ????????????."
          />
          <PasswordWarning 
            isValid = {!isPasswordOverMinLength} 
            text = "?????? 8???"
          />
          <PasswordWarning 
            isValid = {isPasswordHasNumberOrSymbol}
            text = "????????? ????????? ???????????????."
          />
        </>
      )}
      <p className="sign-up-birthday-label">??????</p>
      <p className="sign-up-modal-birthday-info">
        ??? 18??? ????????? ????????? ???????????? ????????? ??? ????????????. 
        ????????? ?????? ??????????????? ??????????????? ???????????? ????????????.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector 
          options={monthList} 
          disabledOptions={["???"]}
          defaultValue="???"
          value={birthMonth}
          onChange={onChangeBirthMonth}
          isValid={!!birthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector 
            options={dayList}
            disabledOptions={["???"]}
            defaultValue="???"
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector 
            options={yearList}
            disabledOptions={["???"]}
            defaultValue="???"
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">????????????</Button>
      </div>
      <p>
        ?????? ??????????????? ????????? ??????????
        <span
          className="sign-up-modal-set-login"
          role="presentation"
          onClick={changeToLoginModal}
        > 
          ?????????
        </span>
      </p>
    </Container>
  )
};

export default SignUpModal;