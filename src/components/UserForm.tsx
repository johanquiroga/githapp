import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  withStyles,
  Layout,
  Input,
  Button,
  ThemedComponentProps,
  Text,
} from 'react-native-ui-kitten';
import { FormikProps } from 'formik';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import fecha from 'fecha';
import { InputComponent } from 'react-native-ui-kitten/ui/input/input.component';

// Constants
import { userForm, UserFormValues } from '../lib/forms';

// Helpers
import * as helpers from '../helpers';

type UserFormProps = ThemedComponentProps & FormikProps<UserFormValues>;

function UserForm({
  themedStyle,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
  isValid,
  isSubmitting,
  handleSubmit,
}: UserFormProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const usernameInputRef = React.useRef<InputComponent>(null);
  const nameInputRef = React.useRef<InputComponent>(null);
  const emailInputRef = React.useRef<InputComponent>(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleBirthdateConfirm = (date: Date) => {
    setFieldValue('birthdate', date);
    hideDatePicker();
  };

  return (
    <>
      {errors.submit && (
        <Layout style={themedStyle.errorAlert}>
          <Text appearance="alternative" style={themedStyle.centerText}>
            {errors.submit}
          </Text>
        </Layout>
      )}

      <Layout style={themedStyle.input}>
        <Input
          status={helpers.getInputStatus<UserFormValues>('id', { touched, errors })}
          value={values.id}
          onBlur={handleBlur('id')}
          onChangeText={handleChange('id')}
          label={userForm.labels.id}
          placeholder={userForm.placeholders.id}
          caption={touched.id && errors.id ? errors.id : ''}
          autoCapitalize="none"
          keyboardType="number-pad"
          onSubmitEditing={() => {
            if (usernameInputRef && usernameInputRef.current) {
              usernameInputRef.current.focus();
            }
          }}
          returnKeyType="done"
        />
      </Layout>

      <Layout style={themedStyle.input}>
        <Input
          ref={usernameInputRef}
          status={helpers.getInputStatus<UserFormValues>('username', { touched, errors })}
          value={values.username}
          onBlur={handleBlur('username')}
          onChangeText={handleChange('username')}
          label={userForm.labels.username}
          placeholder={userForm.placeholders.username}
          caption={touched.username && errors.username ? errors.username : ''}
          autoCapitalize="none"
          onSubmitEditing={() => {
            if (nameInputRef && nameInputRef.current) {
              nameInputRef.current.focus();
            }
          }}
          returnKeyType="next"
        />
      </Layout>

      <Layout style={themedStyle.input}>
        <Input
          ref={nameInputRef}
          status={helpers.getInputStatus<UserFormValues>('name', { touched, errors })}
          value={values.name}
          onBlur={handleBlur('name')}
          onChangeText={handleChange('name')}
          label={userForm.labels.name}
          placeholder={userForm.placeholders.name}
          caption={touched.name && errors.name ? errors.name : ''}
          autoCapitalize="words"
          onSubmitEditing={() => {
            if (emailInputRef && emailInputRef.current) {
              emailInputRef.current.focus();
            }
          }}
          returnKeyType="next"
        />
      </Layout>

      <Layout style={themedStyle.input}>
        <Input
          ref={emailInputRef}
          status={helpers.getInputStatus<UserFormValues>('email', { touched, errors })}
          value={values.email}
          onBlur={handleBlur('email')}
          onChangeText={handleChange('email')}
          label={userForm.labels.email}
          placeholder={userForm.placeholders.email}
          caption={touched.email && errors.email ? errors.email : ''}
          autoCapitalize="none"
          keyboardType="email-address"
          onSubmitEditing={showDatePicker}
          returnKeyType="next"
        />
      </Layout>

      <Layout style={themedStyle.input}>
        <Text appearance="hint" style={themedStyle.birthdatePickerLabel}>
          {userForm.labels.birthdate}
        </Text>
        <TouchableOpacity
          activeOpacity={1.0}
          style={themedStyle.birthdatePicker}
          onPress={showDatePicker}
        >
          <Text category="p1" style={themedStyle.birthdate}>
            {fecha.format(values.birthdate, 'DD/MM/YYYY')}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={values.birthdate}
          onConfirm={handleBirthdateConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
        />
      </Layout>

      <Button
        disabled={!isValid || isSubmitting}
        onPress={() => handleSubmit()}
        textStyle={themedStyle.uppercase}
      >
        Create
      </Button>
    </>
  );
}

export default withStyles(UserForm, theme => ({
  centerText: {
    textAlign: 'center',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  input: {
    paddingBottom: 20,
  },
  birthdatePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderColor: theme['color-basic-300'],
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: theme['color-basic-200'],
  },
  birthdatePickerLabel: {
    marginBottom: 4,
    color: theme['color-basic-600'],
  },
  birthdate: {
    color: theme['color-basic-600'],
  },
  errorAlert: {
    backgroundColor: theme['color-danger-500'],
    padding: 10,
    marginVertical: 10,
  },
}));
