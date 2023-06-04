import styled from "styled-components";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import apis from "../../utils/constants/apis";
import useAuth from "../../hooks/auth";
import { useEffect } from "react";
import HabitsDetails from "./HabitsDetails/HabitsDetails";

dayjs.locale('pt-br');

export default function Historic() {
  const { userAuth } = useAuth()
  const [historic, setHistoric] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedHabits, setSelectedHabits] = useState([]);

  const currentDate = dayjs();
  const [value, onChange] = useState(new Date());


  const isWeekend = (date) => {
    const day = dayjs(date).day(); // Obtém o índice do dia da semana (0 = domingo, 1 = segunda-feira, ...)
    return day === 0 || day === 6; // Retorna true se for domingo (0) ou sábado (6)
  };


  useEffect(() => {
    handleListHabitsHistoric();
    handleListHabitsToday();
  }, []);

  function handleListHabitsHistoric() {
    apis.getHistory(userAuth?.token)
      .then(res => {
        console.log(res.data)
        setHistoric(res.data)
      })
      .catch(error => {
        console.log(error.response);
      })
  }


  function handleListHabitsToday() {
    apis.lisHabitsToday(userAuth?.token)
      .then(res => {
        const habitsDoneApi = res.data.filter(habit => habit.done)
        updateProgress(habitsDoneApi.length, res.data.length);
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  if (historic === null) {
    return <h1>Carregando...</h1>
  }


  function completedHabits(habits) {
    return habits.filter(habit => habit.done).length !== 0;
  }

  console.log(historic?.filter(day => completedHabits(day.habits)))

  const successDays = historic?.filter(day => completedHabits(day.habits)) ?? [];
  const failureDays = historic?.filter(day => !successDays.includes(day)) ?? [];


  function correctClass({ date }) {
    const formattedDate = dayjs(date).format("DD/MM/YYYY");

    if (failureDays.find(x => x.day === formattedDate)) {
      return 'failure'
    }

    if (successDays.find(x => x.day === formattedDate)) {
      return 'success'
    }

    if (isWeekend(date)) {
      return "weekend";
    }
  }



  function dayHandle(date) {
    const clickedDate = dayjs(date).format("DD/MM/YYYY");
    const failureDay = failureDays.find(x => x.day === clickedDate) ?? [];
    const successDay = successDays.find(x => x.day === clickedDate) ?? [];


    if (failureDay && failureDay.habits !== undefined) {
      // alert(alertHabits(failureDay.habits))
      setSelectedHabits(failureDay.habits);
      setShowDetails(true);
    }

    if (successDay && successDay.habits !== undefined) {
      // alert(alertHabits(successDay.habits))
      setSelectedHabits(successDay.habits);
      setShowDetails(true);
    }
  }

  function alertHabits(habits) {
    return habits.map(habit => (
      `* ${habit.name}: ${habit.done ? 'Concluído' : 'Não concluído'}\n`
    )).join('');
  }


  return (
    <ContainerHistoric>
      <ContentHistoric>
        <TitleHabits>Histórico</TitleHabits>

      </ContentHistoric>
      <CalendarHistoric data-test="calendar">
        <StyledCalendar
          onChange={onChange}
          value={value}
          locale="pt-BR"
          tileClassName={correctClass}
          formatDay={(_, date) => dayjs(date).format('DD')}
          onClickDay={(date) => dayHandle(date)}
        />
      </CalendarHistoric>
      {showDetails && (
      <HabitsDetails habits={selectedHabits} onClose={() => setShowDetails(false)} />
    )}
    </ContainerHistoric>
  )
}

const ContainerHistoric = styled.div`
    flex: 1;
    background-color: #F2F2F2;
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
    padding-top: 90px;
    padding-bottom: 120px;
`

const Legend = styled.p`
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 28px;
    color: #666666;
    margin-top: 17px;
`

export const ContentHistoric = styled.div`
    width: 90%;
    padding: 0 17px;
    margin-bottom: 10px;

`

export const TitleHabits = styled.h1`
    font-size: 23px;
    line-height: 29px;
    color: #126BA5;
`

const CalendarHistoric = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledCalendar = styled(Calendar)`
  width: 335px;
  min-height: 400px;
  border-radius: 10px;
  max-width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  font-family: Arial, sans-serif;

`;