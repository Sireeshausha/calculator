# Calculator Project

## Overview
This project is a modern, production-ready calculator application built using a React + TypeScript + Vite template. It is designed to be visually appealing and fully featured, suitable for deployment in real-world scenarios.

## Technology Stack
- **React**: A popular JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, providing static type checking.
- **Vite**: A fast build tool and development server for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Lucide React**: An icon library used for all icons and logos in the project.

## Design Philosophy
- The UI is designed to be beautiful and unique, avoiding cookie-cutter or generic designs.
- The project uses JSX syntax with Tailwind CSS classes and React hooks.
- Icons are exclusively sourced from the Lucide React library.
- No additional UI themes, icon libraries, or packages are installed unless absolutely necessary or explicitly requested.

## Setup and Running Instructions
1. **Install dependencies**  
   Run the following command in the project root to install all required packages:  
   ```bash
   npm install
   ```

2. **Start the development server**  
   Use the following command to start the Vite development server:  
   ```bash
   npm run dev
   ```

3. **Build for production**  
   To create a production build, run:  
   ```bash
   npm run build
   ```

4. **Preview production build**  
   To preview the production build locally, run:  
   ```bash
   npm run preview
   ```

## Configuration
- The project uses a configuration file `config.json` which specifies the template used:  
  ```json
  {
    "template": "bolt-vite-react-ts"
  }
  ```
- This indicates the project is based on the "bolt-vite-react-ts" template, which integrates React, TypeScript, and Vite.

## Icons
- All icons and logos in the project are sourced from the [Lucide React](https://lucide.dev/) icon library.
- Avoid adding other icon libraries or UI packages unless necessary.

## Folder Structure (Relevant)
- `src/` - Contains the source code for the React application.
- `config.json` - Configuration file specifying the project template.
- `prompt` - Contains design and development guidelines for the project.

---

This README provides a comprehensive overview and instructions to help developers understand, set up, and contribute to the Calculator project effectively.
