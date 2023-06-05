import styled from "styled-components"
import daysOfWeek from "../../../utils/daysOfWeek"
import { useState, useEffect } from "react"
import useAuth from "../../../hooks/auth"
import { BASE_URL } from "../../../utils/constants/apis"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner"

export default function FormHabits({ formClose, formOpen, loadHabits }) {
    const [habitName, setHabitName] = useState("")
    const [selectedDays, setSelectedDays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userAuth } = useAuth();



    function handleDayClick(dayId){
        if (selectedDays.includes(dayId)) {
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== dayId));
        } else {
            setSelectedDays([...selectedDays, dayId]);
        }
    };

    function handleInputChange(e){
        e.preventDefault()

        if(selectedDays.length === 0){
            alert("Selecione pelo menos um dia da semana.")
            return;
        }

        if(habitName === ""){
            alert("Por favor, preencha o campo com o nome do habito!")
            return;
        }

        setIsLoading(true);
        setError(null);

        const habitData = {
            name: habitName,
            days: selectedDays,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        setTimeout(() => {
            axios
              .post(`${BASE_URL}/habits`, habitData, config)
              .then((res) => {
                setIsLoading(false);
                setHabitName("");
                setSelectedDays([]);
                loadHabits();
                formClose();
              })
              .catch((error) => {
                setIsLoading(false);
                console.error("Erro ao cadastrar hábito:", error);
                setError("Erro ao cadastrar hábito. Por favor, tente novamente.");
              });
          }, 500);
    }


    useEffect(() => {
        setError(null);
      }, [habitName, selectedDays]);


    return (
        <FormContainer data-test="habit-create-container" onSubmit={handleInputChange} formOpen={formOpen}error={error}  >
            <Container>
                <Input
                    data-test="habit-name-input"
                    placeholder="nome do hábito"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                    disabled={isLoading}
                />
                <DaysContainer disabled={isLoading}>
                    {daysOfWeek.map((day) => (
                        <DayButton
                            type="button"
                            key={day.id}
                            selected={selectedDays.includes(day.id)}
                            onClick={() => handleDayClick(day.id)}
                            data-test="habit-day"
                            disabled={isLoading}
                        >
                            {day.day}
                        </DayButton>
                    ))}
                </DaysContainer>
            </Container>

            {error && <ErrorMessage>{error}</ErrorMessage>}


            <ButtonContainer>
                <CancelButton type="button" onClick={formClose} disabled={isLoading} data-test="habit-create-cancel-btn">Cancelar</CancelButton>
                <SaveButton type="submit" disabled={isLoading} data-test="habit-create-save-btn">
                    {isLoading
                        ? (<ThreeDots
                            height="30"
                            width="30"
                            radius="9"
                            color="#FFFFFF"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />)
                        : ("Salvar")}
                </SaveButton>
            </ButtonContainer>
        </FormContainer>
    )
}



const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const Container = styled.div`
  margin-bottom: 30px;
  

`;

const FormContainer = styled.form`
    display: ${(props) => props.formOpen ? "initial" : "none"};
    width: 90%;
    min-height: ${(props) => (props.error ? "220px" : "180px")};

    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 18px;
    margin: 20px auto;
    flex-wrap: wrap;
`
const Input = styled.input`
    width: 100%;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    background-color: ${(props) => props.disabled ? "#F2F2F2" : "#FFFFFF"};
    color: ${(props) => props.disabled ? "#AFAFAF" : "#666666"};
    pointer-events: ${(props) => props.disabled ? "none" : "all"};
    opacity: ${(props) => props.disabled ? 0.7 : 1};

    padding: 10px;
    &::placeholder{
    color: #DBDBDB;
  }

`
const DaysContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    pointer-events: ${(props) => props.disabled ? "none" : "all"};
    opacity: ${(props) => props.disabled ? 0.7 : 1};
`

const DayButton = styled.button`
  background-color: ${(props) => (props.selected ? "#CFCFCF" : "#ffffff")};
  color: ${(props) => (props.selected ? "#ffffff" : "#DBDBDB")};
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  border: ${(props) => props.selected ? "1px solid #CFCFCF" : "1px solid #D5D5D5"};
  pointer-events: ${(props) => props.disabled ? "none" : "all"};
  opacity: ${(props) => props.disabled ? 0.7 : 1};
`;

const ButtonContainer = styled.div`
  justify-content: flex-end;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: #ffffff;
  color: #52b6ff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  margin-right: 10px;
  width: 84px;
  height: 35px;
  font-size: 16px;
  pointer-events: ${(props) => props.disabled ? "none" : "all"};
  opacity: ${(props) => props.disabled ? 0.7 : 1};

`;

const SaveButton = styled.button`
    pointer-events: ${(props) => props.disabled ? "none" : "all"};
    opacity: ${(props) => props.disabled ? 0.7 : 1};
    background-color: #52b6ff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 16px;
    width: 84px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
`;



