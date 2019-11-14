import * as Yup from 'yup';

export const PREFIX = 'githapp';

export const PER_PAGE = 5;

/**
 * @see https://github.com/shinnn/github-username-regex
 */
export const GITHUB_USERNAME_PATTERN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/;

export const forms = {
  user: {
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
        ),
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
  },
};

export type UserFormValues = Yup.InferType<typeof forms.user.schema> & {
  submit?: string;
};
