import { get } from 'lodash';
import { FormikState } from 'formik';

function getInputStatus<V>(inputKey: keyof V | string, formik: Partial<FormikState<V>>) {
  if (!get(formik.touched, inputKey)) {
    return undefined;
  }

  if (get(formik.touched, inputKey) && get(formik.errors, inputKey)) {
    return 'danger';
  }
  return 'success';
}

export { getInputStatus };
