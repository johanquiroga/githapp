import { compose } from 'recompose';
import { withFormik } from 'formik';
import { withNavigation } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';

// Constants
import { userForm, UserFormValues } from '../lib/forms';

// Services
import * as GithappService from '../services';

// Components
import UserForm from '../components/UserForm';

type UserFormProps = NavigationStackScreenProps;

export default compose(
  withNavigation,
  withFormik<UserFormProps, UserFormValues>({
    mapPropsToValues: () => ({
      id: userForm.initialValues.id,
      username: userForm.initialValues.username,
      name: userForm.initialValues.name,
      email: userForm.initialValues.email,
      birthdate: userForm.initialValues.birthdate,
    }),
    validateOnMount: true,
    validationSchema: userForm.schema,
    handleSubmit: async (values, { setSubmitting, setFieldError, props }) => {
      const result = await GithappService.createUser(values);
      setSubmitting(false);

      if (result.success) {
        return props.navigation.replace('User', {
          userId: (result.data && result.data.userId) || null,
        });
      }

      // ? Show the errors for the requests that failed
      return setFieldError('submit', `There were some errors: \n ${result.error.message}`);
    },
  }),
)(UserForm);
