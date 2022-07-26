class Home {
  index(req, res) {
    res.status(200).json('LêMania E-Commerce API');
  }
}

export default new Home();
