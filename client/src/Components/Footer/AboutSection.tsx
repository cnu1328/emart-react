import React from 'react';
import './AboutSection.css'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutSection: React.FC = () => {
    document.title = "RGUKT-aboutSection"
    return (
        <div className = "body">
            <section className="hero-section">
                <Container>
                    <h1>Welcome to eMart – Your College Supermarket</h1>
                    <p>Seamless, sustainable, and affordable shopping for RGUKT BASAR students.</p>
                    <h2>About Emart</h2>
                </Container>
            </section>
            
            <section id="introduction" className="mt-2">
                <Container>
                    <Row className="intro justify-content-center">
                        <Col lg={8}>
                            <h2>Introduction</h2>
                            <p>Welcome to eMart, the ultimate e-commerce platform designed specifically for the students of RGUKT BASAR. Whether you're looking to purchase everyday essentials, academic supplies, or pre-loved projects from your seniors at a fraction of their original cost, eMart has got you covered. Our mission is to create a seamless buying and selling experience within our college community, promoting sustainability and affordability.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <section id="features" className="key-features mt-5">
                <Container>
                    <h2>Key Features</h2>
                    <Row>
                        <Col md={4} className="text-center features">
                            <i className="fas fa-shopping-cart"></i>
                            <h4>Wide Range of Products</h4>
                            <p>From groceries to gadgets, find everything you need at competitive prices. Our inventory is continuously updated to cater to the dynamic needs of our college community.</p>
                        </Col>
                        <Col md={4} className="text-center features">
                            <i className="fas fa-exchange-alt"></i>
                            <h4>Buy & Sell Pre-loved Projects</h4>
                            <p>Are you a senior looking to sell your old projects? Or a junior seeking affordable resources? eMart bridges the gap, allowing students to buy and sell used projects, books, and supplies at low costs.</p>
                        </Col>
                        <Col md={4} className="text-center features">
                            <i className="fas fa-lock"></i>
                            <h4>Secure Transactions</h4>
                            <p>Your safety is our priority. Enjoy secure payment options and buyer protection policies to ensure a hassle-free shopping experience.</p>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={4} className="text-center features">
                            <i className="fas fa-users"></i>
                            <h4>User-friendly Interface</h4>
                            <p>Our platform is designed to be intuitive and easy to navigate. Quickly find what you’re looking for with our efficient search and category filters.</p>
                        </Col>
                        <Col md={4} className="text-center features">
                            <i className="fas fa-heart"></i>
                            <h4>Community Driven</h4>
                            <p>Connect with fellow students and support the campus ecosystem. eMart fosters a sense of community by facilitating transactions among trusted peers.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <section id="benefits" className="user-benefits mt-5">
                <Container>
                    <h2>User Benefits</h2>
                    <Row>
                        <Col md={6}>
                            <h4>Save Money</h4>
                            <p>Why pay more when you can get the same quality for less? Take advantage of discounted rates and pre-loved items to keep your expenses in check.</p>
                        </Col>
                        <Col md={6}>
                            <h4>Sustainable Shopping</h4>
                            <p>Reduce waste by buying and selling second-hand items. eMart encourages sustainable practices, contributing to a greener campus.</p>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={6}>
                            <h4>Convenience</h4>
                            <p>Shop anytime, anywhere. With eMart’s mobile-friendly design, you can browse, buy, and sell on the go.</p>
                        </Col>
                        <Col md={6}>
                            <h4>Build Connections</h4>
                            <p>Engage with your college community, meet new people, and exchange useful resources. eMart is more than just a marketplace; it’s a social hub.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <section id="how-it-works" className="how-it-works mt-5">
                <Container>
                    <h2>How It Works</h2>
                    <Row>
                        <Col md={6}>
                            <h4>For Buyers:</h4>
                            <ul>
                                <li>Browse: Explore various categories or use the search bar to find specific items.</li>
                                <li>Add to Cart: Select the items you want to purchase and add them to your cart.</li>
                                <li>Checkout: Complete your purchase through our secure payment gateway.</li>
                                <li>Delivery: Choose between pick-up or delivery options, as available.</li>
                            </ul>
                        </Col>
                        <Col md={6}>
                            <h4>For Sellers:</h4>
                            <ul>
                                <li>List an Item: Post your items by filling in the details and uploading pictures.</li>
                                <li>Set Your Price: Decide on a fair price for your items.</li>
                                <li>Connect with Buyers: Respond to inquiries and arrange for item exchange.</li>
                                <li>Get Paid: Receive payments through the platform securely.</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <section id="faq" className="faq-section mt-5">
                <Container>
                    <h2>Frequently Asked Questions (FAQs)</h2>
                    <Row>
                        <Col md={6}>
                            <h4>Q1: Who can use eMart?</h4>
                            <p>eMart is exclusively available to students of RGUKT BASAR. You need a valid college email to register.</p>
                        </Col>
                        <Col md={6}>
                            <h4>Q2: How do I list an item for sale?</h4>
                            <p>Log in to your eMart account, go to the "Sell" section, and follow the prompts to create a listing. Fill in all required details and upload clear images of your item.</p>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={6}>
                            <h4>Q3: What types of payments are accepted?</h4>
                            <p>We accept various payment methods, including credit/debit cards, PayPal, and direct bank transfers. All transactions are secured to protect your information.</p>
                        </Col>
                        <Col md={6}>
                            <h4>Q4: Can I return a purchased item?</h4>
                            <p>Yes, returns are possible within a specified period if the item is not as described or defective. Please refer to our return policy for more details.</p>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={6}>
                            <h4>Q5: How do I contact customer support?</h4>
                            <p>You can reach our customer support team through the "Contact Us" section on the website. We are here to assist you with any issues or queries.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default AboutSection;
