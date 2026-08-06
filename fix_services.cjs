const fs = require('fs');

let code = fs.readFileSync('src/components/Services.tsx', 'utf8');
code = code.replace(/import \{ ArrowLeft, ArrowRight, ChevronDown, ChevronUp \} from 'lucide-react';/, "import { ArrowLeft, ArrowRight } from 'lucide-react';");
code = code.replace(/const \[expandedId, setExpandedId\] = useState<string \| null>\(null\);\n/, '');
code = code.replace(/const isExpanded = expandedId === service\.id;\n/, '');
code = code.replace(/import \{ motion, AnimatePresence \}/, "import { motion }");

fs.writeFileSync('src/components/Services.tsx', code);
