import styled from "styled-components"
import daysOfWeek from "../../../utils/daysOfWeek"
import { useState, useEffect } from "react"
import useAuth from "../../../hooks/auth"
import { BASE_URL } from "../../../constants/apis"
import axios from "axios"
import HabitsPage from "../HabitsPage"

export default function FormHabits({ formClose, formOpen }) {
    const [habitName, setHabitName] = useState("")
    const [selectedDays, setSelectedDays] = useState([]);
    const { userAuth } = useAuth();
    console.log(userAuth.token)


    const handleDayClick = (dayId) => {
        if (selectedDays.includes(dayId)) {
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== dayId));
        } else {
            setSelectedDays([...selectedDays, dayId]);
        }
    };

    const handleInputChange = (e) => {
        e.preventDefault()

        const habitData = {
            name: habitName,
            days: selectedDays,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${userAuth.token}`,
            },
        };

        console.log(habitData)

        axios.post(`${BASE_URL}/habits`, habitData, config)
            .then((res) => {
                console.log(res.data);
                setHabitName("")
                setSelectedDays([])
                formClose();
            })
            .catch((error) => {
                console.error("Erro ao cadastrar hábito:", error);
                // Trate o erro de acordo com a sua necessidade
            });

    };


    return (
        <FormContainer onSubmit={handleInputChange} formOpen={formOpen}>
            <Container>
                <Input
                    placeholder="nome do hábito"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                />
                <DaysContainer>
                    {daysOfWeek.map((day) => (
                        <DayButton
                            type="button"
                            key={day.id}
                            selected={selectedDays.includes(day.id)}
                            onClick={() => handleDayClick(day.id)}
                        >
                            {day.day}
                        </DayButton>
                    ))}
                </DaysContainer>
            </Container>

            <ButtonContainer>
                <CancelButton type="button" onClick={formClose}>Cancelar</CancelButton>
                <SaveButton type="submit">Salvar</SaveButton>
            </ButtonContainer>
        </FormContainer>
    )
}


  

const Container = styled.div`
  margin-bottom: 30px;
`;

const FormContainer = styled.form`
    display: ${(props) => props.formOpen ? "initial" : "none"};
    width: 90%;
    height: 180px;

    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 18px;
    margin: 20px auto;
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

    padding: 10px;
    &::placeholder{
    color: #DBDBDB;
  }

`
const DaysContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
`

const DayButton = styled.button`
  background-color: ${(props) => (props.selected ? "#CFCFCF" : "#ffffff")};
  color: ${(props) => (props.selected ? "#ffffff" : "#DBDBDB")};
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  border: ${(props) => props.selected ? "1px solid #CFCFCF" : "1px solid #D5D5D5"};
`;

const ButtonContainer = styled.div`
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

`;

const SaveButton = styled.button`
  background-color: #52b6ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
`;



