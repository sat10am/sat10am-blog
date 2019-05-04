const stripHtml = html => html.replace(/<(?:.|\n)*?>/gm, "");

export default stripHtml;
