const router = require('express').Router();
const { Article, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
   
    const articleData = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

   
    const articles = articleData.map((article) => article.get({ plain: true }));


    res.render('homepage', { 
      articles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/article/:id', async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const article = articleData.get({ plain: true });

    res.render('article', {
      ...article,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/profile', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Article }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
