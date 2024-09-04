import { Form, Row, Col, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';


export function Register() {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };


    return(
        <div className="montserrat m-5">
        <Form layout='vertical' onFinish={onFinish} >
            <div className="flex item-center justify-between">
            <h1 className="text-2xl"> MINEWALLET - REGISTER </h1>
            

            <Link to={'/login'}><div className="text-sm underline">Already a member, Login </div></Link>
            </div>
            <hr />
            
            <Row gutter={16} >

                <Col span = {6}  >
                <Form.Item label = "First Name" name="firstName" >
                    <input type="text" />
                </Form.Item>
                </Col>

                <Col span = {6} >
                <Form.Item label = "Last Name" name="lastName" >
                    <input type="text" />
                </Form.Item>
                </Col>

                <Col span = {6}>
                <Form.Item label = "Email" name="email" >
                    <input type="text" />
                </Form.Item>
                </Col>

                <Col span = {6}>
                <Form.Item label = "Mobile" name="phoneNumber" >
                    <input type="text" />
                </Form.Item>
                </Col>

                <Col span = {6}>
                <Form.Item label = "Username" name="userName" >
                    <input type="text" />
                </Form.Item>
                </Col>


                <Col span = {6}>
                <Form.Item label = "Identification Type" name="identificationType" >
                    <select>
                        <option value="-1">SELECT</option>
                        <option value="National ID">National ID</option>
                        <option value="Passport">Passport</option>
                        <option value="Driving License">Driving License</option>
                        <option value="Social Card">Social Security Card (SSN)</option>
                    </select>
                </Form.Item>
                </Col>

                <Col span = {6}>
                <Form.Item label = "Identification Number" name="identificationNumber" >
                    <input type="text" />
                </Form.Item>
                </Col>

                <Col span = {24}>
                <Form.Item label = "Address" name="address" >
                    <textarea></textarea>
                </Form.Item>
                </Col>


                <Col span = {6}>
                <Form.Item label = "Password" name="password" >
                    <input type="password" />
                </Form.Item>
                </Col>

                <Col span = {6}>
                <Form.Item label = "Confirm Password" name="confirmPassword" >
                    <input type="password" />
                </Form.Item>
                </Col>
                
            </Row>

            <div className="flex justify-end">
                <button className='primary-contained-btn' type='submit'>Register</button>
            </div>
            
        </Form>
    </div>
    )
}