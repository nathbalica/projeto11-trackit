import styled from "styled-components";
import check from "../../../assets/check.svg"
import useAuth from "../../../hooks/auth";
import apis from "../../../utils/constants/apis";

export default function HabitsToday({ id,
    name,
    done,
    currentSequence,
    highestSequence,
    handleListHabitsToday 
}) {

    const { userAuth } = useAuth();
    const currentSequenceIsHighest = currentSequence > 0 && currentSequence === highestSequence;

    function toggleHabitDone() {
          if (done) {
            apis
              .checkDisable(id, userAuth?.token)
              .then((res) => {
                console.log("Habit unmarked:", res.data);
              })
              .catch((error) => {
                console.log("Error unmarking habit:", error.response);
              })
              .finally(() => {
                handleListHabitsToday(); // Refresh the habit list
              });
          } else {
            apis
              .checkEnable(id, userAuth?.token)
              .then((res) => {
                console.log("Habit marked as done:", res.data);
              })
              .catch((error) => {
                console.log("Error marking habit as done:", error.response);
              })
              .finally(() => {
                handleListHabitsToday(); // Refresh the habit list
              });
          }
      }

      function formatDaysString(days) {
        if (days === 1) {
          return "dia";
        } else {
          return "dias";
        }
      }
      
    
    return (
        <Habits data-test="today-habit-container">
            <HabitsSequence>
                <TitleSequence data-test="today-habit-name">{name}</TitleSequence>
                <SubtitleSequence  data-test="today-habit-sequence">Sequência atual:
                    <CurrentSequence done={done}>
                        {currentSequence} {formatDaysString(currentSequence)}
                    </CurrentSequence>
                </SubtitleSequence>
                <SubtitleSequence data-test="today-habit-record">Seu recorde:
                    <HighestSequence currentSequenceIsHighest={currentSequenceIsHighest}>
                        {highestSequence} {formatDaysString(highestSequence)}
                    </HighestSequence>

                </SubtitleSequence>
            </HabitsSequence>
            <HabitsTodayCheck data-test="today-habit-check-btn" done={done} onClick={toggleHabitDone}>
                <img src={check} alt="check.svg" />
            </HabitsTodayCheck>
        </Habits>
    )
}

const Habits = styled.div`
    width: 90%;
    min-height: 94px;

    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 18px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
`

const HabitsSequence = styled.div`
    color: #666666;
    font-style: normal;
    font-weight: 400;
    flex-wrap: wrap;
`

const TitleSequence = styled.h1`
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 10px;
`
const SubtitleSequence = styled.p`
    font-size: 13px;
    line-height: 16px;

`

const CurrentSequence = styled.span`
     margin-left: 6px;
    color: ${(props) => props.done ? "#8FC549" : "#666666"};
`

const HighestSequence = styled.span`
    margin-left: 6px;
    color: ${(props) => props.currentSequenceIsHighest ? "#8FC549" : "#666666"};
`
const HabitsTodayCheck = styled.div`
    width: 69px;
    height: 69px;
    background: ${(props) => (props.done ? "#8FC549" : "#EBEBEB")};
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${(props) => (props.isMarked ? "auto" : "pointer")};
    
    /* img {
      display: ${(props) => (props.isMarked ? "block" : "none")};
    } */
        
`