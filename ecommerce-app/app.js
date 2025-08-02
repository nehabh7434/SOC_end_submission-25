require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce',
  password: 'Neha@123',
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function isLoggedIn(req, res, next) {
  if (req.session.userId) return res.redirect('/dashboard');
  next();
}

function isAuthenticated(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Products');
    res.render('home-page', { products: result.rows });
  } catch (error) {
    console.error(error);
    res.send('Server error');
  }
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', isLoggedIn, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id',
      [username, email, hashedPassword]
    );
    req.session.userId = result.rows[0].user_id;
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.send('Signup failed: ' + err.detail);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user.user_id;
      res.redirect('/dashboard');
    } else {
      res.send('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    res.send('Login failed');
  }
});

app.get('/dashboard', isAuthenticated, async (req, res) => {
  res.render('dashboard');
});

app.get('/list-products', isAuthenticated, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY product_id');
    res.render('products', { products: result.rows });
  } catch (err) {
    res.send('Error loading products');
  }
});

app.get('/add-to-cart', isAuthenticated, (req, res) => {
  res.render('add-to-cart');
});

app.post('/add-to-cart', isAuthenticated, async (req, res) => {
  const product_id = Number(req.body.product_id);
  const quantity = Number(req.body.quantity);
  const userId = req.session.userId;

  try {
    const productCheck = await pool.query('SELECT * FROM products WHERE product_id = $1', [product_id]);
    if (productCheck.rowCount === 0) return res.send('Product not found');

    if (quantity > productCheck.rows[0].stock) return res.send('Insufficient stock');

    const cartCheck = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1 AND item_id = $2',
      [userId, product_id]
    );

    if (cartCheck.rowCount > 0) {
      await pool.query(
        'UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND item_id = $3',
        [quantity, userId, product_id]
      );
    } else {
      await pool.query(
        'INSERT INTO cart(user_id, item_id, quantity) VALUES ($1, $2, $3)',
        [userId, product_id, quantity]
      );
    }

    res.redirect('/display-cart');
  } catch (err) {
    console.error(err);
    res.send('Failed to add product to cart');
  }
});

app.get('/remove-from-cart', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const cartItems = await pool.query(`
      SELECT c.item_id AS product_id, p.name 
      FROM cart c
      JOIN products p ON c.item_id = p.product_id
      WHERE c.user_id = $1
    `, [userId]);
    
    res.render('remove-from-cart', { cartItems: cartItems.rows });
  } catch (err) {
    console.error(err);
    res.send('Error loading cart items');
  }
});

app.post('/remove-from-cart', isAuthenticated, async (req, res) => {
  const product_id = Number(req.body.product_id);
  const userId = req.session.userId;

  try {
    const itemExists = await pool.query(
      'SELECT 1 FROM cart WHERE user_id = $1 AND item_id = $2',
      [userId, product_id]
    );

    if (itemExists.rowCount === 0) {
      return res.status(404).send('Item not found in your cart');
    }

    await pool.query(
      'DELETE FROM cart WHERE user_id = $1 AND item_id = $2',
      [userId, product_id]
    );

    res.redirect('/display-cart');
  } catch (err) {
    console.error('Error removing item:', err);
    res.status(500).send('Error removing item');
  }
});

app.get('/display-cart', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;

  try {
    const result = await pool.query(`
      SELECT c.item_id AS product_id, p.name, p.price, c.quantity
      FROM cart c
      JOIN products p ON c.item_id = p.product_id
      WHERE c.user_id = $1
    `, [userId]);

    res.render('display-cart', { cartItems: result.rows });
  } catch (err) {
    console.error(err);
    res.send('Failed to load cart');
  }
});

app.post('/place-order', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  console.log("🔥 /place-order hit, userId =", userId);

  try {
    if (!userId) {
      console.error("❌ No session userId!");
      return res.redirect('/login');
    }

    await pool.query('DELETE FROM cart WHERE user_id = $1', [userId]);
    console.log("✅ Order placed, cart cleared");
    res.redirect('/order-confirmation');
  } catch (err) {
    console.error("❌ Error in /place-order:", err);
    res.status(500).send('Failed to place order');
  }
});

app.get('/order-confirmation', isAuthenticated, async (req, res) => {
  res.render('order-confirmation');
});


