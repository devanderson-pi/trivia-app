import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema {
    integer(): yup.StringSchema;
  }
}
