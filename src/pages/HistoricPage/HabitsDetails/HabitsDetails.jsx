import React from 'react';
import styled from 'styled-components';

export default function HabitsDetails({ habits, onClose }) {
  return (
    <Overlay>
      <DetailsContainer>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
        <HabitsList>
          {habits.map(habit => (
            <HabitItem key={habit.id}>
              <HabitName>{habit.name}</HabitName>
              <HabitStatus>{habit.done ? 'Concluído' : 'Não concluído'}</HabitStatus>
            </HabitItem>
          ))}
        </HabitsList>
      </DetailsContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const DetailsContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  max-width: 90%;
  max-height: 90%;
  min-height: 25%;
  overflow: auto;
  position: relative;
`;

const CloseButton = styled.button`
   position: absolute;
   bottom: 0;
   right: 20px;
  background-color: #52B6FF;
  border: 2px solid #126BA5;;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const HabitsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const HabitItem = styled.li`
  margin-bottom: 10px;
`;

const HabitName = styled.span`
  font-weight: bold;
`;

const HabitStatus = styled.span`
  margin-left: 10px;
`;

