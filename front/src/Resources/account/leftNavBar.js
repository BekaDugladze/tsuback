import React from 'react';
import "./css/leftNavBar.css";
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


class LeftNavBar extends Component {
    render() { 
        return (
        <div className='leftNavBar' style={{ display: this.props.isDivVisible ? 'block' : 'none' }}>
                <div className="subjectNavBar">
                    <h3>Subjects</h3>
                    <ul>
                        {/*<li><NavLink to=''>Study Card</NavLink></li>
                        <li><NavLink to=''>Financial Condition</NavLink></li>
                        <li><NavLink to=''>Course Registration</NavLink></li>
                        <li><NavLink to=''>Schedule</NavLink></li>
                        <li><NavLink to=''>Program</NavLink></li>
                        <li><NavLink to=''>Orders</NavLink></li>
                        <li><NavLink to=''>Inner Mobility</NavLink></li>
                        <li><NavLink to=''>Self-Governance</NavLink></li>
                        <li><NavLink to=''>Inner Mobility</NavLink></li>
        <li><NavLink to=''>Self-Governance</NavLink></li>*/}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isDivVisible: state.isDivVisible,
  });
  

  
export default connect(mapStateToProps)(LeftNavBar);