import React from 'react';
import Styles from './Styles';
import { Form, Field } from 'react-final-form';

const CompensationForm = () => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async values => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };
  return (
    <Styles>
      <h1>Compensation calculator</h1>
      <Form
        validate={values => {
          const errors = {};
          if (!values.username) {
            errors.sex = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          if (!values.confirm) {
            errors.confirm = 'Required';
          } else if (values.confirm !== values.password) {
            errors.confirm = 'Must match';
          }
          return errors;
        }}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Sex:</label>
              <Field name="sex" component="select">
                <option />
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
            </div>
            <div>
              <label>Birth Date:</label>
              <Field name="birth_date" component="input" type="date" placeholder="Birth Date" />
            </div>
            <div>
              <label>Start Job:</label>
              <Field name="start_job" component="input" type="date" placeholder="Start Job Date" />
            </div>
            <div>
              <label>Salary:</label>
              <Field
                parse={value => value && parseInt(value)}
                initialValue={0}
                name="salary"
                component="input"
                type="number"
                placeholder="Salary"
              />
            </div>
            <div>
              <label>Article 14:</label>
              <Field initialValue={false} parse={value => value && value === 'true'} name="isArt14" component="select">
                <option value="false">No</option>
                <option value="true">Yes</option>
              </Field>
            </div>
            {values.isArt14 && (
              <div>
                <label>Article 14 Date:</label>
                <Field name="art_14" component="input" type="date" placeholder="Article 14" />
              </div>
            )}
            {values.isArt14 && (
              <div>
                <label>Article 14 %:</label>
                <Field name="prec_art" component="select">
                  <option />
                  <option value="50">50%</option>
                  <option value="72">72%</option>
                  <option value="100">100%</option>
                </Field>
              </div>
            )}
            <div>
              <label>prop_value:</label>
              <Field
                parse={value => value && parseInt(value)}
                initialValue={0}
                name="prop_value"
                component="input"
                type="number"
                placeholder="prop_value"
              />
            </div>
            <div>
              <label>Deposits:</label>
              <Field
                parse={value => value && parseInt(value)}
                initialValue={0}
                name="deposits"
                component="input"
                type="number"
                placeholder="deposits"
              />
            </div>
            <div>
              <label>Leaving date:</label>
              <Field name="leaving_date" component="input" type="date" placeholder="leaving_date" />
            </div>
            <div>
              <label>pay_prop</label>
              <Field
                parse={value => value && parseInt(value)}
                initialValue={0}
                name="pay_prop"
                component="input"
                type="number"
                placeholder="pay_prop"
              />
            </div>
            <div>
              <label>comp_check</label>
              <Field
                parse={value => value && parseInt(value)}
                name="comp_check"
                component="input"
                type="number"
                placeholder="comp_check"
              />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button type="button" onClick={form.reset} disabled={submitting || pristine}>
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Styles>
  );
};

export default CompensationForm;
