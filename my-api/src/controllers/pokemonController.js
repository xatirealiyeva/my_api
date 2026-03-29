const Pokemon = require('../models/Pokemon');
const redis = require('../config/redis');

const CACHE_TTL = 60;

exports.getAll = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(20, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;
    const type  = req.query.type || '';

    const cacheKey = `pokemon:page=${page}:limit=${limit}:type=${type}`;
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const filter = type ? { types: type.toLowerCase() } : {};
    const total  = await Pokemon.countDocuments(filter);
    const data   = await Pokemon.find(filter).skip(skip).limit(limit);

    const result = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data
    };

    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const cacheKey = `pokemon:${req.params.id}`;
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const pokemon = await Pokemon.findOne({ pokedexId: req.params.id });
    if (!pokemon) return res.status(404).json({ error: 'Pokémon not found' });

    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(pokemon));
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const pokemon = await Pokemon.create(req.body);
    await redis.flushdb();
    res.status(201).json(pokemon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const pokemon = await Pokemon.findOneAndUpdate(
      { pokedexId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!pokemon) return res.status(404).json({ error: 'Pokémon not found' });

    await redis.del(`pokemon:${req.params.id}`);
    res.json(pokemon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const pokemon = await Pokemon.findOneAndDelete({ pokedexId: req.params.id });
    if (!pokemon) return res.status(404).json({ error: 'Pokémon not found' });

    await redis.del(`pokemon:${req.params.id}`);
    res.json({ message: 'Pokémon deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
