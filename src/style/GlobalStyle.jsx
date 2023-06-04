import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body, html {
  width: 100%;
  height: 100%;

  font-family: 'Lexend Deca', sans-serif;
}

.root {
  width: 100%;
  height: 100%;
}

.react-calendar__tile--now,
.react-calendar__tile--now>abbr {
  background: #ffff76 !important;
}

button.react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--neighboringMonth.success>abbr {
  background-color: #8CC654;

  padding: 10px 11px;

  color: #757575;

  border-radius: 50px;
}

button.react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--neighboringMonth.failure>abbr {
  background-color: #E65666;

  padding: 10px 11px;

  color: #757575;

  border-radius: 50px;
}

button.success > abbr {
    background-color: #8CC654;
    padding: 6px;
    color: #000000;
    border-radius: 50%;
  }

  button.failure > abbr {
    background-color: #E65666;
    padding: 6px;
    color: #000000;
    border-radius: 50%;

  }

.react-calendar__viewContainer,
.react-calendar__year-view,
.react-calendar__decade-view,
.react-calendar__month-view,
.react-calendar__century-view,
.react-calendar__month-view>div,
.react-calendar__month-view>div>div {
  height: 100%;
}

.react-calendar__year-view__months,
.react-calendar__decade-view__years,
.react-calendar__century-view__decades {
  height: 84%;
}

.react-calendar__month-view__days {
  height: 76%;
}

.weekend {
    color: #ff0000;
  }

  .react-calendar__navigation {
    margin-bottom: 20px;
    display: flex;
    margin-top: 10px;
    
  }

  .react-calendar__navigation button {
    background-color: #ffffff;
    color: #333333;
    font-weight: bold;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  .react-calendar__navigation button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .react-calendar__navigation button:hover {
    background-color: #e0e0e0;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 8px;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 6px;
  }


  .react-calendar__month-view__days {
    background-color: #ffffff;
    /* display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px; */
  }

  .react-calendar__tile {
    background-color: #ffffff;
    border: none;
    padding: 12px;
    margin-bottom: 15px;
    margin-top: 15px;
    cursor: pointer;
  }

  .react-calendar__tile:hover {
    /* background-color: #e0e0e0; */
  }

  .react-calendar__tile--active,
  .react-calendar__tile--active:hover {
    /* background-color: #8fc549; */
    color: #ffffff;
  }

  .react-calendar__tile--now {
    background-color: #f3f37d;
    color: #333333;
  }

`



export default GlobalStyle