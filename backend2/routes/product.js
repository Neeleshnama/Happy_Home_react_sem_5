/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *         - description
 *         - shop
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         shop:
 *           $ref: '#/components/schemas/Shop'
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               public_id:
 *                 type: string
 *               url:
 *                 type: string
 *         ratings:
 *           type: number
 *           description: The average rating of the product
 *         reviews:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *               productId:
 *                 type: string
 *       example:
 *         name: Product Name
 *         price: 100
 *         category: Category
 *         description: Product description
 *         shop: {}
 *         images: []
 *         ratings: 4.5
 *         reviews: []
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
 *     productIdParam:
 *       in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The ID of the product
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
 *   name: Products
 *   description: product endpoints for managing products
 */

/**
 * @swagger
 * /product/create-product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Bad request or shop not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /product/get-all-products-shop/{id}:
 *   get:
 *     summary: Get all products of a shop
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/shopIdParam'
 *     responses:
 *       '201':
 *         description: Products retrieved successfully
 *       '400':
 *         description: Bad request or shop not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /product/delete-shop-product/{id}:
 *   get:
 *     summary: Delete product of a shop
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/productIdParam'
 *     responses:
 *       '201':
 *         description: Product deleted successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /product/get-all-products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '201':
 *         description: Products retrieved successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /product/create-new-review:
 *   put:
 *     summary: Create a new review for a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *               productId:
 *                 type: string
 *               orderId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Review created successfully
 *       '400':
 *         description: Bad request or product not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /product/admin-all-products:
 *   get:
 *     summary: Get all products (for admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Products retrieved successfully
 *       '500':
 *         description: Internal server error
 */
