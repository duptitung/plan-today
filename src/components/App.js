import React, { useState, useEffect } from "react";
import Header from "./Header";
import TextBox from "./TextBox";
import Info from "./info/Info";
import MobileInfo from "./info/MobileInfo";
import Content from "./info/Content";

const checkIfToday = date => {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};
const App = () => {
  const [plans, setPlans] = useState({});
  const [date, setDate] = useState(new Date());
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const plans = JSON.parse(localStorage.getItem("plans"));
    setPlans(plans || {});
  }, []);

  const saveDate = date => {
    setDate(date);
  };

  const getPlan = date => {
    const planId = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;

    const planTemplate = {
      id: planId,
      date: date,
      content: "",
      editable: checkIfToday(date)
    };

    return { ...planTemplate, ...plans[planId] };
  };

  const savePlans = plan => {
    delete plan.editable;
    const updatedPlans = { ...plans, [plan.id]: plan };
    setPlans(updatedPlans);
    localStorage.setItem("plans", JSON.stringify(updatedPlans));
  };

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <>
      <div className="app-container">
        <Header date={date} onChange={saveDate} />
        <TextBox plan={getPlan(date)} onChange={savePlans} />
      </div>
      <Info />
      <MobileInfo handleShowInfo={handleShowInfo} />
      {showInfo && <Content handleShowInfo={handleShowInfo} classList="info-popup"/>}
    </>
  );
};

export default App;
