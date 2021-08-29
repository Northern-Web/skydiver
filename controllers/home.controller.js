exports.getIndexPage = (req, res) => {
  res.status(200).render('home/index', {
    pageTitle: 'Skydiver',
    path: '/'
  });
};
