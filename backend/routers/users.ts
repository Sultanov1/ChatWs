import User from '../models/User';
import { imagesUpload } from '../multer';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        res.status(400).send({ error: 'This username is already registered.' });
        return ;
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      active: true,
    });

    user.generateToken();

    await user.save();
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(422).send({ error: 'User not found!' });
      return;
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      res.status(422).send({ error: 'Password is wrong!' });
      return;
    }

    user.active = true;
    user.generateToken();
    await user.save();

    res.send({ message: 'Username and password are correct!', user });
  } catch (error) {
    next(error);
  }
});

export default userRouter;
