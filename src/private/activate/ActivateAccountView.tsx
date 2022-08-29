import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from '../../components/common/Form';
import { Activate } from '../../utils/activate';
import { User } from '../../hooks/useUser';

interface Props {
  setUser: (value: User) => void;
}

interface FormValues {
  code: string;
}
export const ActivateAccountView = ({ setUser }: Props) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().length(6).required(),
    }),
    onSubmit: (values) => {
      const user = Activate(values.code);

      if (user) {
        const newUser = { ...user, active: true };
        setUser(newUser);
      }
    },
  });
  return (
    <>
      <h2>Activate Account</h2>

      <Form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label='2FA Code'
          margin='normal'
          type='number'
          name='code'
          id='code'
          onChange={formik.handleChange}
          value={formik.values.code}
          required
        />

        <Button color='primary' variant='contained' fullWidth type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
};
