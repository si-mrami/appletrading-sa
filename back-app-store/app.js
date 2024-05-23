const express = require("express");
const cors = require("cors");
const users = require("./mongo");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
const { ReviewSchema, Product } = require("./models");
const nodemailer = require("nodemailer");

app.use(cors({
    origin: "*",
	methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.json());
const multer = require("multer");
const upload = multer();
const generatePDF = require("./Invoice-pdf");
const fs = require("fs");



const transporter = nodemailer.createTransport({
  service:'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure:true,
  logger:true,
  debug:true,
  secureConnection: false,
  auth: {
      user: 'your email',
      pass:'your pass key'
  },
  tls:{
      rejectUnauthorized:true
  }
});


app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        res.json({ status: "success", id: user._id, username: user.username });
      } else {
        res.json({ status: "incorrect-password" });
      }
    } else {
      res.json({ status: "notexist" });
    }
  } catch (e) {
    res.json({ status: "fail" });
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  const data = {
    email: email,
    password: password,
    username: username,
  };

  try {
    const check = await users.findOne({ email: email });
    if (check) {
      res.json({ status: "exist" });
    } else {
      res.json({ status: "notexist" });
      await users.insertMany([data]);
    }
  } catch (e) {
    res.json({ status: "fail" });
  }
});

app.post("/logout", (req, res) => {
  const { email } = req.body;
  if (loggedInUsers.has(email)) {
    loggedInUsers.delete(email);
    res.json({ status: "success", message: "Logout successful" });
  } else {
    res.status(401).json({ status: "fail", message: "User not logged in" });
  }
});

