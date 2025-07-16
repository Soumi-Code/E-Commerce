const express = require('express');
const Checkout = require('../models/Checkout');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post('/', protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    // Validate request body
    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: 'no items in checkout' });
    }

    try {
        // Create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: 'Pending',
            isPaid: false,
        });
        console.log(`Checkout created for user ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error creating checkout:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

//@route PUT/api/checkout/:id/pay
// @desc Update checkout payment status
// @access Private
router.put('/:id/pay', protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        // Update payment status
        if (paymentStatus === 'paid') {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = new Date()
            await checkout.save();

        res.status(200).json(checkout);
        } else {
            return res.status(400).json({ message: 'Invalid payment status' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//@route POST /api/checkout/:id/finalize
// @desc Finalize checkout and create order
// @access Private
router.post('/:id/finalize', protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        // Create a new order
        if (checkout.isPaid && !checkout.isFinalized) {
        const finalOrder = await Order.create({
            user: checkout.user,
            orderItems: checkout.checkoutItems,
            shippingAddress: checkout.shippingAddress,
            paymentMethod: checkout.paymentMethod,
            totalPrice: checkout.totalPrice,
            isPaid: true,
            paidAt: checkout.paidAt,
            isDelivered: false,
            paymentStatus: "Paid",
            paymentDetails: checkout.paymentDetails,
            
        });

        // Mark checkout as finalized
        checkout.isFinalized = true;
        checkout.finalizedAt = Date.now();
        await checkout.save();
        // Clear the cart
        await Cart.findOneAndDelete({ user: checkout.user });
        res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
            return res.status(400).json({ message: 'Checkout already finalized' });
        } else {
            return res.status(400).json({ message: 'Checkout not paid yet' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
