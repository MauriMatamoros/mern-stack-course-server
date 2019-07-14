import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'

class SurveyForm extends React.Component {
    renderFields = () => formFields.map(({ label, name }) => (
        <Field 
            key={name}
            type="text"
            name={name}
            component={SurveyField}
            label={label}
        />
    ))
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

const validate = (values) => {
    let errors = {}
    formFields.forEach(({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide ${name === 'recipients' ? 'an email(s)' : `a ${name}`}`
        }
    })
    errors.recipients = validateEmails(values.recipients || '')
    return errors
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm)