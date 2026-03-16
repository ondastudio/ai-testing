# Project: AI Testing - Subvisual                                                                                                                                                                                                                       
                                                                                                                                                                                                                                               
## Stack                                                                                                                                                                                                                                       
- Frontend: Nuxt + Tailwind CSS                                                                                                                                                                                                  
- Backend: Node.js + Express                                                                                                                                                                                                                   
- Package manager: npm                                                                                                                                                                                                                         
                
## Commands                                                                                                                                                                                                                                    
- `npm dev` — start dev server
- `npm build` — production build                                                                                                                                                                                                               
- `npm test` — run tests
- `npm lint` — run ESLint                                                                                                                                                                                                                      
                                                                                                                                                                                                                                               
## Project Structure
- `src/components/` — reusable UI components                                                                                                                                                                                                   
- `src/pages/` — page-level components
- `src/lib/` — utilities and helpers                                                                                                                                                                                                           
- `src/api/` — API route handlers
                                                                                                                                                                                                                                               
## Conventions  
- Use functional components with hooks, no class components                                                                                                                                                                                    
- Prefer named exports over default exports
- File names: kebab-case (e.g. `user-card.tsx`)                                                                                                                                                                                                
- Use Tailwind for styling, avoid inline styles                                                                                                                                                                                                    
                
## Code Style                                                                                                                                                                                                                                  
- No `any` types — use proper types or `unknown`
- Prefer `const` over `let`                                                                                                                                                                                                                    
- Keep components small and focused (< 150 lines)                                                                                                                                                                                              
- Co-locate tests next to source files (`foo.test.ts`)

## Design to Code
- Follow the grid of the design 
- Use a max-container of 1600px, if there's a background color or asset it should be outside of the container and fill the width of the screen
- Create variables and use them as much as possible 

## Animation Styles
- The titles should have a fade-in and a small movement on y axis triggered by line 
- The others elements (paragraph, marquee, images, buttons etc) should have a fade-in
- The project should use lenis scroll
                                                                                                                                                                                                                                               
## Do Not                                                                                                                                                                                                                                      
- Don't auto-commit without asking                                                                                                                                                                                                             
- Don't install new packages without confirming                                                                                                                                                                                                
- Don't modify `prisma/schema.prisma` directly                        
