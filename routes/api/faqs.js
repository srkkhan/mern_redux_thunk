/* eslint-disable no-param-reassign */
const express = require('express');
const faqsController = require('../../controllers/faqsController');

function routes(Faqs) {
  const faqRouter = express.Router();
  const controller = faqsController(Faqs);
  faqRouter.route('/faqs')
    .post(controller.post)
    .get(controller.get);
  faqRouter.use('/faqs/:faqid', (req, res, next) => {
    Faqs.findById(req.params.faqid, (err, faq) => {
      if (err) {
        return res.send(err);
      }
      if (faq) {
        req.faq = faq;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  faqRouter.route('/faqs/:faqid')
    .get((req, res) => {
      const returnFaq = req.faq.toJSON();
      res.json(returnFaq);
    })
    .put((req, res) => {
      console.log("in put");
      console.log(req.faq);
      console.log(req.body);
      req.faq.question = req.body.question;
      req.faq.answer = req.body.answer;
      req.faq.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(req.faq);
      });
    })
    .patch((req, res) => {
      const { faq } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        faq[key] = value;
      });
      req.faq.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(faq);
      });
    })
    .delete((req, res) => {
      req.faq.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return faqRouter;
}

module.exports = routes;
