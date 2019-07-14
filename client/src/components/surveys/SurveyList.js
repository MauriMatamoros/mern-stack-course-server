import React from 'react'
import { connect } from 'react-redux'

import { fetchSurveys } from '../../actions'

class SurveyList extends React.Component {
    componentDidMount() {
        this.props.fetchSurveys()
    }
    renderSurveys = () => this.props.surveys.reverse().map(({ _id, title, body, dateSent, yes, no }) => (
            <div className="card darken-1" key={_id}>
                <div className="card-content">
                    <span className="card-title">{title}</span>
                    <p>{body}</p>
                    <p className="right">Sent On: {new Date(dateSent).toLocaleDateString()}</p>
                    <div className="card-action">
                        <a>Yes: {yes}</a>
                        <a>No: {no}</a>
                    </div>
                </div>
            </div>
        ))
    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

const mapStateToProps = ({ surveys }) => ({
    surveys
})

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)