import React from 'react'
import { reduxForm } from 'redux-form'

import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends React.Component {
    state = {
        showReview: false
    }
    render() {
        return (
            <div>
                {
                    this.state.showReview ?  
                    <SurveyFormReview onCancel={() => this.setState(() => ({ showReview: false }))} /> : 
                    <SurveyForm onSurveySubmit={() => this.setState(() => ({ showReview: true }))} />
                }
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew)