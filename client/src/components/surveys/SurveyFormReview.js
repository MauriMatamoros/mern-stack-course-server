import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import formFields from './formFields'
import * as actions from '../../actions'

const SurveyFormReview = ({ onCancel, values, submitSurvey, history }) => (
    <div>
        <h5>Please confirm the form</h5>
        <div>
            {formFields.map(({ name, label }) => (
                <div key={name}>
                    <label>{label}</label>
                    <div>
                        {values[name]}
                    </div>
                </div>
            ))}
        </div>
        <button className="yellow white-text darken-3 btn-flat" onClick={onCancel}>
            Cancel
        </button>
        <button 
            onClick={() => submitSurvey(values, history)}
            className="green white-text btn-flat right"
        >
            Send Survey
            <i className="material-icons white-text right">email</i>
        </button>
    </div>
)

const mapStateToProps = ({ form: { surveyForm: { values } } }) => ({
    values
})

export default withRouter(connect(mapStateToProps, actions)(SurveyFormReview))