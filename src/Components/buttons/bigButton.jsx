import styles from "./bigButton.module.css";

const Button = ({  icon, text, ...rest }) => {
    return (
        <button {...rest} className={styles.big_btn}>

            {icon} 
            {/* if you pass icon pass it with font size which will determin the size of the icon example icon={<HiMail fontSize={24} /> (here i have used reacticons folder first import it ) */}
            {text}
        </button>
    );
};

export default Button;
