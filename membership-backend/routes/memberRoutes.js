const express = require('express');
const {
  addMember,
  getMembers,
  updateMember,
  deleteMember,
  getMemberById
} = require('../controllers/memberController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.use(verifyToken);

router.post('/', addMember);
router.get('/', getMembers);
router.get('/:id', getMemberById);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
