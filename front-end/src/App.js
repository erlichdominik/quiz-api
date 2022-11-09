import QuizTitle from './Components/UI/QuizTitle';
import FormContainer from './Components/UI/RegistrationContainer';
import Registration from './Components/User/Registration';
import Login from './Components/User/Login';

const App = () => {
  return (
    <>
      <QuizTitle />
      <FormContainer>
        <Login></Login>
      </FormContainer>
    </>
  );
};

export default App;
