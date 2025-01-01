# Project overview

use this guide to build a web app where users can give a text prompt to generate emoji usign
model hosted on Replicate.

# Feature requirements

- we will use nextjs, shadcn/ui, tailwindcss, lucide-react, supabase, clerk
- create form user can put in text prompt that call the replicate modele API to generate emojis
- display the emoji in a grid
- have a nice UI & animation when the emoji is blank or generating
- When over each emoji img, an icon button for download, and an icon button for download, like and delete should be shown


# Relevant documentation docs

## How to use replicate emoji generator model

Set the REPLICATE_API_TOKEN environment variable

export REPLICATE_API_TOKEN=<paste-your-token-here>

Visibility

Copy
Learn more about authentication

Install Replicate’s Node.js client library

npm install replicate

Copy
Learn more about setup
Run fofr/sdxl-emoji using Replicate’s API. Check out the model's schema for an overview of inputs and outputs.

import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    prompt: "A TOK emoji of a man",
    apply_watermark: false
};

const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });

import { writeFile } from "node:fs/promises";
for (const [index, item] of Object.entries(output)) {
  await writeFile(`output_${index}.png`, item);
}
//=> output_0.png written to disk

# Current file structure

project/my-app/
├── .next/
├── app/
├── components/
├── lib/
├── node_modules/
├── requirements/
│   ├── frontend_instructions.md
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── components.json
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── tailwind.config.ts
│   └── tsconfig.json

# Rules

- all new components should go in /components and be named like example-component.tsx unless otherwise specified
- all new pages go in /app
