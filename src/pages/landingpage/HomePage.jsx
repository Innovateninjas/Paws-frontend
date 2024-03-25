import Button from '../../Components/buttons/Bigbutton/bigButton';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Homepage.module.css";

function LandingPage() {
    const navigate = useNavigate();
    const csrftoken = localStorage.getItem('csrftoken');
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        if (csrftoken && userType === "ngo") {
            navigate('/dashboard');
        }
    }, [csrftoken, userType, navigate]);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <img src="./images/logo.jpg" alt=""></img>
                <p className={styles.main_text}>
                    "Save lives – report injured animals to authorities. Click below to notify and make a difference."
                </p>
            </div>
            <Link to="/report-incident">
                <Button text="Report" />
            </Link>
        </div>
    );
}

export default LandingPage;
