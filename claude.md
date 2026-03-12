# Project: AI Testing - Subvisual                                                                                                                                                                                                                       
                                                                                                                                                                                                                                               
## Stack                                                                                                                                                                                                                                       
- Frontend: Nuxt + Tailwind CSS                                                                                                                                                                                                  
- Backend: Node.js + Express                                                                                                                                                                                                                   
- Database: PostgreSQL (via Prisma)
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

## Animation Styles
- The titles should have a fade-in + small movement on y axis triggered by line 
- The others elements (<p> , marquee, images, buttons etc) should have a fade-in
- The project should use lenis scroll
                                                                                                                                                                                                                                               
## Do Not                                                                                                                                                                                                                                      
- Don't auto-commit without asking                                                                                                                                                                                                             
- Don't install new packages without confirming                                                                                                                                                                                                
- Don't modify `prisma/schema.prisma` directly                        
