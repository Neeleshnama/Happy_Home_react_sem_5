/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the event
 *         shopId:
 *           type: string
 *           description: ID of the shop associated with the event
 *         name:
 *           type: string
 *           description: Name of the event
 *         description:
 *           type: string
 *           description: Description of the event
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               public_id:
 *                 type: string
 *               url:
 *                 type: string
 *           description: Array of images associated with the event
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Start date of the event
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: End date of the event
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the event was created
 */

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API endpoints for managing events
 */

/**
 * @swagger
 * /event/create-event:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shopId:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Error occurred while creating the event
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /event/get-all-events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       '201':
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Error occurred while fetching events
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /event/get-all-event/{id}:
 *   get:
 *     summary: Get all events of a shop
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shop
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: List of events of the shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Error occurred while fetching events
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /event/delete-shop-event/{id}:
 *   delete:
 *     summary: Delete an event of a shop
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Event deleted successfully
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
 *         description: Error occurred while deleting the event
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /event/admin-all-events:
 *   get:
 *     summary: Get all events (Admin)
 *     tags: [Events]
 *     responses:
 *       '201':
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Error occurred while fetching events
 *     security:
 *       - bearerAuth: []
 */
