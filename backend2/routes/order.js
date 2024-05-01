/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders
 */

/**
 * @swagger
 * /order/create-order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     shopId:
 *                       type: string
 *                     
 *               shippingAddress:
 *                 type: object
 *                 
 *               user:
 *                 type: object
 *                 
 *               totalPrice:
 *                 type: number
 *               paymentInfo:
 *                 type: object
 *                 
 *     responses:
 *       '201':
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the order was created successfully
 *                 orders:
 *                   type: array
 *                   description: List of orders created
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/get-all-{userId}:
 *   get:
 *     summary: Get all orders of a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user whose orders to retrieve
 *     responses:
 *       '200':
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the orders were retrieved successfully
 *                 orders:
 *                   type: array
 *                   description: List of orders belonging to the user
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/get-seller-all-{shopId}:
 *   get:
 *     summary: Get all orders of a seller
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: shopId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the shop whose orders to retrieve
 *     responses:
 *       '200':
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the orders were retrieved successfully
 *                 orders:
 *                   type: array
 *                   description: List of orders belonging to the shop
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/update-order-status/{id}:
 *   put:
 *     summary: Update order status for seller
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the order status was updated successfully
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/order-refund/{id}:
 *   put:
 *     summary: Give a refund (User)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to refund
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Refund request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the refund request was submitted successfully
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *                 message:
 *                   type: string
 *                   description: Message indicating the success of the refund request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/order-refund-success/{id}:
 *   put:
 *     summary: Accept the refund (Seller)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to accept refund
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Refund accepted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the refund was accepted successfully
 *                 message:
 *                   type: string
 *                   description: Message indicating the success of accepting the refund
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/admin-all-orders:
 *   get:
 *     summary: Get all orders (Admin)
 *     tags: [Orders]
 *     responses:
 *       '201':
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the orders were retrieved successfully
 *                 orders:
 *                   type: array
 *                   description: List of all orders
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the order
 *         cart:
 *           type: array
 *           items:
 *             type: object
 *            
 *         shippingAddress:
 *           type: object
 *           
 *         user:
 *           type: object
 *           
 *         totalPrice:
 *           type: number
 *           description: Total price of the order
 *         status:
 *           type: string
 *           description: Status of the order
 *         paymentInfo:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: ID of the payment information
 *             status:
 *               type: string
 *               description: Status of the payment
 *             type:
 *               type: string
 *               description: Type of payment
 *         paidAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the order was paid
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the order was delivered
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the order was created
 */