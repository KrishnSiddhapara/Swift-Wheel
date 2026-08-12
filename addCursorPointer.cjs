// const fs = require('fs');
// const path = require('path');

// function walk(dir) {
//     let results = [];
//     const list = fs.readdirSync(dir);
//     list.forEach(file => {
//         const filePath = path.join(dir, file);
//         const stat = fs.statSync(filePath);
//         if (stat && stat.isDirectory()) {
//             results = results.concat(walk(filePath));
//         } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
//             results.push(filePath);
//         }
//     });
//     return results;
// }

// const files = walk('./src');
// let count = 0;

// files.forEach(file => {
//     let content = fs.readFileSync(file, 'utf8');
//     let original = content;
    
//     // Look for <button tags and ensure they get a class of cursor-pointer.
//     content = content.replace(/<button([^>]*?)>/g, (match, p1) => {
//         // Only modify if it doesn't already contain cursor-pointer
//         if (!p1.includes('cursor-pointer') && !p1.includes('cursor-not-allowed')) {
//             if (p1.includes('className="')) {
//                 return '<button' + p1.replace('className="', 'className="cursor-pointer ') + '>';
//             } else if (p1.includes('className={`')) {
//                return '<button' + p1.replace('className={`', 'className={`cursor-pointer ') + '>';
//             } else if (p1.includes('className={')) {
//                return '<button' + p1.replace('className={', 'className={"cursor-pointer " + ') + '>';
//             } else {
//                 return '<button className="cursor-pointer"' + p1 + '>';
//             }
//         }
//         return match;
//     });

//     if (content !== original) {
//         fs.writeFileSync(file, content, 'utf8');
//         count++;
//         console.log('Updated: ' + file);
//     }
// });
// console.log('Total files updated: ' + count);
