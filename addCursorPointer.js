// const fs = require('fs');
// const path = require('path');

// function walk(dir) {
//     let results = [];
//     const list = fs.readdirSync(dir);
//     list.forEach(file => {
//         file = path.join(dir, file);
//         const stat = fs.statSync(file);
//         if (stat && stat.isDirectory()) {
//             results = results.concat(walk(file));
//         } else if (file.endsWith('.jsx')) {
//             results.push(file);
//         }
//     });
//     return results;
// }

// const files = walk('./src');
// let count = 0;

// files.forEach(file => {
//     let content = fs.readFileSync(file, 'utf8');
//     let original = content;
    
//     // A simpler and safer approach: Look for <button tags and ensure they get a class of cursor-pointer.
//     content = content.replace(/<button([^>]*?)>/g, (match, p1) => {
//         // Exclude if it already has cursor-pointer or cursor-not-allowed or similar
//         if (!p1.includes('cursor-')) {
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
