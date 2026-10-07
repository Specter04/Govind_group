import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const { Pool } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const app = express();
const port = process.env.PORT || 3000;

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL is not set. /api/enquiries will return 500 until it is configured.');
}

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : null;

app.use(express.json({ limit: '50kb' }));
app.use(express.static(join(rootDir, 'dist')));

app.post('/api/enquiries', async (req, res) => {
  if (!pool) {
    return res.status(500).json({ error: 'Database is not configured.' });
  }

  const {
    name,
    phone,
    email,
    enquiryType,
    project,
    projectSlug,
    message,
  } = req.body ?? {};

  if (!name || !phone || !email || !enquiryType || !project) {
    return res.status(400).json({ error: 'Name, phone, email, enquiry type, and project are required.' });
  }

  try {
    const result = await pool.query(
      `
        INSERT INTO "govind group clients"
          (name, phone, email, enquiry_type, project, project_slug, message, source_page, user_agent)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, 'contact', $8)
        RETURNING id, created_at;
      `,
      [
        String(name).trim(),
        String(phone).trim(),
        String(email).trim(),
        String(enquiryType).trim(),
        String(project).trim(),
        projectSlug ? String(projectSlug).trim() : null,
        message ? String(message).trim() : null,
        req.get('user-agent') ?? null,
      ],
    );

    return res.status(201).json({ ok: true, enquiry: result.rows[0] });
  } catch (error) {
    console.error('Failed to save enquiry', error);
    return res.status(500).json({ error: 'Failed to save enquiry.' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(join(rootDir, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Govind Group site listening on http://localhost:${port}`);
});
