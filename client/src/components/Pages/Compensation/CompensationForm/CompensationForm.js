import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { TextField, Checkboxes, Radios, Select, DatePicker } from 'mui-rff';
import { Typography, Paper, Grid, Button, MenuItem, InputAdornment } from '@material-ui/core';
import CompensationCalc from './CompensationCalc/CompensationCalc';
import './CompensationForm.css';
// Picker

const currencies = [
  {
    value: 'NIS',
    label: '₪',
  },
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const validate = values => {
  const errors = {};
  if (!values.sex) {
    errors.sex = 'Required';
  }
  if (!values.birthDate) {
    errors.birthDate = 'Required';
  }
  if (!values.startJobDate) {
    errors.startJobDate = 'Required';
  }
  if (!values.salary) {
    errors.salary = 'Required';
  }
  if (values.propValue !== '0' && !values.propValue) {
    errors.propValue = 'Required';
  }
  if (values.deposits !== '0' && !values.deposits) {
    errors.deposits = 'Required';
  }
  if (values.payProp !== '0' && !values.payProp) {
    errors.payProp = 'Required';
  }
  if (values.compCheck !== '0' && !values.compCheck) {
    errors.compCheck = 'Required';
  }
  if (!values.birthDate) {
    errors.birthDate = 'Required';
  }
  if (!values.currency) {
    errors.currency = 'Required';
  }
  if (values.isArt14 && !values.art14Percent) {
    errors.art14Percent = 'Required';
  }
  if (values.isArt14 && !values.art14StartingDate) {
    errors.art14StartingDate = 'Required';
  }
  if (values.propValue && values.propValue < 0) {
    errors.propValue = 'Must be real Number';
  }
  if (values.deposits && values.deposits < 0) {
    errors.depositS = 'Must be real Number';
  }
  if (values.payProp && values.payProp < 0) {
    errors.payProp = 'Must be real Number';
  }
  if (values.compCheck && values.compCheck < 0) {
    errors.compCheck = 'Must be real Number';
  }
  if (values.salary && values.salary < 0) {
    errors.salary = 'Must be real Number';
  }

  return errors;
};

const CompensationForm = () => {
  const [formValues, setsFormValues] = useState(null);

  const onSubmit = async values => {
    setsFormValues(values);
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Compensation calculator 💵
      </Typography>
      <Typography paragraph>
        The compensation calculator will calculate the value of the employee's compensation according to the following
        criteria: gender, age, salary, years of seniority, deposit, etc...
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{ isArt14: false, currency: 'NIS', payProp: '0', deposits: '0', compCheck: '0', propValue: '0' }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2} justify="center">
                <Grid item xs={12}>
                  <Select
                    name="sex"
                    label="Gender 👨‍🦱 👩‍🦰"
                    formControlProps={{ margin: 'none' }}
                    required={true}
                    variant="outlined"
                    helperText={!values.sex ? 'Please select your gender.' : ''}
                  >
                    <MenuItem value="M">Male 👨‍🦱</MenuItem>
                    <MenuItem value="F">Female 👩‍🦰</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    name="currency"
                    label="Currency"
                    variant="outlined"
                    disabled
                    helperText={'this option will be available soon.'}
                  >
                    {currencies.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="birthDate"
                    label="Birth Date 🎈"
                    variant="outlined"
                    required={true}
                    type="date"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="startJobDate"
                    label="Start Job"
                    variant="outlined"
                    required={true}
                    type="date"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="leavingDate"
                    label="Leaving Date"
                    variant="outlined"
                    type="date"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Salary"
                    name="salary"
                    required={true}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{values.currency ? values.currency : null}</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Checkboxes name="isArt14" data={{ label: 'Article14', value: true }} />
                </Grid>

                {values.isArt14 && (
                  <Grid item xs={12}>
                    <Radios
                      label="Article 14 %"
                      name="art14Percent"
                      radioGroupProps={{ row: true }}
                      data={[
                        { label: '100%', value: '100' },
                        { label: '72%', value: '72' },
                        { label: '50%', value: '50' },
                      ]}
                    />
                  </Grid>
                )}
                {values.isArt14 && (
                  <Grid item xs={12}>
                    <TextField
                      name="art14StartingDate"
                      label="Article 14 Startin Date"
                      type="date"
                      variant="outlined"
                      required={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">{values.currency ? values.currency : null}</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}
                <Grid item xs={6}>
                  <TextField
                    name="propValue"
                    label="propValue"
                    type="number"
                    variant="outlined"
                    required={true}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{values.currency ? values.currency : null}</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="deposits"
                    label="Deposits"
                    type="number"
                    variant="outlined"
                    required={true}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{values.currency ? values.currency : null}</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="payProp"
                    label="payProp"
                    type="number"
                    variant="outlined"
                    required={true}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{values.currency ? values.currency : null}</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="compCheck"
                    label="compCheck"
                    type="number"
                    variant="outlined"
                    required={true}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{values.currency ? values.currency : null}</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button type="button" variant="contained" onClick={form.reset} disabled={submitting || pristine}>
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
      {formValues && <CompensationCalc formValues={formValues} />}
    </div>
  );
};

export default CompensationForm;
