import styled from "styled-components";
import { mobile } from "../components/responsive/responsive";
import { useState } from "react";
import { useHistory } from "react-router";
import { publicRequest } from "../requestMethods";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #F44072;
  color: white;
  cursor: pointer;
  ${({ home }) => home && `
    background: white;
    border: 2px solid black;
    color: black;
  `}
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPass) {
      try {
        await publicRequest.post("/auth/register", { email, username, password });
        history.push("/login");
      } catch (err) {
        console.log(err)
      }
    };
    }
    
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="username" type="text" name="username" onChange={(e) => setUsername(e.target.value)} required={true}/>
          <Input placeholder="email" type="email" name="email" onChange={(e) => setEmail(e.target.value)} required={true}/>
          <Input placeholder="password" type="password" minLength={6} name="password" onChange={(e) => setPassword(e.target.value)} required={true}/>
          <Input placeholder="confirm password" minLength={6} type="password" name="confirm_password" onChange={(e) => setConfirmPass(e.target.value)} required={true}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <ButtonsContainer>
            <Button type="submit">CREATE</Button>
            <Button onClick={()=> history.push("/")} home={true}>Go Home</Button>
          </ButtonsContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
