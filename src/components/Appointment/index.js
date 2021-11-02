/*eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  // console.log("$$$$$$$", props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true))
  }

  const deleteConfirm = () => {
    transition(CONFIRM);
  }

  const deleteApp = () => {
    transition(DELETE, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true))
  }

  const editApp = () => {
    transition(EDIT)
  }

  return (
    <article className="appointment">
      <>
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message={"Saving"} />}
        {mode === DELETE && <Status message={"Deleting"} />}
        {mode === CONFIRM &&
          <Confirm
            message={"Are you sure you would like to delete?"}
            onCancel={back}
            onConfirm={deleteApp}
          />
        }
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            id={props.id} //pass interview id to show component
            onDelete={deleteConfirm}
            onEdit={editApp}
          />
        )}
        {mode === CREATE &&
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        }
        {mode === EDIT &&
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        }
        {mode === ERROR_SAVE &&
          <Error
            message={"Could not save appointment"}
            onClose={back} // need to replace=true
          />
        }
        {mode === ERROR_DELETE && <Error
          message={"Could not delete appointment"}
          onClose={back}
        />
        }
      </>
    </article>
  );
}