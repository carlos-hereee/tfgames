import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";

const GameInvitation = () => {
  const history = useHistory();
  return (
    <Formik
      initialValues={{ inviteCode: null }}
      onSubmit={(values, actions) => {
        history.push(`/tictactoe/invite?code=${values.inviteCode}`);
        actions.resetForm();
      }}>
      <Form>
        <label for="inviteCode"> Code:</label>
        <Field type="number" name="inviteCode" />
        <button type="submit" className="btn btn-secondary">
          Join Game
        </button>
      </Form>
    </Formik>
  );
};
export default GameInvitation;
