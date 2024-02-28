import React, { useState } from "react";
import CampaignForm from "./CampaignForm/campaignForm"
import CreateCampaignPage from "./CreateCampaign/createCampaignPage";
function Campaign() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '89%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 0
      }
      }
    >

      {!showForm && <CreateCampaignPage onClick={toggleForm} />}
      {showForm && <CampaignForm 
      setShowForm={setShowForm} />}
    </div>
  );
}

export default Campaign;
