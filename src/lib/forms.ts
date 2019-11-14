import * as Yup from 'yup';

import { GITHUB_USERNAME_PATTERN } from '../constants';

import * as GithappService from '../services';

export const userForm = {
  initialValues: {
    id: __DEV__ ? '1234567890' : '',
    username: __DEV__ ? 'johanquiroga' : '',
    name: __DEV__ ? 'Johan Quiroga' : '',
    email: __DEV__ ? 'johan.c.quiroga@gmail.com' : '',
    birthdate: __DEV__ ? new Date('01/01/1990') : new Date(),
  },
  labels: {
    id: 'ID',
    username: 'Github Username',
    name: 'Full Name',
    email: 'Email Address',
    birthdate: 'Birth Date',
  },
  placeholders: {
    id: '1234567890',
    username: 'john.smith',
    name: 'John Smith',
    email: 'myemail@email.com',
    birthdate: 'DD/MM/YYYY',
  },
  schema: Yup.object({
    id: Yup.string()
      .required()
      .trim()
      .lowercase()
      .matches(/^\d{10}$/, 'ID may only contain 10 numeric characters'),
    username: Yup.string()
      .required()
      .trim()
      .lowercase()
      .matches(
        GITHUB_USERNAME_PATTERN,
        'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.',
      )
      .test('exists', 'The username does not exist', async function(val) {
        try {
          const response = await GithappService.checkUsername(val);

          if (!response.success) {
            return this.createError({
              message:
                response.error.message ||
                'Internal Error. Please check your connection and try again.',
            });
          }

          if (response.data) {
            return response.data.exists;
          }
          return false;
        } catch (e) {
          return this.createError({ message: e.message || 'Internal Error' });
        }
      }),
    name: Yup.string()
      .required()
      .trim()
      .lowercase(),
    email: Yup.string()
      .required()
      .trim()
      .lowercase()
      .email(),
    birthdate: Yup.date().max(new Date()),
  }),
};

export type UserFormValues = Yup.InferType<typeof userForm.schema> & {
  submit?: string;
};
