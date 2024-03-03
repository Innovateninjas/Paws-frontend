// Card.jsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { handleStatusChange } from '../../../Components/utils/Functions/statusUpdater';
import styles from './Card.module.css';

const CardItem = ({ report, index, statusOptions, toggleExpand, setReports }) => {
  return (
    <Card
      key={report.id}
      className={`${styles.card} ${report.expanded ? styles.expanded : ''}`}
      style={{ // Apply inline styles for customization
        position: 'relative',
        backgroundColor: '#F0F0F0', // Change background color
        borderRadius: '15px', // Adjust border radius 
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
        marginBottom: '20px', // Add some space between cards
        cursor: 'pointer', // Change cursor on hover
        opacity: '0.9',
        transition: 'transform 0.3s', // Add transition effect
        '&:hover': { // Apply styles on hover
          boxShadow: '10px 10px 10px solid black', // Adjust box shadow on hover
        },
      }}
    >
      <CardContent >
        <img src={report.image} alt={report.description} className={styles.incidentImage} />
        <Typography gutterBottom variant="h5" component="div">
          <span style={{
            display: "inline-block",
            fontWeight: "semiBold",
            fontSize: window.innerWidth <= 768 ? "20px" : "30px",
            textAlign: "center"
          }}>Animal Type:</span>
          <span style={{
            display: "inline-block",
            fontSize: "20px"
          }}>
            {report.animal_type}
          </span>
        </Typography>

        <Typography
          variant="body1"
          color="text.primary"
          style={{
            fontSize: window.innerWidth <= 768 ? '14px' : '20px',
          }}>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${report.latitude},${report.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'blue' }} >
            <b>Click here to get directions</b>
          </a>
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          style={{
            fontSize: window.innerWidth <= 768 ? '14px' : '20px'
          }}>
          Landmark : {report.landmark}
        </Typography>

        {report.expanded && (
          <>
            <Typography
              variant="body1"
              color="text.primary"
              style={{
                fontSize: window.innerWidth <= 768 ? '14px' : '20px'
              }}>
              Description :  {report.description}
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              style={{
                fontSize: window.innerWidth <= 768 ? '14px' : '20px',
              }}>
              Condition : {report.condition}
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              style={{
                fontSize: window.innerWidth <= 768 ? '14px' : '20px'
              }}>
              Name : {report.user_name}
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              style={{
                fontSize: window.innerWidth <= 768 ? '14px' : '20px'
              }}>
              Phone Number : {report.user_phone}
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              style={{
                fontSize: window.innerWidth <= 768 ? '14px' : '20px'
              }}>
              Email : {report.user_email}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              style={{
                fontSize: window.innerWidth <= 768 ? '14px' : '20px'
              }}>
              Reported At : {report.reported_time}
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              style={{
                fontSize: window.innerWidth <= 768 ? '14px' : '20px', paddingLeft: '0px'
              }}>
              Status:
              <select
                value={report.status || ''}
                onChange={(e) => handleStatusChange(report.id, e.target.value, setReports)}
                className={styles.select}
              >
                <option value="" disabled>
                  Select Status
                </option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Typography>
          </>
        )}
      </CardContent>
      <div className={styles.expandIcon} >
        <ExpandMoreIcon
          onClick={() => toggleExpand(index)}
          className={styles.expandIcon}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px'
          }} />
      </div>
    </Card>
  );
};

export default CardItem;
