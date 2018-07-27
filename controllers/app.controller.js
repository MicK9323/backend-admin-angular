exports.appTest = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Response get successfully'
  });
}
