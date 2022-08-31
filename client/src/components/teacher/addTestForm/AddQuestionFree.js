import React, {useCallback, useState} from 'react';
import {Button, Form} from "react-bootstrap";

const AddQuestionFree = ({number, changeHandler}) => {
    const type = "free"
      return (
            <div>
                <Form.Label className={"testLabel"}>Питання {number}</Form.Label>
                <Form.Control className={"formControl"}
                              name={`Q${number}`}
                              // type={"text"}
                              placeholder={`Введіть питання (${number})`}
                              onChange={()=>changeHandler(event,number, type)}
                />

            </div>

    );
};

export default AddQuestionFree;