import { compose } from 'recompose';
import { withFormik } from 'formik';
import { withNavigation } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';

// Constants
import { forms, UserFormValues } from '../constants';

// Services
import * as GithappService from '../services';

// Components
import UserForm from '../components/UserForm';

type UserFormProps = NavigationStackScreenProps;

export default compose(
  withNavigation,
  withFormik<UserFormProps, UserFormValues>({
    mapPropsToValues: () => ({
      id: forms.user.initialValues.id,
      username: forms.user.initialValues.username,
      name: forms.user.initialValues.name,
      email: forms.user.initialValues.email,
      birthdate: forms.user.initialValues.birthdate,
    }),
    validateOnMount: true,
    validationSchema: forms.user.schema,
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
