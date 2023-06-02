import { ContainerHabits, ButtonHabits, TitleHabits, ContentHabits, Legend } from "../../components/Habits/HabitsStyled";
import  plus from "../../assets/plus.svg"
import FormHabits from "./FormHabits/FormHabits";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/auth";
import styled from "styled-components";
import apis from "../../constants/apis";
import daysOfWeek from "../../utils/daysOfWeek";

export default function HabitsPage(){
    const [createHabit, setCreateHabit] = useState(false)
    const [habits, setHabits] = useState(null)
    const { userAuth } = useAuth();
    

    function handleListHabits() {
        apis.listHabits(userAuth.token)
            .then(res => {
                setHabits(res.data)
                console.log(res.data)
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    useEffect(handleListHabits, []);

    if (habits === null) {
        return <h1>Carregando...</h1>;
    }

    const getSelectedDays = (selectedDays) => {
        return daysOfWeek.map((day) => ({
            ...day,
            selected: selectedDays.includes(day.id)
        }));
    };

    return (
        <ContainerHabits>
            <ContentHabits>
                <TitleHabits>Meus hábitos</TitleHabits>
                <ButtonHabits onClick={() => setCreateHabit(true)}>
                    <img src={plus} />
                </ButtonHabits>
            </ContentHabits>
            <FormHabits
                formClose={() => setCreateHabit(false)}
                formOpen={createHabit}
                handleListHabits={handleListHabits}
            />

            {habits.length === 0 ? (
                <Legend>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Legend>
            ) : (
                habits.map((habit) => (
                    <ContainerEachHabit key={habit.id}>
                        <HabitName>{habit.name}</HabitName>
                        <HabitDays>
                            {getSelectedDays(habit.days).map((day) => (
                                <DayButton key={day.id} selected={day.selected}>{day.day}</DayButton>
                            ))}
                        </HabitDays>
                    </ContainerEachHabit>
                ))
            )}
        </ContainerHabits>
    )
}

const ContainerEachHabit = styled.div`
    width: 90%;
    height: 91px;

    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 18px;
    padding-bottom: 120px;
    margin: 20px auto;
`
const HabitName = styled.div`
    width: 100%;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #666666;

`
const HabitDays = styled.div`
    display: flex;
    margin-top: 8px;
    justify-content: space-between;
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
