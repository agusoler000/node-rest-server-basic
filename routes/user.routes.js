const { Router } = require('express');
const {
  userGet,
  userPost,
  userDelete,
  userPatch,
  userPut,
} = require('../controllers/user.controller');
const router = Router();

router.get('/', userGet);
router.put('/:id', userPut);
router.post('/', userPost);
router.delete('/', userDelete);
router.patch('/', userPatch);

module.exports = router;
