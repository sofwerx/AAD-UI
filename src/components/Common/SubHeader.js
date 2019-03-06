import React from 'react';
import {
    Section,
    Row,
    Col,
} from 'react-materialize'
import '../../assets/css/portal.css';

const SubHeader = (props) => {
    return (
        <Section className="dash-heading-wrapper">
            <Row className='center valign-wrapper'>
                <Col s={1}>
                    <img src={props.icon} alt="Subheader icon" width="70px"/>
                </Col>
                <Col s={1}>
                    <h5 className={`dash-username j-title padding-left`}>{props.subHeader}</h5>
                </Col>
                <Col s={10}></Col>
            </Row>
            <Row>
                <Col s={12}>
                    <hr className="thick-line-blue"/>
                </Col>
            </Row>
        </Section>
    )
};

export default SubHeader;
