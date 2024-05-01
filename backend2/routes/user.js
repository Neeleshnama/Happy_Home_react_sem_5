/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - country
 *         - state
 *         - city
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         country:
 *           type: string
 *           description: The country of the user
 *         state:
 *           type: string
 *           description: The state of the user
 *         city:
 *           type: string
 *           description: The city of the user
 *         avatar:
 *           type: object
 *           description: The avatar of the user
 *           properties:
 *             public_id:
 *               type: string
 *               description: The public id of the avatar
 *             url:
 *               type: string
 *               description: The URL of the avatar
 *
 *     ResetToken:
 *       type: object
 *       required:
 *         - email
 *         - token
 *       properties:
 *         email:
 *           type: string
 *           description: The email address of the user
 *         token:
 *           type: string
 *           description: The reset token
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
 *     userIdParam:
 *       in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The ID of the user
 *     activationToken:
 *       in: formData
 *       name: activation_token
 *       type: string
 *       required: true
 *       description: The activation token for activating the user account
 *     newPassword:
 *       in: formData
 *       name: newPassword
 *       type: string
 *       required: true
 *       description: The new password for resetting the user's password
 *     token:
 *       in: path
 *       name: token
 *       type: string
 *       required: true
 *       description: The reset token
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
 *   name: Users
 *   description: user endpoints for managing users
 */

/**
 * @swagger
 * /user/create-user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               country:
 *                 type: string
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request or user already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/activation:
 *   post:
 *     summary: Activate user account
 *     tags: [Users]
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
 *         description: User account activated successfully
 *       '400':
 *         description: Bad request or invalid token
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/login-user:
 *   post:
 *     summary: Login user
 *     tags: [Users]
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
 *         description: User logged in successfully
 *       '400':
 *         description: Bad request or user not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/getuser:
 *   get:
 *     summary: Get user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request or user not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Users]
 *     responses:
 *       '201':
 *         description: User logged out successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/update-user-info:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User information updated successfully
 *       '400':
 *         description: Bad request or user not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/update-avatar:
 *   put:
 *     summary: Update user avatar
 *     tags: [Users]
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
 *         description: User avatar updated successfully
 *       '400':
 *         description: Bad request or user not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/update-user-addresses:
 *   put:
 *     summary: Update user addresses
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressType:
 *                 type: string
 *               _id:
 *                 type: string
 *               
 *     responses:
 *       '200':
 *         description: User addresses updated successfully
 *       '400':
 *         description: Bad request or user not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/delete-user-address/{id}:
 *   delete:
 *     summary: Delete user address
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     responses:
 *       '200':
 *         description: User address deleted successfully
 *       '400':
 *         description: Bad request or user not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/update-user-password:
 *   put:
 *     summary: Update user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User password updated successfully
 *       '400':
 *         description: Bad request or user not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Password reset email sent successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/reset-password/{token}:
 *   post:
 *     summary: Reset password
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/token'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *       '404':
 *         description: Invalid or expired reset token
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/user-info/{id}:
 *   get:
 *     summary: Get user information by ID
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     responses:
 *       '201':
 *         description: User information retrieved successfully
 *       '400':
 *         description: Bad request or user not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/admin-all-users:
 *   get:
 *     summary: Get all users (for admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Users retrieved successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/delete-user/{id}:
 *   delete:
 *     summary: Delete user (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/userIdParam'
 *     responses:
 *       '201':
 *         description: User deleted successfully
 *       '400':
 *         description: Bad request or user not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/adminlogin:
 *   post:
 *     summary: Admin login
 *     tags: [Users]
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
 *       '200':
 *         description: Admin logged in successfully
 *       '400':
 *         description: Bad request or user not found
 *       '401':
 *         description: Invalid credentials
 *       '403':
 *         description: Access denied. Not an admin
 *       '500':
 *         description: Internal server error
 */
