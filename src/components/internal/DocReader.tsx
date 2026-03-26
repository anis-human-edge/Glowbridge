import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { AlertTriangle, Hash, CheckCircle2 } from 'lucide-react';

export default function DocReader({ content }: { content: string }) {
  return (
    <div className="prose prose-stone prose-lg md:prose-xl max-w-none
      prose-headings:font-sans prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink
      prose-h1:text-5xl prose-h1:mb-12 prose-h1:pb-8 prose-h1:border-b prose-h1:border-stone/10 prose-h1:leading-tight
      prose-h2:text-3xl prose-h2:mt-24 prose-h2:mb-8 prose-h2:text-ink prose-h2:scroll-mt-12 prose-h2:flex prose-h2:items-center prose-h2:gap-4
      prose-h3:text-xl prose-h3:text-ink/60 prose-h3:mt-16 prose-h3:mb-6 prose-h3:scroll-mt-16 prose-h3:font-mono prose-h3:uppercase prose-h3:tracking-widest
      prose-p:text-ink/75 prose-p:leading-relaxed prose-p:text-[1.1rem]
      prose-a:text-moss prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
      prose-hr:border-stone/10 prose-hr:my-16
      prose-strong:font-semibold prose-strong:text-ink
      prose-code:text-[0.9em] prose-code:font-mono prose-code:bg-stone/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:text-moss
      prose-code:before:content-none prose-code:after:content-none
    ">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: ({node, ...props}) => {
            const text = props.children?.toString().replace(/\*/g, '') || '';
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return <h2 id={id} className="group relative">
              <span className="w-10 h-10 rounded-xl bg-moss/10 text-moss flex items-center justify-center shrink-0">
                <Hash className="w-5 h-5" />
              </span>
              {props.children}
            </h2>;
          },
          h3: ({node, ...props}) => {
            const text = props.children?.toString().replace(/\*/g, '') || '';
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return <h3 id={id} className="group relative flex items-center gap-4">
              <span className="w-8 h-[2px] bg-stone/20 block"></span>
              {props.children}
            </h3>;
          },
          
          /* 
            WREAKING HAVOC:
            Transform all standard markdown bullet lists into stunning Bento Grids of glassmorphic cards!
            This instantly makes the "textbook" format highly consumable.
          */
          ul: ({node, ...props}) => (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10 p-0" {...props} />
          ),
          li: ({node, ...props}) => (
            <li className="list-none m-0 bg-white border border-stone-200 rounded-[1.5rem] p-6 hover:border-moss/30 hover:shadow-premium transition-all duration-300 flex items-start gap-4 shadow-sm group">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-stone-300 group-hover:bg-moss group-hover:scale-150 transition-all shrink-0"></div>
              <span className="text-ink/80 text-[1rem] leading-snug">{props.children}</span>
            </li>
          ),

          /* 
            Giant Hero Blockquotes:
            Transform standard > blockquotes into intense visual callouts
          */
          blockquote: ({node, ...props}) => {
            const text = props.children?.toString().toLowerCase() || '';
            
            if (text.includes('rule') || text.includes('must') || text.includes('warning') || text.includes('never')) {
               return (
                 <aside className="my-12 p-8 md:p-10 bg-red-50 text-red-900 border border-red-200 rounded-[2rem] shadow-sm">
                   <div className="flex items-start gap-5">
                     <AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                     <div className="!m-0 prose-p:!m-0 font-medium text-lg md:text-xl leading-snug">{props.children}</div>
                   </div>
                 </aside>
               )
            }
            if (text.includes('status:') || text.includes('merged:') || text.includes('sources:')) {
               return (
                 <aside className="my-6 p-4 md:p-6 bg-moss/10 text-moss border border-moss/20 rounded-2xl flex items-center gap-4">
                   <CheckCircle2 className="w-6 h-6 shrink-0" />
                   <div className="!m-0 prose-p:!m-0 font-mono text-sm tracking-wide uppercase">{props.children}</div>
                 </aside>
               )
            }

            return (
              <aside className="my-16 p-10 md:p-12 bg-white border border-stone-200 rounded-[2.5rem] shadow-sm italic text-2xl md:text-3xl text-ink/80 leading-relaxed font-serif relative overflow-hidden">
                <div className="absolute -top-4 -left-2 text-[150px] text-stone-100 font-serif leading-none rotate-12 z-0">"</div>
                <div className="relative z-10 !m-0 prose-p:!m-0">{props.children}</div>
              </aside>
            )
          },

          /* High contrast Data Tables */
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-16 rounded-[2rem] border border-stone-200 shadow-sm bg-white">
              <table className="w-full text-left border-collapse m-0 min-w-[700px]" {...props} />
            </div>
          ),
          th: ({node, ...props}) => <th className="bg-stone-50 p-6 border-b border-stone-200 font-mono text-ink/60 text-[11px] uppercase tracking-widest whitespace-nowrap" {...props} />,
          td: ({node, ...props}) => <td className="p-6 border-b border-stone-100 text-ink/80 text-base align-middle last:border-0" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
