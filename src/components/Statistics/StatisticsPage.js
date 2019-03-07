import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../../assets/css/portal.css';
import SubHeader from "../Common/SubHeader";

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({

});

class StatisticsPage extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="">
                <div>
                    <SubHeader icon={require("../../assets/images/stats_icon.png")} subHeader="Tool Reporting"/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);
