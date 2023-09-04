import React, { useState, useEffect, useRef } from "react";
import "./questionDetail.css";
import eventApi from "../../apis/eventApi";
import productApi from "../../apis/productApi";
import { useHistory, useParams } from 'react-router-dom';
import { LikeOutlined, DislikeOutlined, HeartOutlined } from '@ant-design/icons';
import { Col, Row, Button, Form, Spin, Input, Card, notification, Modal, BackTop, message, Avatar, Badge, Rate, List, Descriptions } from "antd";
import axiosClient from "../../apis/axiosClient";
import 'suneditor/dist/css/suneditor.min.css';
import SunEditor from 'suneditor-react';
const { TextArea } = Input;

const QuestionDetail = () => {

    const [productList, setProductList] = useState([]);
    const [eventListHome, setEventListHome] = useState([]);
    const [totalEvent, setTotalEvent] = useState(Number);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [description, setDescription] = useState();

    const history = useHistory();
    let { id } = useParams();


    const handleOk = async (value) => {
        const user = JSON.parse(localStorage.getItem("user"));
        try {
            setLoading(true);
            try {
                const categoryList = {
                    "title": value.title,
                    "description": description,
                    "author": user.id,
                    "subcategory": id,
                    "likes": 0,
                    "tags": value.tags,
                }
                return axiosClient.post("/questions/", categoryList).then(response => {
                    if (response === undefined) {
                        notification["error"]({
                            message: `Thông báo`,
                            description:
                                'Tạo câu hỏi thất bại',
                        });
                    }
                    else {
                        notification["success"]({
                            message: `Thông báo`,
                            description:
                                'Tạo câu hỏi thành công, vui lòng đợi quản trị viên duyệt!',
                        });
                        getList();
                        form.resetFields();
                        setIsModalVisible(false);
                    }
                })

            } catch (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const getList = () => {
        (async () => {
            console.log(id);
            try {
                const response = await productApi.getDetailQuestion(id);
                console.log(response);

                const reviews = await productApi.getConversations(id);
                setProductReview(reviews);
                console.log(reviews);

                setProductList(response)
                setTotalEvent(response);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }
    useEffect(() => {
        (async () => {
            console.log(id);

            try {
                const response = await productApi.getDetailQuestion(id)
                console.log(response);

                const reviews = await productApi.getConversations(id);
                setProductReview(reviews);
                console.log(reviews);

                setProductList(response)
                setTotalEvent(response);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }, [])

    const handleCreateQuestion = () => {
        const token = localStorage.getItem('client');
        if (token) {
            setIsModalVisible(true);
        } else {
            alert("vô token 2");
            history.push('/login');
        }
    };

    const handleChange = (content) => {
        console.log(content);
        setDescription(content);
    }

    const [visible2, setVisible2] = useState(false);

    const handleReviewSubmit = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        const data = {
            "question": id,
            "author": user.id,
            "content": comment
        }

        // Gọi API đánh giá và bình luận
        await axiosClient
            .post(`/conversations/`, data)
            .then((response => {
                console.log(response);
                // Xử lý khi gọi API thành công
                console.log('Review created');
                // Đóng modal và thực hiện các hành động khác nếu cần
                message.success('Thông báo:' + response);
                setComment("");
                handleCloseModal();
            }))
            .catch((error) => {
                // Xử lý khi gọi API thất bại
                console.error('Error creating review:', error);
                // Hiển thị thông báo lỗi cho người dùng nếu cần
                message.error('Đánh giá thất bại: ' + error);

            });

        getList();
    };

    const [reviews, setProductReview] = useState([]);
    const [reviewsCount, setProductReviewCount] = useState([]);
    const [avgRating, setAvgRating] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleOpenModal = () => {
        const token = localStorage.getItem('client');
        if (token) {
            setVisible2(true);
        } else {
            notification.error({ message: 'Bạn vui lòng đăng nhập để tham gia thảo luận!' });
        }
    };

    const handleCloseModal = () => {
        setVisible2(false);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleLike = async (id) => {
        try {
            await axiosClient.post(`/conversations/${id}/like/`);
            notification.success({ message: 'Like thành công!' });
            getList();

        } catch (error) {
            console.error('Error liking review:', error);
        }
    };

    const handleDislike = async (id) => {
        try {
            await axiosClient.post(`/conversations/${id}/dislike/`);
            notification.success({ message: 'Dislike thành công!' });
            getList();

        } catch (error) {
            console.error('Error disliking review:', error);
        }
    };

    const handleLikeQuestion = async () => {
        try {
            await axiosClient.post(`/questions/${id}/like/`);
            notification.success({ message: 'Like câu hỏi thành công!' });
            getList();

        } catch (error) {
            console.error('Error disliking review:', error);
        }
    }

    return (
        <Spin spinning={false}>
            <section class="welcome-part-one">
                <div class="container">
                    <div class="welcome-demop102 text-center">
                        <h2>Chào mừng bạn đến với Blogger, "Hỏi tôi, Mẫu Giao diện Tuyệt vời cho Câu hỏi & Trả lời"</h2>
                        <p>Chào mừng bạn đến với diễn đàn của chúng tôi - một không gian thú vị và thấu hiểu dành cho mọi người chia sẻ, thảo luận và học hỏi. <br />Diễn đàn là nơi bạn có thể gặp gỡ những người có sở thích, quan tâm tương tự và mở rộng mạng lưới xã hội.<br /></p>

                        <div class="button0239-item">
                            <a href="#">
                                <button type="button" class="aboutus022">Thêm thông tin</button>
                            </a>
                            <button type="button" className="join92" onClick={() => handleCreateQuestion()}>
                                Tạo câu hỏi
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section class="header-descriptin329">
                <div class="container">
                    <ol class="breadcrumb breadcrumb839">
                        <li style={{ marginRight: 10, fontSize: 16 }}><a href="#">Tiêu đề: </a></li>
                        <li class="active" style={{ marginRight: 10, fontSize: 16 }}>This Is My first Question</li>
                    </ol>
                </div>
            </section>
            <div class="container">
                <section class="main-content920">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div id="main">
                                    <section style={{ marginBottom: 20, padding: 20, background: '#FFFFFF' }}>
                                        <div>
                                            <div className='box_detail_description' dangerouslySetInnerHTML={{ __html: productList?.description }}></div>
                                            <div className="review-likes">
                                                {productList.likes} Likes
                                            </div>
                                            <Button type="link" onClick={() => handleLikeQuestion()} style={{ marginBottom: 10, marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <HeartOutlined /> Like
                                            </Button>
                                        </div>
                                    </section>
                                    <section id="content5" style={{ padding: 20, background: '#FFFFFF' }}>

                                        <Row gutter={12} style={{ marginTop: 20, width: 1700 }}>
                                            <Col span={16}>
                                                <Card className="card_total" bordered={false}>
                                                    <div className='card_number'>
                                                        <div>
                                                            <div className='number_total'>{productList?.categoryTotal}</div>

                                                            <p class="subtitle">Hãy tham gia thảo luận cho câu hỏi?</p>
                                                            <div class="group_comment">
                                                                <Button type="primary" className="button_comment" size={'large'} onClick={handleOpenModal}>
                                                                    Bình luận
                                                                </Button>
                                                            </div>
                                                            <Modal
                                                                visible={visible2}
                                                                onCancel={handleCloseModal}
                                                                onOk={handleReviewSubmit}
                                                                okText="Gửi đánh giá"
                                                                cancelText="Hủy"
                                                            >
                                                                <h2>Đánh giá và bình luận</h2>
                                                                <TextArea
                                                                    placeholder="Nhập bình luận của bạn"
                                                                    value={comment}
                                                                    onChange={handleCommentChange}
                                                                ></TextArea>
                                                            </Modal>
                                                        </div>
                                                        <div style={{ marginTop: 40 }}>
                                                            <Card>
                                                                <div style={{ padding: 20 }}>
                                                                    <List
                                                                        itemLayout="horizontal"
                                                                        dataSource={reviews}
                                                                        renderItem={(item, index) => (
                                                                            <List.Item>
                                                                                <List.Item.Meta
                                                                                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`} />}
                                                                                    title={<a href="https://ant.design">{item.author}</a>}
                                                                                    description={
                                                                                        <div className="review" style={{ padding: 10 }}>
                                                                                            <div className="review-content">{item.content}</div>
                                                                                            <div className="review-likes">
                                                                                                {item.likes} Likes, {item.dislikes} Dislikes
                                                                                            </div>
                                                                                            <div className="review-actions" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                                <Button type="link" onClick={() => handleLike(item.id)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                    <LikeOutlined /> Like
                                                                                                </Button>
                                                                                                <Button type="link" onClick={() => handleDislike(item.id)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                    <DislikeOutlined /> Dislike
                                                                                                </Button>
                                                                                            </div>
                                                                                        </div>
                                                                                    }
                                                                                />
                                                                            </List.Item>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    </div>

                                                </Card>
                                            </Col>
                                        </Row>
                                    </section>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <BackTop style={{ textAlign: 'right' }} />

            <Modal
                visible={isModalVisible}
                title="Tạo câu hỏi"
                onCancel={handleCancel}
                width={1000}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            handleOk(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
                okText="Hoàn thành"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mô tả!',
                            },
                        ]}
                        style={{ marginBottom: 10 }}
                    >

                        <SunEditor
                            lang="en"
                            placeholder="Content"
                            onChange={handleChange}
                            setContents={description}
                            setOptions={{
                                buttonList: [
                                    ["undo", "redo"],
                                    ["font", "fontSize"],
                                    // ['paragraphStyle', 'blockquote'],
                                    [
                                        "bold",
                                        "underline",
                                        "italic",
                                        "strike",
                                        "subscript",
                                        "superscript"
                                    ],
                                    ["fontColor", "hiliteColor"],
                                    ["align", "list", "lineHeight"],
                                    ["outdent", "indent"],

                                    ["table", "horizontalRule", "link", "image", "video"],
                                    // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                    // ['imageGallery'], // You must add the "imageGalleryUrl".
                                    // ["fullScreen", "showBlocks", "codeView"],
                                    ["preview", "print"],
                                    ["removeFormat"]

                                    // ['save', 'template'],
                                    // '/', Line break
                                ],
                                fontSize: [
                                    8, 10, 14, 18, 24,
                                ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                                defaultTag: "div",
                                minHeight: "500px",
                                showPathLabel: false,
                                attributesWhitelist: {
                                    all: "style",
                                    table: "cellpadding|width|cellspacing|height|style",
                                    tr: "valign|style",
                                    td: "styleinsert|height|style",
                                    img: "title|alt|src|style"
                                }
                            }}
                        />
                    </Form.Item>


                    <Form.Item name="tags" label="Tags" rules={[{ required: true, message: 'Vui lòng nhập tags' }]}>
                        <Input placeholder="Nhập tags, cách nhau bằng dấu phẩy" />
                    </Form.Item>
                </Form>
            </Modal>
        </Spin >
    );
};

export default QuestionDetail;
