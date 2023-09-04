import React, { useState, useEffect } from 'react';
import "./changePassword.css";
import userApi from "../../apis/userApi";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Divider, Alert, notification } from 'antd';
import backgroundLogin from "../../assets/image/background-login.png";
import { useParams } from "react-router-dom";
import axiosClient from '../../apis/axiosClient';

const ChangePassWord = () => {

    const [changePassWord, setChangePassword] = useState();
    const [isLogin, setLogin] = useState(false);

    let history = useHistory();
    let { id } = useParams();

    const onFinish = async (values) => {
        const resetPassWord =
        {
            old_password: values.old_password,
            new_password: values.new_password
        }
       await axiosClient.post("/change_password/", resetPassWord)
            .then(function (response) {
                if (response.message !== "Thay đổi mật khẩu thành công") {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Thay đổi mật khẩu thất bại',

                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Thay đổi mật khẩu thành công',

                    });
                }
            })
            .catch(error => {
                console.log("password error" + error)
            });
    }
    useEffect(() => {

    }, [])

    return (
        <div className="imageBackground">
            <div id="formContainer" >
                <div id="form-Login">
                    <div className="formContentLeft"
                    >
                        <img className="formImg" src={backgroundLogin} alt='spaceship' />
                    </div>
                    <Form
                        style={{ width: 340, marginBottom: 8 }}
                        name="normal_login"
                        className="loginform"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item style={{ marginBottom: 20, marginTop: 65 }}>
                            <Divider style={{ marginBottom: 5, fontSize: 19 }} orientation="center">THAY ĐỔI MẬT KHẨU</Divider>
                        </Form.Item>
                        <>
                            {isLogin === true ?
                                <Form.Item style={{ marginBottom: 16 }}>
                                    <Alert
                                        message="Error changing password"
                                        type="error"
                                        showIcon
                                    />

                                </Form.Item>
                                : ""}
                        </>
                        <Form.Item
                            name="old_password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu cũ!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Mật khẩu cũ" />
                        </Form.Item>

                        <Form.Item
                            name="new_password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu mới!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Mật khẩu mới" />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['new_password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập lại mật khẩu mới!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('new_password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('Mật khẩu bạn vừa nhập không trùng!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Nhập lại mật khẩu" />
                        </Form.Item>

                        <Form.Item style={{ width: '100%', marginTop: 20 }}>
                            <Button className="button" type="primary" htmlType="submit"  >
                                Thay đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassWord;



