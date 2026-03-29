const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAll, getOne, create, update, remove
} = require('../controllers/pokemonController');

/**
 * @swagger
 * tags:
 *   name: Pokemon
 *   description: Pokémon data endpoints
 */

/**
 * @swagger
 * /api/pokemon:
 *   get:
 *     summary: Get all Pokémon (public, paginated)
 *     tags: [Pokemon]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page (max 20)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by Pokémon type (e.g. fire, water)
 *     responses:
 *       200:
 *         description: Paginated list of Pokémon
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/pokemon/{id}:
 *   get:
 *     summary: Get a single Pokémon by Pokédex ID (public)
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pokémon data
 *       404:
 *         description: Not found
 */
router.get('/:id', getOne);

/**
 * @swagger
 * /api/pokemon:
 *   post:
 *     summary: Create a new Pokémon (protected)
 *     tags: [Pokemon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [pokedexId, name]
 *             properties:
 *               pokedexId:
 *                 type: integer
 *               name:
 *                 type: string
 *               types:
 *                 type: array
 *                 items:
 *                   type: string
 *               hp:
 *                 type: integer
 *               attack:
 *                 type: integer
 *               defense:
 *                 type: integer
 *               speed:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pokémon created
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, create);

/**
 * @swagger
 * /api/pokemon/{id}:
 *   put:
 *     summary: Update a Pokémon (protected)
 *     tags: [Pokemon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated Pokémon
 *       404:
 *         description: Not found
 */
router.put('/:id', auth, update);

/**
 * @swagger
 * /api/pokemon/{id}:
 *   delete:
 *     summary: Delete a Pokémon (protected)
 *     tags: [Pokemon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', auth, remove);

module.exports = router;
