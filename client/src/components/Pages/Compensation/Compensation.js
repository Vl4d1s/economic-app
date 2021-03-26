/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import Styles from './Styles';
import { Form, Field } from 'react-final-form';

const Page1 = () => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async values => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <Styles>
      <h1>React Final Form - Simple Example</h1>
      <Form
        onSubmit={onSubmit}
        initialValues={{ stooge: 'larry', employed: true }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Sex:</label>
              <Field name="favoriteColor" component="select">
                <option />
                <option value="#ff0000">Male</option>
                <option value="#00ff00">Female</option>
              </Field>
            </div>
            <div>
              <label>Birth Date:</label>
              <Field name="firstName" component="input" type="text" placeholder="Birth Date" />
            </div>
            <div>
              <label>Start Job:</label>
              <Field name="lastName" component="input" type="text" placeholder="Start Job" />
            </div>
            <div>
              <label>Salary:</label>
              <Field name="lastName" component="input" type="text" placeholder="Salary" />
            </div>
            <div>
              <label>Article 14:</label>
              <Field name="lastName" component="input" type="text" placeholder="Article 14" />
            </div>
            <div>
              <label>Article 14 %:</label>
              <Field name="firstName" component="input" type="text" placeholder="Article 14 %" />
            </div>
            <div>
              <label>prop_value</label>
              <Field name="firstName" component="input" type="text" placeholder="prop_value" />
            </div>
            <div>
              <label>deposits</label>
              <Field name="firstName" component="input" type="text" placeholder="deposits" />
            </div>
            <div>
              <label>leaving_date</label>
              <Field name="firstName" component="input" type="text" placeholder="leaving_date" />
            </div>
            <div>
              <label>pay_prop</label>
              <Field name="firstName" component="input" type="text" placeholder="pay_prop" />
            </div>
            <div>
              <label>comp_check</label>
              <Field name="firstName" component="input" type="text" placeholder="comp_check" />
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Styles>
  );
};

export default Page1;
