const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const oldCode = `                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const newArray = [...config.partners];
                                          newArray[index] = { ...partner, imageUrl: reader.result as string };
                                          updateConfig({ partners: newArray });
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}`;

const newCode = `                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const img = new Image();
                                          img.onload = () => {
                                            const canvas = document.createElement('canvas');
                                            const MAX_WIDTH = 400;
                                            const MAX_HEIGHT = 400;
                                            let width = img.width;
                                            let height = img.height;
                                            
                                            if (width > height) {
                                              if (width > MAX_WIDTH) {
                                                height *= MAX_WIDTH / width;
                                                width = MAX_WIDTH;
                                              }
                                            } else {
                                              if (height > MAX_HEIGHT) {
                                                width *= MAX_HEIGHT / height;
                                                height = MAX_HEIGHT;
                                              }
                                            }
                                            
                                            canvas.width = width;
                                            canvas.height = height;
                                            const ctx = canvas.getContext('2d');
                                            ctx.drawImage(img, 0, 0, width, height);
                                            
                                            const dataUrl = canvas.toDataURL('image/webp', 0.8);
                                            
                                            const newArray = [...config.partners];
                                            newArray[index] = { ...partner, imageUrl: dataUrl };
                                            updateConfig({ partners: newArray });
                                          };
                                          img.src = reader.result as string;
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('src/components/AdminPanel.tsx', code);
