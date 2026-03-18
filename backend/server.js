require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// Routes
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const projectRoutes = require('./routes/projectRoutes');
const editorRoutes = require('./routes/editorRoutes');
const templateRoutes = require('./routes/templateRoutes');
const exportRoutes = require('./routes/exportRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const pricingRoutes = require('./routes/pricingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

/**
 * Health Check
 */
app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/videos', videoRoutes);
app.use('/projects', projectRoutes);
app.use('/editor', editorRoutes);
app.use('/templates', templateRoutes);
app.use('/export', exportRoutes);
app.use('/payment', paymentRoutes);
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/pricing', pricingRoutes);
app.use('/contact', contactRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/ai', aiRoutes);

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'D&H Creatives API',
      version: '1.0.0',
      description: 'Node.js APIs for auth, videos, projects, editor, templates, export, payment, admin, users, analytics and AI'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [path.join(__dirname, 'routes', '*.js')]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Error Handler
app.use(errorHandler);

// Start Server
const startServer = async () => {
  const skipDb = process.env.SKIP_DB === 'true';

  try {
    if (!skipDb) {
      await connectDB();
    } else {
      console.warn('SKIP_DB=true, starting server without database connection.');
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
    });

  } catch (error) {
    console.error('Database connection failed.');
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
