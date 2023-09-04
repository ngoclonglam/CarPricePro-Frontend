import React from 'react';
import { Layout } from 'antd';
import { Col, Row, Divider } from "antd";
import { SocialIcon } from 'react-social-icons';
import "./footer.css";

const { Footer } = Layout;

function _Footer() {
    return (

        <Footer style={{ backgroundColor: "#1e0a3c", padding: 30, paddingTop: 80 }}>
            <Row className="footer-desktop">
                <Col span={3} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Xe Ô Tô</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Trang chủ</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Sản phẩm</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Tin tức</p>
                </Col>
                <Col span={4} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Sản phẩm</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Xe hơi</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Xe thể thao</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Xe đa dụng</p>
                </Col>
                <Col span={4} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Hỗ trợ và Liên hệ</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Hỗ trợ khách hàng</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Liên hệ chúng tôi</p>
                </Col>
                <Col span={5} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Địa chỉ</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Số 123, Đường Ô Tô, Phường Xe Hơi, Quận Ô Tô, Thành phố Xe Hơi</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Số 456, Đường Xe Ô Tô, Phường Xe Thể Thao, Quận Xe Thể Thao, Thành phố Xe Thể Thao</p>
                </Col>
                <Col span={4}>
                    <strong style={{ color: "#FFFFFF", fontSize: 20, marginBottom: 40, cursor: "pointer" }}>Kết nối với chúng tôi</strong>
                    <Row style={{ marginTop: 15 }}>
                        <Col span={6}>
                            <SocialIcon url="https://www.youtube.com/@XeOtoOfficial" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                        <Col span={6}>
                            <SocialIcon url="https://www.facebook.com/XeOtoVietnam" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                        <Col span={6}>
                            <SocialIcon url="https://www.instagram.com/xeotovn/" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                        <Col span={6}>
                            <SocialIcon url="https://www.tiktok.com/@xeoto.official" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <div style={{ textAlign: 'center' }}>
                <Divider style={{ padding: 0 }} />
                <p style={{ color: "#FFFFFF", fontSize: 13 }}>Copyright@ 2023 Created by team CarPricePro</p>
                <p style={{ color: "#FFFFFF", fontSize: 13 }}>Điện thoại: (+84) 000.0000000 - (+84) 000.0000000</p>
            </div>
        </Footer>
    );
}

export default _Footer;