import { ContainerHabits, ButtonHabits, TitleHabits, ContentHabits, Legend } from "../../components/Habits/HabitsStyled";
import plus from "../../assets/plus.svg"
import FormHabits from "./FormHabits/FormHabits";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/auth";
import styled from "styled-components";
import apis from "../../utils/constants/apis";
import daysOfWeek from "../../utils/daysOfWeek";
import { FaTrash } from 'react-icons/fa';
import { BASE_URL } from "../../utils/constants/apis";
import axios from "axios";
import useProgress from "../../hooks/progress";


export default function HabitsPage() {
    const [createHabit, setCreateHabit] = useState(false)
    const [habits, setHabits] = useState(null)
    const [confirmDeleteHabit, setConfirmDeleteHabit] = useState();
    const { userAuth } = useAuth();
    const { updateProgress } = useProgress();

    function handleListHabits() {
        apis.listHabits(userAuth?.token)
            .then(res => {
                setHabits(res.data)
                handleListHabitsToday()
                // console.log(res.data)
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    function handleListHabitsToday() {
        apis.lisHabitsToday(userAuth?.token)
            .then(res => {
                const habitsDone = res.data.filter(habit => habit.done)
                updateProgress(habitsDone.length, res.data.length);
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    function handleDeleteHabits(habitId) {
        // const shouldDelete = window.confirm('Deseja realmente excluir este hábito?');
        // if (!shouldDelete) {
        //     return; // Se o usuário clicar em "Cancelar", não faz nada
        // }

        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        axios.delete(`${BASE_URL}/habits/${habitId}`, config)
            .then((response) => {
                console.log('Hábito excluído com sucesso');
                handleListHabits();
                handleListHabitsToday();


            })
    }


    useEffect(handleListHabits, []);

    const handleConfirmDelete = (habitId) => {
        if (habitId) {
            handleDeleteHabits(habitId);
            setConfirmDeleteHabit(null);
        }
    };

    const handleCancelDelete = () => {
        setConfirmDeleteHabit(null);
      };

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
                <ButtonHabits data-test="habit-create-btn" onClick={() => setCreateHabit(true)} >
                    <img src={plus} />
                </ButtonHabits>
            </ContentHabits>
            <FormHabits
                formClose={() => setCreateHabit(false)}
                formOpen={createHabit}
                loadHabits={handleListHabits}
            />

            {confirmDeleteHabit && (
                <ConfirmOverlay>
                    <ConfirmContent>
                        <ConfirmTitle>Deseja realmente excluir este hábito?</ConfirmTitle>
                        <ButtonsConfirm>
                            <button onClick={() => handleConfirmDelete(confirmDeleteHabit)}>Excluir</button>
                            <button onClick={handleCancelDelete}>Cancelar</button>
                        </ButtonsConfirm>
                    </ConfirmContent>
                </ConfirmOverlay>
            )}

            {habits.length === 0 ? (
                <Legend>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Legend>
            ) : (
                habits.map((habit) => (
                    <ContainerEachHabit key={habit.id} data-test="habit-container">
                        <Habits>
                            <HabitName data-test="habit-name" >{habit.name}</HabitName>
                            <HabitDays>
                                {getSelectedDays(habit.days).map((day) => (
                                    <DayButton key={day.id} selected={day.selected} data-test="habit-day">{day.day}</DayButton>
                                ))}
                            </HabitDays>
                        </Habits>
                        <DeleteButton onClick={() => setConfirmDeleteHabit(habit.id)} data-test="habit-delete-btn">
                            <FaTrash />
                        </DeleteButton>
                    </ContainerEachHabit>
                ))
            )}



        </ContainerHabits>
    )
}

const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmContent = styled.div`
  position: relative;
  max-width: 400px;
  width: 90%;
  height: 150px;
  padding: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;


const ConfirmTitle = styled.p`
    margin-bottom: 50px;
    
`

const ButtonsConfirm = styled.div`
    display: flex;
    justify-content: flex-end;
 

    
    button:nth-child(1){
        background-color: #f55050;
        border: none;
        width: 60px;
        height: 25px;
        border-radius: 5px;
        font-weight: bold;
    }
    button:nth-child(2){
        margin-left: 25px;
        background-color: #e4dfdf;
        border: none;
        border-radius: 5px;
        width: 60px;
        height: 25px;
    }
`

const Habits = styled.div`
    display: flex;
    flex-direction: column;
`

const DeleteButton = styled.button`
  background-color: transparent;
  color: #f55050;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
`;
const ContainerEachHabit = styled.div`
    position: relative;
    width: 90%;
    height: 91px;

    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 18px;
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
