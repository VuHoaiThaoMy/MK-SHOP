import React, { useState } from 'react'
import Layout from './Layout'
import SuccessMessage from './SuccessMessage';

const Contact = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic for form submission
        // Set the state to indicate that the form has been submitted successfully
        setFormSubmitted(true);
    };

    return (
        <Layout>
            <div className="container mt-5">
                {formSubmitted ? (
                    <SuccessMessage />
                ) : (
                    <>
                        <h2 style={{ marginTop: '10px', fontSize: '30px', color: 'rgb(243, 96, 121)' }}><b>CONTACT US</b></h2>
                        <p>
                            If you have any questions or concerns, please feel free to reach out to us.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label style={{ color: 'grey', marginBottom: '8px', fontSize: '17px' }}>Your Name*</label>
                                <input type="text" className="form-control" id="name" required />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: 'grey', marginBottom: '8px', fontSize: '17px' }}>Your Email*</label>
                                <input type="email" className="form-control" id="email" required />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: 'grey', marginBottom: '8px', fontSize: '17px' }}>Message*</label>
                                <textarea className="form-control" id="message" rows="4" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-contact" style={{ float: 'right' }}>Submit</button>
                        </form>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Contact