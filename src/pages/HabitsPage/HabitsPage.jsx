import { ContainerHabits, ButtonHabits, TitleHabits, ContentHabits, Legend } from "../../components/Habits/HabitsStyled";
import  plus from "../../assets/plus.svg"
import FormHabits from "./FormHabits/FormHabits";
import { useState } from "react";

export default function HabitsPage(){
    const [createHabit, setCreateHabit] = useState(false)
    // const [ habit, setHabit ] = useState(null)

    return (
        <ContainerHabits>
            <ContentHabits>
                <TitleHabits>Meus hábitos</TitleHabits>
                <ButtonHabits onClick={() => setCreateHabit(true)}>
                    <img src={plus}/>
                </ButtonHabits>
            </ContentHabits>
            <FormHabits 
                formClose={() => setCreateHabit(false)}
                formOpen={createHabit}
            />

            <Legend>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Legend>
        </ContainerHabits>
    )
}
