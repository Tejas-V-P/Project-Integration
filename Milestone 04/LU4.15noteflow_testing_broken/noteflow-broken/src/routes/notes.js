// src/routes/notes.js

const express = require('express');
const router  = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/notes
// Creates a new note
// ✅ FIXED: Added validation for title field
router.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // ✅ FIXED: Validate that title exists and is not empty
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(422).json({ message: 'Title is required and must not be empty' });
    }

    const note = await prisma.note.create({
      data: { title: title.trim(), content }
    });

    res.status(201).json({ note });
  } catch (err) {
    next(err);
  }
});

// GET /api/notes/:id
// Returns a single note by ID
// ❌ FLAW: Returns wrong response shape on 404.
//    Returns { error: 'Not found' } but tests expect { message: 'Note not found' }.
//    Fix required: change response body to match the expected contract.
router.get('/:id', async (req, res, next) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!note) {
      // ✅ FIXED: Returns correct response shape with 'message' key
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ note });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
