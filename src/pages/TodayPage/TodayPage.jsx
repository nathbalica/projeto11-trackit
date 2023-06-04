import { Container, Content, Title, Subtitle } from "../../components/TodayStyled";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import useAuth from "../../hooks/auth";
import apis from "../../utils/constants/apis";
import { useState, useEffect } from "react";
import useProgress from "../../hooks/progress";
import HabitsToday from "./HabitsToday/HabitsToday";


export default function TodayPage(){
    const [habitsToday, setHabitsToday] = useState(null)
    const [doneHabits, setDoneHabits] = useState(0);

    const currentDate = dayjs();
    const formattedDate = currentDate.locale('pt-br').format('dddd, DD/MM');
    const { userAuth } = useAuth();
    const { progress, updateProgress } = useProgress();

    

    function handleListHabitsToday(){
        apis.lisHabitsToday(userAuth?.token)
        .then(res => {
            setHabitsToday(res.data)
            console.log(res.data)
            const habitsDoneApi = res.data.filter(habit => habit.done)
            updateProgress(habitsDoneApi.length, res.data.length);

            setDoneHabits(habitsDoneApi.length);
        })
        .catch(error => {
            console.log(error.response);
        })
    }

    useEffect(() => {
        handleListHabitsToday();
    }, []);

    if (habitsToday === null) {
        return <h1>Carregando...</h1>;
      }

    return (
        <Container>
            <Content>
                <Title data-test="today">{formattedDate}</Title>
                <Subtitle data-test="today-counter" >
                    {
                        doneHabits === 0
                        ? "Nenhum hábito concluído ainda"
                        : `${progress.toFixed(0)}% dos hábitos concluídos`
                    }  
                </Subtitle>
            </Content>

            {habitsToday && habitsToday.map(habit => (
                <HabitsToday key={habit.id} {...habit} handleListHabitsToday={handleListHabitsToday}/>
            ))}
        </Container>
    )
}

