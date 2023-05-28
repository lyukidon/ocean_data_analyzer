/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";
import { FaBars, FaInfoCircle } from "react-icons/fa";

import { toggleType } from "../../../App";

interface Props {
    toggle: toggleType;
    setToggle: Dispatch<SetStateAction<toggleType>>;
    handleToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TopMenu: React.FC<Props> = ({ toggle, setToggle, handleToggle }: Props) => {
    const container = css`
        display: flex;
        @media (min-width: 767px) {
            flex-direction: ${toggle.optionContainer ? "row" : "column"};
            justify-content: ${toggle.optionContainer ? "space-between" : "baseline"};
        }
        @media (max-width: 767px) {
            flex-direction: row;
            justify-content: space-between;
        }
        > button {
            background-color: #686868;
            color: #fff;
            border: none;
            padding: 5px 8px;
            margin: 5px;
            font-size: 19px;
        }
    `;

    return (
        <div css={container}>
            <button data-action="optionContainer" onClick={handleToggle}>
                <FaBars />
            </button>
            <button data-action="informationContainer" onClick={handleToggle}>
                <FaInfoCircle />
            </button>
        </div>
    );
};

export default TopMenu;
