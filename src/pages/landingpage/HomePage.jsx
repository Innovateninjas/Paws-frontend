import Button from '../../Components/buttons/Bigbutton/bigButton';
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

function LandingPage() {



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
