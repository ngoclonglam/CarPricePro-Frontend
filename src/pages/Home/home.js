import React, { useState, useEffect, useRef } from "react";
import "../Home/home.css";
import eventApi from "../../apis/eventApi";
import productApi from "../../apis/productApi";
import { useHistory } from 'react-router-dom';
import { RightOutlined, TagOutlined } from '@ant-design/icons';
import { Col, Row, Button, Pagination, Spin, Carousel, Card, List, BackTop, Affix, Avatar, Radio, Select, Form, Input, Modal, message } from "antd";
import axiosClient from "../../apis/axiosClient";
const { Option } = Select;


const Home = () => {

    const [event, setEvent] = useState([]);
    const [productList, setProductList] = useState([]);
    const [eventListHome, setEventListHome] = useState([]);
    const [totalEvent, setTotalEvent] = useState(Number);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const tawkMessengerRef = useRef();

    const [cars, setCars] = useState([]);
    const [cars2, setCars2] = useState([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [predictedPrice, setPredictedPrice] = useState('');

    const [modelXe, setModelXe] = useState('');
    const [namSanXuat, setNamSanXuat] = useState('');
    const [dongXe, setDongXe] = useState('');
    const [hopSo, setHopSo] = useState('');
    const [danDong, setDanDong] = useState('');

    const history = useHistory();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handlePage = async (page, size) => {
        try {
            const response = await eventApi.getListEvents(page, 8);
            setEventListHome(response.data)
            setTotalEvent(response.total_count);
            setCurrentPage(page);

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleReadMore = (id) => {
        console.log(id);
        history.push("question/" + id)
    }

    const fetchCars = async () => {
        await axiosClient.get('/cars/')
            .then(response => {
                console.log(response);
                setCars(response);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };


    useEffect(() => {
        (async () => {
            fetchCars();
        })();
    }, [])

    const handleFilter = async () => {
        // Gọi API với các tham số lọc và cập nhật danh sách xe
        await axiosClient.get('/cars/', {
            params: { Model_Xe: modelXe, Nam_San_Xuat: namSanXuat, Dong_Xe: dongXe, Hop_So: hopSo, Dan_Dong: danDong },
        })
            .then(response => {
                setCars2(response);
            })
            .catch(error => {
                console.error('Error filtering data:', error);
            });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCars = cars2.slice(indexOfFirstItem, indexOfLastItem);

    const handleOk = async () => {
        form.validateFields().then(async (values) => {
            // Gửi yêu cầu API predict_price
            try {
                await axiosClient.get('/predict_price/', {
                    params: {
                        chieu_dai_co_so: values.chieuDaiCoSo,
                        so_cho_ngoi: values.soChoNgoi,
                        chieu_dai_xe: values.chieuDaiXe,
                        chieu_cao_xe: values.chieuCaoXe,
                        hop_so: values.hopSo === "Số tay" ? 0 : 1,
                    },
                }).then((res) => {

                    // Xử lý kết quả từ API
                    const predictedPrice = res.predicted_price;
                    // Thực hiện các hành động khác với kết quả
                    setPredictedPrice(predictedPrice);
                    setIsConfirmModalVisible(true);

                    // Đóng modal
                    setIsModalVisible(false);

                    form.resetFields();

                });

            } catch (error) {
                // Xử lý lỗi nếu có
            }
        });
    };

    const handleCancel = () => {
        // Đóng modal khi người dùng nhấn "Cancel" hoặc ngoại trừ modal
        setIsModalVisible(false);
    };

    return (
        <Spin spinning={false}>
            <section class="welcome-part-one">
                <div class="container">
                    <div class="welcome-demop102 text-center">
                        <h2>Định Giá Xe - Tìm Hiểu Giá Trị Thực Tế Của Xe Hơi</h2>
                        <p>Chào mừng bạn đến với trang Định Giá Xe của chúng tôi - nơi bạn có thể khám phá giá trị thực tế của các loại xe hơi và cùng thảo luận về thị trường ô tô.<br />Trang web này là nguồn thông tin hữu ích giúp bạn đánh giá giá trị và giá cả của các dòng xe hơi khác nhau.<br /></p>

                        <div class="button0239-item">
                            <Button type="button" onClick={showModal}>
                                Định giá xe ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{ maxWidth: '1200px', margin: '0 auto', marginTop: 20 }}>
                <h1>Vui lòng lựa chọn phía dưới:</h1>
                <Row gutter={16}>
                    <Col span={8}>
                        <Select
                            placeholder="Chọn Model Xe"
                            style={{ width: '100%', marginBottom: '10px' }}
                            value={modelXe}
                            onChange={value => setModelXe(value)}
                        >
                            <Option value="">-- Chọn Model Xe --</Option>
                            {Array.from(new Set(cars?.map(car => car.Model_Xe))).map(model => (
                                <Option key={model} value={model}>{model}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Select
                            placeholder="Chọn Năm Sản Xuất"
                            style={{ width: '100%', marginBottom: '10px' }}
                            value={namSanXuat}
                            onChange={value => setNamSanXuat(value)}
                        >
                            <Option value="">-- Chọn Năm Sản Xuất --</Option>
                            {Array.from(new Set(cars?.map(car => car.Nam_San_Xuat))).map(nam => (
                                <Option key={nam} value={nam}>{nam}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Select
                            placeholder="Chọn Dòng Xe"
                            style={{ width: '100%', marginBottom: '10px' }}
                            value={dongXe}
                            onChange={value => setDongXe(value)}
                        >
                            <Option value="">-- Chọn Dòng Xe --</Option>
                            {Array.from(new Set(cars?.map(car => car.Dong_Xe))).map(dong => (
                                <Option key={dong} value={dong}>{dong}</Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Select
                            placeholder="Chọn Hộp Số"
                            style={{ width: '100%', marginBottom: '10px' }}
                            value={hopSo}
                            onChange={value => setHopSo(value)}
                        >
                            <Option value="">-- Chọn Hộp Số --</Option>
                            {Array.from(new Set(cars?.map(car => car.Hop_So))).map(hop => (
                                <Option key={hop} value={hop}>{hop}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Select
                            placeholder="Chọn Dàn Động"
                            style={{ width: '100%', marginBottom: '10px' }}
                            value={danDong}
                            onChange={value => setDanDong(value)}
                        >
                            <Option value="">-- Chọn Dàn Động --</Option>
                            {Array.from(new Set(cars?.map(car => car.Dan_Dong))).map(dan => (
                                <Option key={dan} value={dan}>{dan}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Button type="primary" onClick={handleFilter} style={{ width: '100%', marginBottom: '10px' }}>
                            Filter
                        </Button>
                    </Col>
                </Row>
                <Row gutter={16}>
                    {currentCars.map(car => (
                        <Col span={8} key={car.id}>
                            <Card title={car.Model_Xe} style={{ marginBottom: '16px' }}>
                                <p>Năm Sản Xuất: {car.Nam_San_Xuat}</p>
                                <p>Dòng Xe: {car.Dong_Xe}</p>
                                <p>Hộp Số: {car.Hop_So}</p>
                                <p>Dàn Động: {car.Dan_Dong}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={cars2.length}
                    onChange={page => setCurrentPage(page)}
                    style={{ marginTop: '16px', textAlign: 'center' }}
                />
            </div>
            <div class="container">
                {productList?.map(category => (
                    <div class="subforum">
                        <div class="subforum-title">
                            <h1>{category.name}</h1>
                        </div>
                        {category?.subcategories?.map(subcategory => (
                            <div class="subforum-row">
                                <div class="subforum-icon subforum-column center">
                                    <TagOutlined />
                                </div>
                                <div class="subforum-description subforum-column">
                                    <h4><a href="#" onClick={() => handleReadMore(subcategory.id)}>{subcategory.name}</a></h4>
                                    <p>Description Content: let's try to be cool, otherwise,w at 'sthe point in libing together with people youdont' live.</p>
                                </div>
                                <div class="subforum-stats subforum-column center">
                                    <span>24 Posts | 12 Topics</span>
                                </div>
                                <div class="subforum-info subforum-column">
                                    <b><a href="">Được</a></b> tạo bới <a href="">Admin</a>
                                    <br />on <small>12 Dec 2020</small>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Modal
                title="Định giá xe"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} onFinish={handleOk} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Form.Item
                        label="Hãng Xe"
                        name="hangXe"
                        rules={[{ required: true, message: 'Vui lòng chọn Hãng Xe!' }]}
                    >
                        <Select>
                            <Option value="Toyota">Toyota</Option>
                            <Option value="Honda">Honda</Option>
                            <Option value="Ford">Ford</Option>
                            {/* Thêm các hãng xe khác tại đây */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Model Xe"
                        name="modelXe"
                        rules={[{ required: true, message: 'Vui lòng nhập Model Xe!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Chiều Dài Cơ Sở"
                        name="chieuDaiCoSo"
                        rules={[{ required: true, message: 'Vui lòng nhập Chiều Dài Cơ Sở!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số Chỗ Ngồi"
                        name="soChoNgoi"
                        rules={[{ required: true, message: 'Vui lòng nhập Số Chỗ Ngồi!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Chiều Dài Xe"
                        name="chieuDaiXe"
                        rules={[{ required: true, message: 'Vui lòng nhập Chiều Dài Xe!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Chiều Cao Xe"
                        name="chieuCaoXe"
                        rules={[{ required: true, message: 'Vui lòng nhập Chiều Cao Xe!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Hộp Số"
                        name="hopSo"
                        rules={[{ required: true, message: 'Vui lòng chọn Hộp Số!' }]}
                    >
                        <Radio.Group>
                            <Radio value="SoTay">Số Tay</Radio>
                            <Radio value="SoTuDong">Số Tự Động</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Kết quả dự đoán"
                visible={isConfirmModalVisible}
                onCancel={() => setIsConfirmModalVisible(false)}
                onOk={() => setIsConfirmModalVisible(false)}
            >
                <p>Kết quả đã được định giá thành công:</p>
                <p>{predictedPrice}</p>
            </Modal>
            <BackTop style={{ textAlign: 'right' }} />
        </Spin >
    );
};

export default Home;
