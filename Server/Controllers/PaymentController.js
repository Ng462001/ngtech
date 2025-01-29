const db = require("../db/db.js");
const stripe = require('stripe')(process.env.STRIPE_SERVER_KEY);

class Payment {
    static createPayment = async (req, res) => {
        const { course_id, course_price, email, stu_id, course_name } = req.body;

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'INR',
                        product_data: {
                            name: course_name
                        },
                        unit_amount: course_price * 100,
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}&course_id=${course_id}&course_price=${course_price}&email=${email}&stu_id=${stu_id}&course_name=${course_name}`,
                cancel_url: `${process.env.FRONTEND_URL}`,
                metadata: {
                    course_id,
                    student_id: stu_id,
                    email,
                },
                customer_email: email,
                billing_address_collection: 'required'
            });

            res.status(200).json({ sessionId: session.id, status: 'success' });

        } catch (error) {
            return res.status(500).json({ Error: 'Database error' });
        }
    }

    static paymentStatus = async (req, res) => {
        const { session_id, course_id, course_price, email, stu_id } = req.query;

        try {
            const retrievedSession = await stripe.checkout.sessions.retrieve(session_id);
            const query = 'SELECT * FROM course_order WHERE order_id = ?';
            db.query(query, [session_id], (err, result) => {
                if (err) {
                    return res.status(500).json({ Error: "Database error", err });
                }
                if (result.length > 0) {
                    return res.status(400).json({ Error: "Order already Purchase with order Id" });
                } else {
                    if (retrievedSession.payment_status === 'paid') {
                        const paymentData = [course_id, course_price, session_id, email, stu_id, new Date()];
                        const sql = 'INSERT INTO course_order (`course_id`,`amount`,`order_id`,`email`,`stu_id`,`date`) VALUES (?, ?, ?, ?, ?, ?)';
                        db.query(sql, paymentData, (err, result) => {
                            if (err) {
                                return res.status(500).json({ Error: 'Unable to process payment' });
                            } else {
                                return res.status(200).json({ Status: "success", result });
                            }
                        });
                    } else {
                        return res.status(500).json({ Error: 'Unpaid' });
                    }
                }
            });
        } catch (error) {
            return res.status(500).json({ Error: 'Unable to retrieve session data' });
        }
    };

}
module.exports = Payment;
