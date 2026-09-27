// Turn existing manual contents lists into responsive details without changing
// their headings, links, IDs, or medical article source text.
const textOf = node => node.type === 'text' ? node.value : (node.children || []).map(textOf).join('');

export default function rehypeArticleContents() {
  return tree => {
    function visit(parent) {
      if (!parent.children) return;
      for (let i = 0; i < parent.children.length; i++) {
        const heading = parent.children[i];
        if (heading.type === 'element' && heading.tagName === 'h2' && textOf(heading).normalize('NFKC').trim().toLocaleLowerCase('tr-TR') === 'içindekiler') {
          let end = i + 1;
          while (parent.children[end]?.type === 'text' && !parent.children[end].value.trim()) end++;
          const list = parent.children[end];
          if (list?.type === 'element' && ['ul', 'ol'].includes(list.tagName)) {
            const details = {type:'element',tagName:'details',properties:{className:['article-contents']},children:[
              {type:'element',tagName:'summary',properties:{className:['focus-visible:outline','focus-visible:outline-2','focus-visible:outline-offset-2','focus-visible:outline-primary-600']},children:[heading]},
              ...parent.children.slice(i + 1, end + 1),
            ]};
            parent.children.splice(i, end - i + 1, details);
            continue;
          }
        }
        visit(heading);
      }
    }
    visit(tree);
  };
}
