import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";

const GameInvitation = () => {
  const history = useHistory();
  return (
    <Formik
      initialValues={{ inviteCode: "" }}
      onSubmit={(values, actions) => {
        history.push(`/tictactoe/invite?code=${values.inviteCode}`);
        actions.resetForm();
      }}>
      <Form>
        <div className="form-group">
          <label htmlFor="inviteCode"> Code:</label>
          <div className="input-group">
            <Field type="number" name="inviteCode" className="form-control" />
            <button
              type="submit"
              className="input-group-prepend btn btn-secondary">
              Join Game
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
export default GameInvitation;
