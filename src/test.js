const fs = require("fs-extra");
const path = require("path");
const { pull } = require("lodash");

a = [123, 456, 789, 101];
pull(a, 123);
console.log(a);

// const RemoveNote = (filepath, index) => {
//   try {
//     const notes = fs.readJsonSync(filepath).notes;
//     if (index > 0 && notes.length >= index) {
//       console.log(notes);
//       notes.splice(index - 1, 1);

//       fs.writeJSONSync(filepath, {
//         notes
//       });
//       console.log(notes);
//       return true;
//     }
//   } catch (error) {
//     plugin.throwPluginError("删除备忘录失败");
//     return false;
//   }
// };

// const filepath = path.join(
//   "E://project/kivi/data/plugins/memo",
//   `981442990.json`
// );
// if (fs.existsSync(filepath)) {
//   const state = RemoveNote(filepath, 3);
//   if (state) console.log("成功");
// } else {
//   console.log("备忘录不存在");
// }
