import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";
import styles from "./select.module.css";

const OPTIONS = ["Cat", "Dog", "Cattle", "Bird", "Snake", "Rabbit", "Horse"];

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    console.log("Selected Options:", selectedOptions); // Log the selected options
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownHeader onClick={toggleDropdown}>
        <span className={styles.dropDown}>
          <p>Supported animals...</p>
          <p>
            <IoMdArrowDropdown fontSize="24px" />
          </p>
        </span>
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {OPTIONS.map((option, index) => (
            <DropdownItem
              key={index}
              onClick={() => toggleOption(option)}
              selected={selectedOptions.includes(option)}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  align-self: start;
  width: 200px;
`;

const DropdownHeader = styled.div`
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  width: 300px;
  border: 1px solid #b6b5b5;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
  }
  ${({ selected }) => selected && "background-color: #dedede;"}
`;

export default Dropdown;
