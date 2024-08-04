import React, { useState } from "react";
import CampaignForm from "./CampaignForm/campaignForm"
import CreateCampaignPage from "./createCampaignPage";
function Campaign() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {!showForm && <CreateCampaignPage onClick={toggleForm} />}
      {showForm && <CampaignForm 
      setShowForm={setShowForm} />}
    </div>
  );
}

export default Campaign;
