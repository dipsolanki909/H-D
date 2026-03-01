const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

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
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
  app.use(cors());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'D&H Creatives API',
      version: '1.0.0',
      description: 'Node.js APIs for auth, videos, projects, editor, templates, export, payment, and admin'
    },
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: ['./server.js', './routes/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.use('/auth', authRoutes);
app.use('/videos', videoRoutes);
app.use('/projects', projectRoutes);
app.use('/editor', editorRoutes);
app.use('/templates', templateRoutes);
app.use('/export', exportRoutes);
app.use('/payment', paymentRoutes);
app.use('/admin', adminRoutes);
app.use('/pricing', pricingRoutes);
app.use('/contact', contactRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/ai', aiRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});