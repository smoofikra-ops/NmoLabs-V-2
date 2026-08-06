const fs = require('fs');

let code = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');

const replacement = `
              {/* Path Nodes */}
              {[
                { id: 'services', angle: -45, title: isEn ? 'Services' : 'الخدمات', icon: <Layers size={16} />, color: 'text-blue-500', bg: 'bg-blue-500' },
                { id: 'work', angle: 45, title: isEn ? 'Work' : 'الأعمال', icon: <Briefcase size={16} />, color: 'text-emerald-500', bg: 'bg-emerald-500' },
                { id: 'products', angle: 135, title: isEn ? 'Products' : 'المنتجات', icon: <ShoppingBag size={16} />, color: 'text-purple-500', bg: 'bg-purple-500' },
                { id: 'innovation', angle: -135, title: isEn ? 'Lab' : 'المختبر', icon: <Cpu size={16} />, color: 'text-amber-500', bg: 'bg-amber-500' }
              ].map((node) => {
                const isActive = hoveredPath === node.id || (!hoveredPath && node.id === 'services');
                
                const radiusPct = 35; // 35% from center
                const rad = (node.angle * Math.PI) / 180;
                const leftPos = 50 + (radiusPct * Math.cos(rad));
                const topPos = 50 + (radiusPct * Math.sin(rad));
                
                return (
                  <button
                    key={node.id}
                    onClick={() => setHoveredPath(node.id)}
                    className={\`absolute z-30 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 \${isActive ? 'scale-110' : 'scale-95 opacity-70 hover:opacity-100'}\`}
                    style={{
                      transform: 'translate(-50%, -50%)',
                      left: \`\${leftPos}%\`,
                      top: \`\${topPos}%\`
                    }}
                  >
`;

code = code.replace(
  /\{\/\* Path Nodes \*\/\}.*?style=\{\{[\s\S]*?\}\}\s*>/s,
  replacement.trim()
);

// Fix SVG connecting lines
code = code.replace(
  /<svg className="absolute inset-0 w-full h-full pointer-events-none".*?<\/svg>/s,
  `<svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="35%" fill="none" stroke="var(--border-default)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                
                {/* Active line drawing based on selection */}
                <line 
                  x1="50%" 
                  y1="50%" 
                  x2={
                    hoveredPath === 'services' ? \`\${50 + (35 * Math.cos(-45 * Math.PI / 180))}%\` : 
                    hoveredPath === 'work' ? \`\${50 + (35 * Math.cos(45 * Math.PI / 180))}%\` : 
                    hoveredPath === 'products' ? \`\${50 + (35 * Math.cos(135 * Math.PI / 180))}%\` : 
                    hoveredPath === 'innovation' ? \`\${50 + (35 * Math.cos(-135 * Math.PI / 180))}%\` : "50%"
                  } 
                  y2={
                    hoveredPath === 'services' ? \`\${50 + (35 * Math.sin(-45 * Math.PI / 180))}%\` : 
                    hoveredPath === 'work' ? \`\${50 + (35 * Math.sin(45 * Math.PI / 180))}%\` : 
                    hoveredPath === 'products' ? \`\${50 + (35 * Math.sin(135 * Math.PI / 180))}%\` : 
                    hoveredPath === 'innovation' ? \`\${50 + (35 * Math.sin(-135 * Math.PI / 180))}%\` : "50%"
                  } 
                  stroke="var(--color-primary)" 
                  strokeWidth="2" 
                  opacity={hoveredPath ? 0.8 : 0} 
                  className="transition-all duration-500 ease-in-out" 
                />
              </svg>`
);

fs.writeFileSync('src/components/AboutPage.tsx', code);
