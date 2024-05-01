/**
 * @swagger
 * components:
 *   schemas:
 *     Shop:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - address
 *         - phoneNumber
 *         - zipCode
 *         - country
 *         - state
 *         - city
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the shop
 *         email:
 *           type: string
 *           description: The email address of the shop
 *         password:
 *           type: string
 *           description: The password of the shop
 *         avatar:
 *           type: object
 *           description: The avatar of the shop
 *           properties:
 *             public_id:
 *               type: string
 *               description: The public id of the avatar
 *             url:
 *               type: string
 *               description: The URL of the avatar
 *         address:
 *           type: string
 *           description: The address of the shop
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the shop
 *         zipCode:
 *           type: string
 *           description: The zip code of the shop
 *         country:
 *           type: string
 *           description: The country of the shop
 *         state:
 *           type: string
 *           description: The state of the shop
 *         city:
 *           type: string
 *           description: The city of the shop
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         message:
 *           type: string
 *           description: Error message
 *       example:
 *         success: false
 *         message: Error message
 *
 *   parameters:
 *     shopIdParam:
 *       in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The ID of the shop
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Shops
 *   description: shop endpoints for managing shops
 */

/**
 * @swagger
 * /shop/create-shop:
 *   post:
 *     summary: Create a new shop
 *     tags: [Shops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       '201':
 *         description: Shop created successfully
 *       '400':
 *         description: Bad request or shop already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/activation:
 *   post:
 *     summary: Activate shop account
 *     tags: [Shops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               activation_token:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Shop account activated successfully
 *       '400':
 *         description: Bad request or invalid token
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/login-shop:
 *   post:
 *     summary: Login shop
 *     tags: [Shops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Shop logged in successfully
 *       '400':
 *         description: Bad request or shop not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/getSeller:
 *   get:
 *     summary: Get shop information
 *     tags: [Shops]
 *     responses:
 *       '200':
 *         description: Shop information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       '400':
 *         description: Bad request or shop not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/logout:
 *   get:
 *     summary: Logout shop
 *     tags: [Shops]
 *     responses:
 *       '201':
 *         description: Shop logged out successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/get-shop-info/{id}:
 *   get:
 *     summary: Get shop information by ID
 *     tags: [Shops]
 *     parameters:
 *       - $ref: '#/components/parameters/shopIdParam'
 *     responses:
 *       '201':
 *         description: Shop information retrieved successfully
 *       '400':
 *         description: Bad request or shop not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/update-shop-avatar:
 *   put:
 *     summary: Update shop avatar
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Shop avatar updated successfully
 *       '400':
 *         description: Bad request or shop not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/update-seller-info:
 *   put:
 *     summary: Update shop information
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               zipCode:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Shop information updated successfully
 *       '400':
 *         description: Bad request or shop not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/admin-all-sellers:
 *   get:
 *     summary: Get all sellers (for admin)
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Sellers retrieved successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/approve-seller/{id}:
 *   put:
 *     summary: Approve seller (admin)
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/shopIdParam'
 *     responses:
 *       '200':
 *         description: Seller verified successfully
 *       '400':
 *         description: Bad request or seller already verified
 *       '404':
 *         description: Seller not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/reject-seller/{id}:
 *   put:
 *     summary: Reject seller (admin)
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/shopIdParam'
 *     responses:
 *       '200':
 *         description: Seller rejected successfully
 *       '400':
 *         description: Bad request or seller already unverified
 *       '404':
 *         description: Seller not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/delete-seller/{id}:
 *   delete:
 *     summary: Delete seller (admin)
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/shopIdParam'
 *     responses:
 *       '201':
 *         description: Seller deleted successfully
 *       '400':
 *         description: Bad request or seller not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/update-payment-methods:
 *   put:
 *     summary: Update seller payment methods
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               withdrawMethod:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Payment methods updated successfully
 *       '400':
 *         description: Bad request or seller not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/delete-withdraw-method:
 *   delete:
 *     summary: Delete seller withdraw method
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Withdraw method deleted successfully
 *       '400':
 *         description: Bad request or seller not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/verified:
 *   get:
 *     summary: Get all verified sellers (for admin)
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Verified sellers retrieved successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/notverified:
 *   get:
 *     summary: Get all not verified sellers (for admin)
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Not verified sellers retrieved successfully
 *       '500':
 *         description: Internal server error
 */
