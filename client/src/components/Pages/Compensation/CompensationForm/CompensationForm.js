import React from 'react';
import { Form } from 'react-final-form';
import { TextField, Checkboxes, Radios, Select, DatePicker } from 'mui-rff';
import { Typography, Paper, Grid, Button, CssBaseline, MenuItem } from '@material-ui/core';
// Picker
import DateFnsUtils from '@date-io/date-fns';

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
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
  if (!values.birthDate) {
    errors.birthDate = 'Required';
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
  if (values.deposit && values.deposit < 0) {
    errors.deposit = 'Must be real Number';
  }
  if (values.payProp && values.payProp < 0) {
    errors.payProp = 'Must be real Number';
  }
  if (values.compCheck && values.compCheck < 0) {
    errors.compCheck = 'Must be real Number';
  }
  if (values.salary && values.salary < 0) {
    errors.compCheck = 'Must be real Number';
  }

  return errors;
};

const NewForm = () => {
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
        initialValues={{ isArt14: false, compCheck: 0, deposits: 0, propValue: 0, payProp: 0 }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2} justify="center">
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    margin="none"
                    required={true}
                    type="text"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    margin="none"
                    required={true}
                    type="text"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    name="sex"
                    label="Sex 👨‍🦱 👩‍🦰"
                    formControlProps={{ margin: 'none' }}
                    required={true}
                    variant="outlined"
                  >
                    <MenuItem value="M">Male 👨‍🦱</MenuItem>
                    <MenuItem value="F">Female 👩‍🦰</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    name="birthDate"
                    margin="normal"
                    label="Birth Date 🎈"
                    dateFunsUtils={DateFnsUtils}
                    variant="outlined"
                    required={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    name="startJobDate"
                    margin="normal"
                    label="Start Job"
                    dateFunsUtils={DateFnsUtils}
                    required={true}
                  />
                </Grid>

                <Grid item xs={6}>
                  <DatePicker name="leavingDate" margin="normal" label="Leaving Date" dateFunsUtils={DateFnsUtils} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Salary"
                    name="salary"
                    margin="none"
                    required={true}
                    type="number"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Checkboxes
                    name="isArt14"
                    formControlProps={{ margin: 'none' }}
                    data={{ label: 'Article14', value: true }}
                  />
                </Grid>

                {values.isArt14 && (
                  <Grid item xs={12}>
                    <Radios
                      label="Article 14 %"
                      name="art14Percent"
                      formControlProps={{ margin: 'none' }}
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
                    <DatePicker
                      name="art14StartingDate"
                      margin="none"
                      label="Article 14 Startin Date"
                      dateFunsUtils={DateFnsUtils}
                    />
                  </Grid>
                )}
                <Grid item xs={6}>
                  <TextField
                    name="propValue"
                    label="propValue"
                    margin="none"
                    type="number"
                    variant="outlined"
                    defaultValue={0}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="deposits"
                    label="Deposits"
                    margin="none"
                    type="number"
                    variant="outlined"
                    defaultValue={0}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="payProp"
                    label="payProp"
                    margin="none"
                    type="number"
                    variant="outlined"
                    defaultValue={0}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="compCheck" label="compCheck" margin="none" type="number" variant="outlined" />
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
    </div>
  );
};

export default NewForm;
