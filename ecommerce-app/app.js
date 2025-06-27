require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const app = express();
const port = 3000;


// TODO: Update PostgreSQL connection credentials before running the server
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce',
  password: 'Neha@123',
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Set up session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    return res.redirect('/dashboard');  // Redirect to dashboard or home page
  }
  next();  // If not logged in, proceed to the signup/login page
}

// TODO: Implement authentication middleware
// Redirect unauthenticated users to the login page
function isAuthenticated(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}


// Route: Home page
app.get('/', async (req, res) => {
  try {
    // Query to get all products
    const result = await pool.query('SELECT * FROM Products');
    
    // Render the 'home-page' template, 
    // passing the retrieved product data to the template 
    // for rendering within the page.
    res.render('home-page', { products: result.rows });
  } catch (error) {
    console.error(error);
    res.send('Server error');
  }
});


// Route: Signup page
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



// Route: Login page 
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


// TODO: Implement user login logic


// Route: Dashboard page (requires authentication)
// TODO: Render the dashboard page
app.get('/dashboard', isAuthenticated, async (req, res) => {
  res.render('dashboard');
});


// Route: List products
// TODO: Fetch and display all products from the database
app.get('/list-products', isAuthenticated, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY product_id');
    res.render('products', { products: result.rows });
  } catch (err) {
    res.send('Error loading products');
  }
});


// Route: Add product to cart
// TODO: Implement "Add to Cart" functionality
app.get('/add-to-cart', isAuthenticated, (req, res) => {
  res.render('add-to-cart');
});

app.post('/add-to-cart', isAuthenticated, async (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.session.userId;

  try {
    const productCheck = await pool.query('SELECT * FROM products WHERE product_id = $1', [product_id]);
    if (productCheck.rowCount === 0) return res.send('Product not found');

    if (quantity > productCheck.rows[0].stock) return res.send('Insufficient stock');

    const cartCheck = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
      [userId, product_id]
    );

    if (cartCheck.rowCount > 0) {
      await pool.query(
        'UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3',
        [quantity, userId, product_id]
      );
    } else {
      await pool.query(
        'INSERT INTO cart(user_id, product_id, quantity) VALUES ($1, $2, $3)',
        [userId, product_id, quantity]
      );
    }

    res.send('Product added to cart');
  } catch (err) {
    console.error(err);
    res.send('Failed to add product to cart');
  }
});



// Route: Remove product from cart
// TODO: Implement "Remove from Cart" functionality
app.get('/remove-from-cart', isAuthenticated, async (req, res) => {
  res.render('remove-from-cart');
});

app.post('/remove-from-cart', isAuthenticated, async (req, res) => {

});


// Route: Display cart
// TODO: Retrieve and display the user's cart items
app.get('/display-cart', isAuthenticated, async (req, res) => {

});


// Route: Place order (clear cart)
// TODO: Implement order placement logic
app.post('/place-order', isAuthenticated, async (req, res) => {

});


// Route: Order confirmation
// TODO: Display order confirmation details
app.get('/order-confirmation', isAuthenticated, async (req, res) => {

});


// Route: Logout (destroy session)
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out');
    }
    res.redirect('/login');
  });
});