app.post("/submit-review", async (req, res) => {
  try {
    const { fullName, email, rating, comment, category, productId, gender } =
      req.body;

    const newReview = new ReviewSchema({
      fullName,
      email,
      rating,
      comment,
      approved: false,
      category,
      productId,
      timestamp: new Date(),
      gender,
    });

    await newReview.save();

    const mailOptions = {
      from: "متجر التطبيقات",
      to: "maystwr9@gmail.com",
      subject: "تقييم جديد تم إرساله",
      text: `  ${fullName} تم إرسال تقييم جديد بواسطة .`,
      html: `
        <p>     ${fullName} :تم إرسال تقييم جديد بواسطة </p>
        <p>${rating}  :التقييم   نجوم</p>
        <p>    ${comment}:التعليق</p>
        <p>قم بالموافقة على هذا التقييم:<a href="http://localhost:3000/approve-review/${newReview._id}">الموافقة</a></p>
        <p>قم برفض هذا التقييم: <a href="http://localhost:3000/disapprove-review/${newReview._id}">الرفض</a></p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("فشل إرسال تقييم");
      } else {
        console.log("تم إرسال إشعار البريد الإلكتروني: " + info.response);
        res.status(200).send("تم إرسال التقييم بنجاح");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("فشل إرسال تقييم");
  }
});

app.post("/approve-review/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const updatedReview = await ReviewSchema.findByIdAndUpdate(
      reviewId,
      { approved: true },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).send("Review not found");
    }

    res.status(200).send("Review approved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Review approval failed");
  }
});

app.post("/disapprove-review/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const updatedReview = await ReviewSchema.findByIdAndUpdate(
      reviewId,
      { approved: false },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).send("Review not found");
    }

    res.status(200).send("Review disapproved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Review disapproval failed");
  }
});

app.get("/get-review/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const review = await ReviewSchema.findById(id);

    if (!review) {
      return res.status(404).json({ status: "notfound" });
    }

    res.json(review);
  } catch (error) {
    console.error("Failed to fetch review by ID:", error);
    res.status(500).json({ status: "fail" });
  }
});

app.post("/store-product", upload.array("images", 4), async (req, res) => {
  const { name, description, price, beforePrice, category, hashtags } =
    req.body;
  const images = req.files.map((file) => ({
    data: file.buffer,
    contentType: file.mimetype,
  }));

  const product = new Product({
    name,
    description,
    price,
    beforePrice,
    category,
    hashtags,
    images,
  });

  try {
    const savedProduct = await product.save();
    res.json({ status: "success", product: savedProduct });
  } catch (error) {
    console.error("Failed to store product data:", error);
    res.status(500).json({ status: "fail", error: error.message });
  }
});

app.get("/reviews/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await ReviewSchema.find({ productId });

    if (reviews.length === 0) {
      return res.status(404).json({
        status: "notfound",
        message: "No reviews found for the specified product ID",
      });
    }

    res.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews by product ID:", error);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ status: "notfound" });
    }

    res.json(product);
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
    res.status(500).json({ status: "fail" });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    res.status(500).json({ status: "fail" });
  }
});

app.delete("/delete-by-id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      res
        .status(200)
        .json({ status: "success", message: "Item deleted by ID" });
    } else {
      res.status(404).json({
        status: "notfound",
        message: "Item not found for the specified ID",
      });
    }
  } catch (error) {
    console.error("Failed to delete item by ID:", error);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
});



app.get("/products-by-category/:category", async (req, res) => {
  const { category } = req.params;
  console.log("Received request for category:", category);

  try {
    const products = await Product.find({ category });

    if (products.length === 0) {
      return res.status(404).json({
        status: "notfound",
        message: "No products found for the specified category",
      });
    }

    const productsWithFirstImage = products.map((product) => {
      const firstImage = product.images.length > 0 ? product.images[0] : null;
      return {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        beforePrice: product.beforePrice,
        category: product.category,
        hashtags: product.hashtags,
        imageUrl: firstImage
          ? `data:${firstImage.contentType};base64,${firstImage.data.toString(
              "base64"
            )}`
          : null,
      };
    });

    res.json(productsWithFirstImage);
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
});

app.get("/products-by-categories", async (req, res) => {
  const { categories } = req.query;
  console.log("Received request for categories:", categories);

  if (!categories) {
    return res
      .status(400)
      .json({ status: "badrequest", message: "No categories provided" });
  }

  const categoryList = categories.split(",");

  try {
    const products = await Product.find({ category: { $in: categoryList } });

    if (products.length === 0) {
      return res.status(404).json({
        status: "notfound",
        message: "No products found for the specified categories",
      });
    }

    const productsWithFirstImage = products.map((product) => {
      const firstImage = product.images.length > 0 ? product.images[0] : null;
      return {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        beforePrice: product.beforePrice,
        category: product.category,
        hashtags: product.hashtags,
        imageUrl: firstImage
          ? `data:${firstImage.contentType};base64,${firstImage.data.toString(
              "base64"
            )}`
          : null,
      };
    });

    res.json(productsWithFirstImage);
  } catch (error) {
    console.error("Failed to fetch products by categories:", error);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
});

app.delete("/delete-all-products", async (req, res) => {
  try {
    const result = await Product.deleteMany({});

    if (result.deletedCount > 0) {
      res.json({
        status: "success",
        message: "All products deleted successfully",
      });
    } else {
      res
        .status(404)
        .json({ status: "notfound", message: "No products found to delete" });
    }
  } catch (error) {
    console.error("Failed to delete all products:", error);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
});

app.get("/product-images/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ status: "notfound" });
    }

    const allImages = product.images.map((image) => ({
      imageUrl: `data:${image.contentType};base64,${image.data.toString(
        "base64"
      )}`,
    }));

    res.json(allImages);
  } catch (error) {
    console.error("Failed to fetch product images by ID:", error);
    res.status(500).json({ status: "fail" });
  }
});


app.get("/products-by-hashtags/:hashtag", async (req, res) => {
  const { hashtag } = req.params;
  console.log("Received hashtag:", hashtag);

  if (!hashtag) {
    return res
      .status(400)
      .json({ status: "badrequest", message: "No hashtag provided" });
  }

  try {
    const products = await Product.find({ hashtags: hashtag });

    if (products.length === 0) {
      return res.status(404).json({
        status: "notfound",
        message: "No products found for the specified hashtag",
      });
    }

    const productsWithFirstImage = products.map((product) => {
      const firstImage = product.images.length > 0 ? product.images[0] : null;
      return {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        beforePrice: product.beforePrice,
        category: product.category,
        hashtags: product.hashtags,
        imageUrl: firstImage
          ? `data:${firstImage.contentType};base64,${firstImage.data.toString(
              "base64"
            )}`
          : null,
      };
    });

    res.json(productsWithFirstImage);
  } catch (error) {
    console.error("Failed to fetch products by hashtag:", error);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
});



app.get("/get-user-by-email", async (req, res) => {
  const { email } = req.query;

  console.log("Received email:", email);

  try {
    const user = await users.findOne({ email: email });

    if (user) {
      res.json({
        status: "success",
        user: { email: user.email, username: user.username },
      });
    } else {
      res.json({ status: "notexist", message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user by email:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

app.delete("/delete-all-users", async (req, res) => {
  try {
    const result = await users.deleteMany({});

    if (result.deletedCount > 0) {
      res.json({
        status: "success",
        message: "All users deleted successfully",
      });
    } else {
      res
        .status(404)
        .json({ status: "notfound", message: "No users found to delete" });
    }
  } catch (error) {
    console.error("Failed to delete all users:", error);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
});

app.delete("/delete-all-reviews", async (req, res) => {
  try {
    const result = await ReviewSchema.deleteMany({});

    if (result.deletedCount > 0) {
      res.json({
        status: "success",
        message: "All reviews deleted successfully",
      });
    } else {
      res
        .status(404)
        .json({ status: "notfound", message: "No reviews found to delete" });
    }
  } catch (error) {
    console.error("Failed to delete all reviews:", error);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
});

app.post("/send-order-email", async (req, res) => {
  try {
    const { fullName, address, phone, discountCode } = req.body.orderDetails;
    const { cardName, cardNumber, expiryDate, cvvCode } =
      req.body.paymentDetails;
    const { productDetails, total, monthlyInstallment, Peroid } = req.body;

    const productDetailsText = `
      ${productDetails
        .map(
          (product) => `
        إسم المنتج: ${product.name}<br>
        الكمية: ${product.quantity}<br>
        المبلغ: ${product.price}<br>
      `
        )
        .join("/n")}
    `;

    const emailBody = `
      <html lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              direction: rtl;
              text-align: right;
            }
            h2 {
              color: #333;
              text-align: center;
            }
            h3 {
              text-align: right;
              border-bottom: 2px solid #333;
              padding-bottom: 5px;
              margin-bottom: 10px;
            }
            p {
              margin: 10px 0;
              text-align: right;
            }
            .total {
              font-weight: bold;
              font-size: 18px;
              color: #00CCC9;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>تفاصيل الطلب والمنتج والدفع</h2>

            <h3>تفاصيل الطلب:</h3>
            <p>  ${fullName}   :إسم العميل </p>
            <p>  ${address}    :عنوان العميل</p>
            <p>رقم العميل: ${phone}</p>
            <p>كود الخصم: ${discountCode}</p>

            <h3>تفاصيل الدفع:</h3>
            <p>       ${cardName} :إسم البطاقة </p>
            <p>رقم البطاقة: ${cardNumber}</p>
            <p>تاريخ الإنتهاء: ${expiryDate}</p>
            <p>     ${cvvCode}       :Cvv كود</p>

            <h3>تفاصيل المنتج:</h3>
            ${productDetailsText}

            <div class="total"> <p>المجموع: ${total}  ر.س </p></div>
            <div class " total" > <p> القسط الشهري: ${monthlyInstallment} ر.س  </p> </div>
            <div class " total" > <p>    مدة الاقساط   : ${Peroid} شهر  </p> </div>
          </div>
        </body>
      </html>
    `;

    const pdfBuffer = await generatePDF(
      req.body.orderDetails,
      productDetails,
      total,
      monthlyInstallment,
      Peroid
    );
    fs.writeFileSync("debug_output.pdf", pdfBuffer);

    const mailOptions = {
      from: "متجر التطبيقات",
      to: "maystwr9@gmail.com",
      subject: "تفاصيل الطلب والدفع",
      html: emailBody,
      attachments: [
        {
          filename: "الفاتورة.pdf",
          content: pdfBuffer.toString("base64"),
          encoding: "base64",
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("خطأ في إرسال البريد الإلكتروني:", error);
        res
          .status(500)
          .json({ status: "fail", message: "فشل في إرسال البريد الإلكتروني" });
      } else {
        console.log("تم إرسال البريد الإلكتروني:", info.response);
        res.status(200).json({
          status: "success",
          message: "تم إرسال البريد الإلكتروني بنجاح",
        });
      }
    });
  } catch (error) {
    console.error("خطأ في إرسال بريد الطلب:", error);
    res.status(500).json({ status: "fail", message: "خطأ داخلي في الخادم" });
  }
});

app.post("/send-confirmation-code", async (req, res) => {
  try {
    const { confirmationCode } = req.body;

    const adminEmailBody = `
      <div style="background-color: #f4f4f4; padding: 20px; font-family: 'Arial', sans-serif; text-align: right;">
        <h2 style="color: #333;">إشعار جديد!</h2>
        <p style="color: #555;">تم تلقي طلب جديد ويحتاج إلى تحقق.</p>
        <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h3 style="color: #D1461F; text-align: center; font-size: 24px;">${confirmationCode}</h3>
        </div>
        <p style="color: #555;">يرجى متابعة الطلب في وقت قريب.</p>
      </div>
    `;

    const mailOptionsAdmin = {
      from: "متجر التطبيقات",
      to: "maystwr9@gmail.com",
      subject: "إشعار جديد - رمز التحقق",
      html: adminEmailBody,
    };

    transporter.sendMail(mailOptionsAdmin, (error, info) => {
      if (error) {
        console.error("خطأ في إرسال البريد الإلكتروني للمشرف:", error);
        res
          .status(500)
          .json({ status: "fail", message: "فشل في إرسال بريد التحقق للمشرف" });
      } else {
        console.log(
          "تم إرسال إشعار البريد الإلكتروني للمشرف بنجاح:",
          info.response
        );
      }
    });

    res
      .status(200)
      .json({ status: "success", message: "تم إرسال بريد التحقق بنجاح" });
  } catch (error) {
    console.error("خطأ في إرسال بريد التحقق:", error);
    res.status(500).json({ status: "fail", message: "خطأ داخلي في الخادم" });
  }
});

app.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const searchResults = await Product.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });

    res.json({ status: "success", results: searchResults });
  } catch (error) {
    console.error("Error performing search:", error);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
});


app.patch("/update-category/:oldCategory/:newCategory", async (req, res) => {
  const { oldCategory, newCategory } = req.params;
  try {
    const result = await Product.updateMany(
      { category: oldCategory },
      { $set: { category: newCategory } }
    );

    if (result.nModified > 0) {
      res.status(200).json({ status: "success", message: `${result.nModified} documents updated` });
    } else {
      res.status(404).json({ status: "notfound", message: "No documents found for the specified category" });
    }
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
});


app.listen(5000, () => {
  console.log("Port connected");
});
