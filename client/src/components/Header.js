import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Payments from './Payments'

class Header extends React.Component {
    renderContent = () => {
        const { auth } = this.props
        switch (auth) {
            case null:
                break
            case false:
                return (
                    <li>
                        <a href="/auth/google" >Login With Google</a>
                    </li>
                )
            default:
                return (
                    <>
                        <li><Payments /></li>
                        <li style={{ margin: '0 10px' }}>Credits: {auth.credits}</li>
                        <li>
                            <a href="/api/v1/logout">Logout</a>
                        </li>
                    </>
                )
        }
    }
    render() {
        
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo" style={{ marginLeft: 10 }}>Emaily</Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = ({ auth }) => ({
    auth
})

export default connect(mapStateToProps)(Header)