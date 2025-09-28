# MGX → React + TypeScript + Tailwind Starter

This starter helps you quickly reconstruct an MGX prototype in a local React + TS + Tailwind project.

## Quickstart
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Paste your files quickly using the helper script:
   ```bash
   node scripts/bulk-paste.mjs
   ```
   - Enter the target file path (e.g. `src/components/Button.tsx`), then paste the file contents.
   - Type a single line with `EOF` on its own to finish that file.
   - Repeat for the next file. Press Enter on an empty path to quit.

## Tailwind
Edit `src/index.css` to customize base styles. Files under `src/**/*` are scanned by Tailwind.

## Notes
- This scaffold uses Vite, React 18, and TypeScript.
- The helper script will create intermediate folders if they don't exist.