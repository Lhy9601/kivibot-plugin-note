import path from "path";
import fs from "fs-extra";
import { pull } from "lodash";
import { KiviPlugin } from "@kivibot/core";
import type { AllMessageEvent } from "@kivibot/core";

const { version } = require("../package.json");

const plugin = new KiviPlugin("note", version);

enum Authority {
  all = "all",
  list = "list",
  admin = "admin",
  group = "group"
}

const config: { mode: string; user: number[]; group: number[] } = {
  mode: "admin",
  user: [],
  group: []
};

enum CMD {
  Mode = "mode",
  Add = "add",
  List = "ls",
  Time = "time",
  Remove = "rm",
  AddUser = "addu",
  RemoveUser = "rmu",
  AddGroup = "addg",
  RemoveGroup = "rmg",
  User = "user"
}

plugin.onMounted(() => {
  plugin.saveConfig(Object.assign(config, plugin.loadConfig()));

  if (!config.user.includes(plugin.mainAdmin)) {
    config.user.push(plugin.mainAdmin);
    plugin.saveConfig(config);
  }

  plugin.onCmd("/note", (event, params) => handleCmd(event, params));
  plugin.onAdminCmd("/note", (event, params) => handleAdminCmd(event, params));
});

plugin.onUnmounted(() => {
  plugin.saveConfig(config);
});

//非主管理员可使用：add, rm, ls
const handleCmd = (event: AllMessageEvent, params: any) => {
  const QQNumber = event.sender.user_id;
  let result: boolean;
  if (isAuthorized(QQNumber)) {
    const [cmd, arg] = params;
    const filepath = path.join(plugin.dataDir, `${QQNumber}.json`);
    switch (cmd) {
      case CMD.Add:
        result = AddNote(QQNumber, arg);
        if (result) {
          return event.reply("已添加备忘录", true);
        } else {
          return event.reply("添加备忘录失败", true);
        }
      case CMD.Remove:
        if (fs.existsSync(filepath)) {
          const state = RemoveNote(filepath, arg);
          if (state) return event.reply("删除备忘录成功", true);
          else return event.reply("删除备忘录失败", true);
        } else {
          return event.reply("不存在对应文件，请先添加一条备忘录", true);
        }
      case CMD.List:
        if (fs.existsSync(filepath)) {
          const { state, message } = ListNote(filepath);
          if (state) return event.reply(message, true);
        } else {
          return event.reply("不存在对应文件，请先添加一条备忘录", true);
        }

      default:
        break;
    }
  } else {
    event.reply("没有对应权限", true);
  }
};

//主管理可使用：mode addu rmu user
const handleAdminCmd = (event: AllMessageEvent, params: any) => {
  const [cmd, arg] = params;
  let result: boolean;
  switch (cmd) {
    case CMD.Mode:
      if (arg == "") {
        event.reply(`当前模式：${config.mode}`);
      }
      if (
        arg == Authority.admin ||
        arg == Authority.all ||
        arg == Authority.list
      ) {
        config.mode = arg;
        return event.reply("已修改模式，重启插件生效~", true);
      }
    case CMD.AddUser:
      result = AddUser(parseInt(arg));
      if (result) {
        return event.reply("已添加该号码", true);
      } else {
        return event.reply("号码格式不正确", true);
      }
    case CMD.RemoveUser:
      result = RemoveUser(parseInt(arg));
      if (result) {
      }
      return event.reply("已删除该号码", true);
    case CMD.User:
      let message = "用户列表：\n";
      if (config.user.length > 0) {
        for (let i = 0; i < config.user.length; i++) {
          message += `${i + 1}. ${config.user[i]}\n`;
        }
      }
    default:
      break;
  }
};

const ListNote = (filepath: string) => {
  try {
    const notes: string[] = fs.readJsonSync(filepath).notes;
    let message = `备忘录清单：共计${notes.length}项\n`;
    if (notes.length > 0) {
      for (let i = 0; i < notes.length; i++) {
        message += `${i + 1}. ${notes[i]}\n`;
      }
    }
    return {
      state: true,
      message
    };
  } catch (error) {
    plugin.throwPluginError("列表展示失败");
    return {
      state: false,
      message: "展示列表失败"
    };
  }
};
const AddNote = (QQNumber: number, note: string) => {
  const filepath = path.join(plugin.dataDir, `${QQNumber}.json`);
  try {
    if (fs.existsSync(filepath)) {
      const obj = fs.readJsonSync(filepath);
      obj.notes.push(note);
      fs.writeJSONSync(filepath, obj);
    } else {
      fs.createFile(filepath).then(() => {
        fs.writeJSONSync(filepath, {
          notes: [note]
        });
      });
    }
    return true;
  } catch (error) {
    plugin.throwPluginError("保存备忘录出错，路径: " + filepath);
    return false;
  }
};
const RemoveNote = (filepath: string, index: number) => {
  try {
    const notes: string[] = fs.readJsonSync(filepath).notes;
    if (index > 0 && notes.length >= index) {
      notes.splice(index - 1, 1);
      fs.writeJSONSync(filepath, {
        notes
      });
      return true;
    }
  } catch (error) {
    plugin.throwPluginError("删除备忘录失败");
    return false;
  }
};
const AddUser = (QQ: number) => {
  var qqPattern = /^[1-9][0-9]{4,10}$/;
  if (qqPattern.test(QQ.toString())) {
    config.user.push(QQ);
    return true;
  } else {
    return false;
  }
};

const RemoveUser = (QQ: number) => {
  if (config.user.includes(QQ)) {
    pull(config.user, QQ);
    return true;
  } else {
    return false;
  }
};

//是否有权限使用
const isAuthorized = (QQ: number) => {
  return (
    config.mode == Authority.all ||
    (config.mode == Authority.list && config.user.includes(QQ)) ||
    (config.mode == Authority.admin && QQ == plugin.mainAdmin)
  );
};
export { plugin };
