function faqsController(Faqs) {
  function post(req, res) {
    const faq = new Faqs(req.body);
    faq.save();
    res.status(201);
    return res.json(faq);
  }
  function get(req, res) {
    const query = {};
    Faqs.find(query, (err, faqs) => {
      if (err) {
        return res.send(err);
      }
      return res.json(faqs);
    });
  }
  return { post, get };
}

module.exports = faqsController;
