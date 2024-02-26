import styles from "./bigButton.module.css";

const Button = ({  text, ...rest }) => {
    return (
        <button {...rest} className={styles.big_btn}>
            {text}
        </button>
    );
};

export default Button;
