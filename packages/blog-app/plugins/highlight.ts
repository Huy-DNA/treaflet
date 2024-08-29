import hljs from 'highlight.js/lib/core';
import mips from 'highlight.js/lib/languages/mipsasm';
import cpp from 'highlight.js/lib/languages/cpp';
import ts from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('mips', mips);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('ts', ts);
