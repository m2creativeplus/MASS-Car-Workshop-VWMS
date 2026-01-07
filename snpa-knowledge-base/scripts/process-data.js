import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const INPUT_FILE = path.join(DATA_DIR, 'conversations.json');
const OUTPUT_DIR = path.join(DATA_DIR, 'knowledge');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

interface Message {
  id: string;
  author: { role: string };
  create_time: number;
  content: { parts: string[] };
}

interface Conversation {
  id: string;
  title: string;
  create_time: number;
  mapping: Record<string, { message: Message | null }>;
}

async function processConversations() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Error: File not found at ${INPUT_FILE}`);
    console.log('Please export your ChatGPT conversations to JSON and place the file at snpa-knowledge-base/data/conversations.json');
    process.exit(1);
  }

  console.log('Reading conversations.json...');
  const rawData = fs.readFileSync(INPUT_FILE, 'utf-8');
  const conversations: Conversation[] = JSON.parse(rawData);

  console.log(`Found ${conversations.length} conversations. Filtering for SNPA content...`);

  const snpaConversations = conversations.filter(conv => {
    const title = conv.title || '';
    // Check title for keywords
    if (/SNPA|Productivity|Somaliland/i.test(title)) return true;
    
    // deeply check content (expensive, but necessary if titles are generic)
    const messages = Object.values(conv.mapping).map(m => m.message).filter(Boolean);
    const fullText = messages.map(m => m?.content?.parts?.join(' ')).join(' ');
    return /SNPA|National Productivity Agency/i.test(fullText);
  });

  console.log(`Found ${snpaConversations.length} relevant conversations.`);

  const knowledgeItems = [];

  for (const conv of snpaConversations) {
    const messages = Object.values(conv.mapping)
      .map(m => m.message)
      .filter(m => m && m.content && m.content.parts && m.content.parts.length > 0)
      .sort((a, b) => (a!.create_time || 0) - (b!.create_time || 0));

    let markdownContent = `# ${conv.title}\n\n`;
    markdownContent += `**Date:** ${new Date(conv.create_time * 1000).toLocaleDateString()}\n\n`;

    for (const msg of messages) {
      const role = msg!.author.role === 'assistant' ? '🤖 AI' : '👤 User';
      const text = msg!.content.parts.join('\n');
      markdownContent += `### ${role}\n${text}\n\n---\n\n`;
    }

    const safeTitle = conv.title.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 50);
    const fileName = `${safeTitle}_${conv.id.substring(0, 8)}.md`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    fs.writeFileSync(filePath, markdownContent);
    console.log(`Saved: ${fileName}`);

    // Add to index
    knowledgeItems.push({
      id: conv.id,
      title: conv.title,
      content: messages.length > 0 ? messages[0]!.content.parts.join(' ').substring(0, 200) + '...' : '',
      category: detectCategory(conv.title),
      source: 'ChatGPT Export',
      createdAt: new Date(conv.create_time * 1000).toISOString().split('T')[0],
      tags: ['imported', ...detectTags(conv.title)],
      filePath: fileName
    });
  }

  // Save index for frontend
  const indexFile = path.join(DATA_DIR, 'knowledge-index.json');
  fs.writeFileSync(indexFile, JSON.stringify(knowledgeItems, null, 2));
  console.log(`Index saved to ${indexFile}`);
}

function detectCategory(title: string): string {
  if (/policy|law|act/i.test(title)) return 'Policy';
  if (/report|audit|stat/i.test(title)) return 'Report';
  if (/plan|strategy|roadmap/i.test(title)) return 'Strategy';
  return 'General';
}

function detectTags(title: string): string[] {
  const tags = [];
  if (/productivity/i.test(title)) tags.push('productivity');
  if (/digital/i.test(title)) tags.push('digital');
  if (/reform/i.test(title)) tags.push('reform');
  return tags;
}

processConversations().catch(console.error);
