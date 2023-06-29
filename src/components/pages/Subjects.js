import { useDispatch } from "react-redux";

import {
    SUBJECT_URL,
    SUBJECT_FORM_FIELDS,
    SUBJECT_TABLE_BODY_KEY,
    SUBJECT_TABLE_HEADING,
    SUBJECT_FORM_KEY_LIST,
} from "../constants/subjectCostant";
import PageWrapper from "../HOC/PageWrapper";

import { clearTimeOffReducer } from "../redux/reducers/commonReducers";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useCallback, useEffect } from "react";
import {
    addData,
    deleteData,
    getData,
    updateData,
} from "../redux/actionThunk/apiThunk";
import { setSubjectReducer } from "../redux/reducers/subjectReducer";

const Subjects = () => {
    const dispatch = useDispatch();

    const axios = useAxiosPrivate();

    const selectorFunc = useCallback((state) => state.subject.subjectList, []);

    const formSubmitHandler = useCallback(
        (e, data) => {
            const filteredData = {
                name: e.target.name.value,
                code: e.target.code.value,
            };
            if (data) {
                filteredData["id"] = data.id;
                // update doc
                dispatch(
                    updateData(
                        axios,
                        SUBJECT_URL,
                        setSubjectReducer,
                        filteredData,
                        SUBJECT_FORM_KEY_LIST
                    )
                );
            } else {
                // create doc
                dispatch(
                    addData(
                        axios,
                        SUBJECT_URL,
                        setSubjectReducer,
                        filteredData,
                        SUBJECT_FORM_KEY_LIST
                    )
                );
            }
            dispatch(clearTimeOffReducer());
        },
        [axios, dispatch]
    );

    const deleteHandler = useCallback(
        (data) => {
            // delete doc
            dispatch(
                deleteData(axios, SUBJECT_URL, setSubjectReducer, data.id)
            );
        },
        [axios, dispatch]
    );

    useEffect(() => {
        dispatch(getData(axios, SUBJECT_URL, setSubjectReducer));
    }, [axios, dispatch]);

    return (
        <PageWrapper
            title={"Subjects"}
            selectorFunc={selectorFunc}
            tableHeadings={SUBJECT_TABLE_HEADING}
            tableBodykey={SUBJECT_TABLE_BODY_KEY}
            formFields={SUBJECT_FORM_FIELDS}
            formSubmitHandler={formSubmitHandler}
            deleteHandler={deleteHandler}
        />
    );
};

export default Subjects;
