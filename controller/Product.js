const model = require("../model/Product");
const Product = model.Product;

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let query = Product.find({});
  let totalProductQuery = Product.find({});

  //filter-category

  if (req.query.category) {
    query = query.find({ category: {$in:req.query.category.split(',')} });
    totalProductQuery = totalProductQuery.find(
      { category: {$in:req.query.category.split(',')} }
    );
  }

  if (req.query.brand) {
    query = query.find({ brand: {$in:req.query.brand.split(',')} });
    totalProductQuery = totalProductQuery.find({
      brand: {$in:req.query.brand.split(',')}
    });
  }

  //sorting

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  //Pagination

  if (req.query._page && req.query._per_page) {
    const pageSize = req.query._per_page;
    const page = req.query._page;

    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  const totalDocs = await totalProductQuery.countDocuments().exec();
  try {
    const doc = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(doc);
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
 const {id}=req.params
  try {
    const product = await Product.findById(id);
    res.status(201).json(product);
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};


exports.updateProduct = async (req, res) => {
  const {id}=req.params
   try {
     const product = await Product.findByIdAndUpdate(id,req.body,{new:true});
     res.status(201).json(product);
   } catch (err) {
     console.error({ err });
     res.status(400).json(err);
   }
 };
 