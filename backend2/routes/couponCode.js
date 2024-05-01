/**
 * @swagger
 * components:
 *   schemas:
 *     CouponCode:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the coupon code
 *         name:
 *           type: string
 *           description: Name of the coupon code
 *         value:
 *           type: number
 *           description: Value of the coupon code
 *         shopId:
 *           type: string
 *           description: ID of the shop associated with the coupon code
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the coupon code was created
 */

/**
 * @swagger
 * tags:
 *   name: Coupon Codes
 *   description: API endpoints for managing coupon codes
 */

/**
 * @swagger
 * /coupon/create-coupon-code:
 *   post:
 *     summary: Create a new coupon code
 *     tags: [Coupon Codes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Coupon code created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CouponCode'
 *       '400':
 *         description: Error occurred while creating the coupon code
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /coupon/get-coupon/{id}:
 *   get:
 *     summary: Get all coupons of a shop
 *     tags: [Coupon Codes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shop
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: List of coupons of the shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 couponCodes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CouponCode'
 *       '400':
 *         description: Error occurred while fetching coupons
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /coupon/delete-coupon/{id}:
 *   delete:
 *     summary: Delete a coupon code of a shop
 *     tags: [Coupon Codes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon code
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Coupon code deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '400':
 *         description: Error occurred while deleting the coupon code
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /coupon/get-coupon-value/{name}:
 *   get:
 *     summary: Get coupon code value by its name
 *     tags: [Coupon Codes]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of the coupon code
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Coupon code found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 couponCode:
 *                   $ref: '#/components/schemas/CouponCode'
 *       '400':
 *         description: Error occurred while fetching the coupon code
 */
